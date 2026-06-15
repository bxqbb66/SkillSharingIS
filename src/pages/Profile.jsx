import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { orders, skills, demands, getUserById } from '../data/mockData';
import { useStore } from '../data/store';
import { useAuth } from '../data/AuthContext';
import { avatarUrl } from '../utils/images';
import { ProfileSkeleton } from '../components/Skeleton';

const statusColors = {
  '待确认': 'bg-orange-100 text-orange-700',
  '进行中': 'bg-blue-100 text-blue-700',
  '待验收': 'bg-purple-100 text-purple-700',
  '已完成': 'bg-green-100 text-green-700',
  '申诉中': 'bg-red-100 text-red-700',
  '已关闭': 'bg-gray-100 text-gray-600',
};

const levelBadge = {
  'A': 'bg-green-500',
  'B': 'bg-blue-500',
  'C': 'bg-yellow-500',
  'D': 'bg-red-500',
};

const quickLinks = [
  { icon: '📦', label: '我发布的技能', path: '/home?my=skills' },
  { icon: '📝', label: '我发布的需求', path: '/home?my=demands' },
  { icon: '📋', label: '我的工单', path: '/orders' },
  { icon: '⭐', label: '我的评价', action: 'evals' },
  { icon: '📊', label: '信用明细', path: '/profile' },
  { icon: '⚙️', label: '设置', path: '/profile' },
];

export default function Profile() {
  const navigate = useNavigate();
  const { isLoggedIn, user, logout } = useAuth();
  const [orderFilter, setOrderFilter] = useState('全部');
  const [showEvals, setShowEvals] = useState(false);
  const [evalTab, setEvalTab] = useState('aboutMe');
  const [loading, setLoading] = useState(true);
  const store = useStore();

  useEffect(() => {
    if (isLoggedIn) {
      const timer = setTimeout(() => setLoading(false), 600);
      return () => clearTimeout(timer);
    }
  }, [isLoggedIn]);

  const mySkills = user ? skills.filter(s => s.provider_id === user.student_id) : [];
  const myDemands = user ? demands.filter(d => d.demander_id === user.student_id) : [];
  const { byMe, aboutMe } = user ? store.getMyEvals(user.student_id) : { byMe: [], aboutMe: [] };
  const currentEvals = evalTab === 'byMe' ? byMe : aboutMe;

  const filteredOrders = orderFilter === '全部'
    ? orders
    : orders.filter(o => o.order_status === orderFilter);

  if (!isLoggedIn) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center">
        <div className="text-6xl mb-4">👤</div>
        <h2 className="text-lg font-bold text-gray-800 mb-2">请先登录</h2>
        <p className="text-sm text-gray-500 mb-6">登录后可查看个人信息和工单</p>
        <button
          onClick={() => navigate('/login')}
          className="bg-primary text-white px-8 py-2.5 rounded-full text-sm font-medium hover:bg-primary-light transition-colors"
        >
          登录 / 注册
        </button>
      </div>
    );
  }

  if (loading) return <ProfileSkeleton />;

  return (
    <div className="min-h-screen md:flex md:gap-6 md:p-6 md:max-w-5xl md:mx-auto page-enter">
      {/* ====== 左侧：个人信息卡片 ====== */}
      <div className="md:w-80 md:shrink-0">
        <div className="bg-white md:rounded-xl md:shadow-sm md:sticky md:top-6">
          {/* 头像 + 基本信息 */}
          <div className="bg-primary text-white px-4 py-6 md:rounded-t-xl">
            <div className="flex items-center gap-4">
              <img
                src={avatarUrl(user.student_id)}
                alt={user.name}
                className="w-16 h-16 rounded-full bg-white/20 border-2 border-white/40"
              />
              <div>
                <div className="text-lg font-bold">{user.name}</div>
                <div className="text-sm text-white/80 mt-0.5">{user.college}</div>
                <div className="text-xs text-white/60 mt-0.5">学号：{user.student_id}</div>
              </div>
            </div>
          </div>

          {/* 信用分 + 资产 */}
          <div className="p-4 space-y-4">
            {/* 信用区域 */}
            <div className="flex items-center justify-between bg-gray-50 rounded-lg p-4">
              <div>
                <div className="text-xs text-gray-500 mb-1">信用分</div>
                <div className="text-2xl font-bold text-gray-800">{user.credit_score}</div>
              </div>
              <div className={`w-12 h-12 rounded-full ${levelBadge[user.credit_level] || 'bg-gray-400'} flex items-center justify-center text-white text-lg font-bold`}>
                {user.credit_level}
              </div>
            </div>

            {/* 资产概览 */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">账户余额</span>
                <span className="font-semibold text-gray-800">¥{user.balance.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">积分余额</span>
                <span className="font-semibold text-gray-800">{user.points_balance}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">冻结金额</span>
                <span className="text-gray-400 text-xs">¥{user.frozen_amount.toFixed(2)} 冻结中</span>
              </div>
            </div>

            <button
              onClick={logout}
              className="w-full text-center text-xs text-gray-400 hover:text-red-500 py-2 transition-colors"
            >
              退出登录
            </button>
          </div>
        </div>
      </div>

      {/* ====== 右侧：功能入口 + 工单列表 ====== */}
      <div className="flex-1 mt-2 md:mt-0">
        {/* 数据概览 */}
        <div className="bg-white px-4 py-4 md:rounded-xl md:shadow-sm">
          <div className="flex justify-around text-center">
            <div>
              <div className="text-lg font-bold text-primary">{mySkills.length}</div>
              <div className="text-xs text-gray-500 mt-0.5">技能发布</div>
            </div>
            <div className="border-x border-gray-100 px-8">
              <div className="text-lg font-bold text-primary">{myDemands.length}</div>
              <div className="text-xs text-gray-500 mt-0.5">需求发布</div>
            </div>
            <div>
              <div className="text-lg font-bold text-primary">{orders.length}</div>
              <div className="text-xs text-gray-500 mt-0.5">工单总数</div>
            </div>
          </div>
        </div>

        {/* 快捷功能入口 */}
        <div className="bg-white mt-2 px-4 py-4 md:rounded-xl md:shadow-sm md:mt-4">
          <div className="grid grid-cols-3 gap-3">
            {quickLinks.map(link =>
              link.action === 'evals' ? (
                <button
                  key={link.label}
                  onClick={() => setShowEvals(true)}
                  className="flex flex-col items-center gap-1.5 py-3 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <span className="text-2xl">{link.icon}</span>
                  <span className="text-xs text-gray-600">{link.label}</span>
                </button>
              ) : (
                <Link
                  key={link.label}
                  to={link.path}
                  className="flex flex-col items-center gap-1.5 py-3 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <span className="text-2xl">{link.icon}</span>
                  <span className="text-xs text-gray-600">{link.label}</span>
                </Link>
              )
            )}
          </div>
        </div>

        {/* 我的评价区域 */}
        {showEvals && (
          <div className="bg-white mt-2 px-4 py-4 md:rounded-xl md:shadow-sm md:mt-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-gray-700">我的评价</h3>
              <button
                onClick={() => setShowEvals(false)}
                className="text-xs text-gray-400 hover:text-gray-600"
              >
                关闭
              </button>
            </div>
            <div className="flex gap-2 mb-3">
              <button
                onClick={() => setEvalTab('aboutMe')}
                className={`text-xs px-3 py-1.5 rounded-full transition-colors ${
                  evalTab === 'aboutMe' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'
                }`}
              >
                别人评价我的 ({aboutMe.length})
              </button>
              <button
                onClick={() => setEvalTab('byMe')}
                className={`text-xs px-3 py-1.5 rounded-full transition-colors ${
                  evalTab === 'byMe' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'
                }`}
              >
                我评价别人的 ({byMe.length})
              </button>
            </div>
            {currentEvals.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 text-gray-400">
                <svg className="w-16 h-16 mb-3 text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
                <p className="text-sm font-medium text-gray-500">暂无评价</p>
                <p className="text-xs text-gray-400 mt-1">完成工单后可以互相评价</p>
              </div>
            ) : (
              <div className="space-y-3">
                {currentEvals.map(e => {
                  const other = getUserById(evalTab === 'byMe' ? e.evaluated_id : e.evaluator_id);
                  return (
                    <div key={e.evaluation_id} className="border-b border-gray-50 pb-3 last:border-0 last:pb-0">
                      <div className="flex items-center gap-2 mb-1">
                        <Link to={`/user/${evalTab === 'byMe' ? e.evaluated_id : e.evaluator_id}`} className="hover:opacity-80 transition-opacity">
                          <img
                            src={avatarUrl(evalTab === 'byMe' ? e.evaluated_id : e.evaluator_id)}
                            alt={other?.name}
                            className="w-7 h-7 rounded-full bg-gray-100"
                          />
                        </Link>
                        <Link to={`/user/${evalTab === 'byMe' ? e.evaluated_id : e.evaluator_id}`} className="text-xs font-medium text-gray-700 hover:text-primary transition-colors">
                          {other?.name}
                        </Link>
                        <span className="text-xs text-yellow-500">{'★'.repeat(e.star_score)}{'☆'.repeat(5 - e.star_score)}</span>
                      </div>
                      <p className="text-xs text-gray-500 ml-9">{e.evaluation_text}</p>
                      <p className="text-[10px] text-gray-300 ml-9 mt-0.5">{e.created_at}</p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* 工单筛选 Tab */}
        <div className="bg-white mt-2 px-4 pt-4 pb-2 md:rounded-xl md:shadow-sm md:mt-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">我的工单</h3>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {['全部', '待确认', '进行中', '待验收', '已完成', '申诉中'].map(status => (
              <button
                key={status}
                onClick={() => setOrderFilter(status)}
                className={`text-xs px-3 py-1.5 rounded-full whitespace-nowrap transition-colors ${
                  orderFilter === status
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* 工单列表 */}
        <div className="bg-white px-4 pb-4 md:rounded-xl md:shadow-sm">
          {filteredOrders.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-gray-400">
              <svg className="w-16 h-16 mb-3 text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="text-sm font-medium text-gray-500">暂无该状态工单</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {filteredOrders.slice(0, 5).map(order => (
                <Link
                  key={order.order_id}
                  to={`/order/${order.order_id}`}
                  className="flex items-center gap-3 py-3 hover:bg-gray-50 -mx-2 px-2 rounded-lg transition-colors block"
                >
                  <span className={`w-2 h-2 rounded-full shrink-0 ${
                    order.order_status === '进行中' ? 'bg-blue-500' :
                    order.order_status === '待确认' ? 'bg-orange-500' :
                    order.order_status === '待验收' ? 'bg-purple-500' :
                    order.order_status === '已完成' ? 'bg-green-500' :
                    order.order_status === '申诉中' ? 'bg-red-500' : 'bg-gray-400'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-gray-800 truncate">
                      工单 {order.order_id}
                    </div>
                    <div className="text-xs text-gray-400 mt-0.5">{order.created_at}</div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-sm font-semibold text-gray-800">¥{order.reward_amount}</div>
                    <span className={`text-xs px-1.5 py-0.5 rounded ${statusColors[order.order_status] || 'bg-gray-100 text-gray-600'}`}>
                      {order.order_status}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
