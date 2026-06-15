import { useState } from 'react';
import { Link } from 'react-router-dom';
import { currentUser, orders, skills, demands } from '../data/mockData';

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
  { icon: '📦', label: '我发布的技能', path: '/home' },
  { icon: '📝', label: '我发布的需求', path: '/home' },
  { icon: '📋', label: '我的工单', path: '/orders' },
  { icon: '⭐', label: '我的评价', path: '/profile' },
  { icon: '📊', label: '信用明细', path: '/profile' },
  { icon: '⚙️', label: '设置', path: '/profile' },
];

export default function Profile() {
  const [isLoggedIn] = useState(true);
  const [orderFilter, setOrderFilter] = useState('全部');
  const mySkills = skills.filter(s => s.provider_id === currentUser.student_id);
  const myDemands = demands.filter(d => d.demander_id === currentUser.student_id);

  const filteredOrders = orderFilter === '全部'
    ? orders
    : orders.filter(o => o.order_status === orderFilter);

  if (!isLoggedIn) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center">
        <div className="text-6xl mb-4">👤</div>
        <h2 className="text-lg font-bold text-gray-800 mb-2">请先登录</h2>
        <p className="text-sm text-gray-500 mb-6">登录后可查看个人信息和工单</p>
        <button className="bg-primary text-white px-8 py-2.5 rounded-full text-sm font-medium hover:bg-blue-700 transition-colors">
          登录 / 注册
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen md:flex md:gap-6 md:p-6 md:max-w-5xl md:mx-auto">
      {/* ====== 左侧：个人信息卡片 ====== */}
      <div className="md:w-80 md:shrink-0">
        <div className="bg-white md:rounded-xl md:shadow-sm md:sticky md:top-6">
          {/* 头像 + 基本信息 */}
          <div className="bg-primary text-white px-4 py-6 md:rounded-t-xl">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-2xl font-bold border-2 border-white/40">
                {currentUser.name[0]}
              </div>
              <div>
                <div className="text-lg font-bold">{currentUser.name}</div>
                <div className="text-sm text-white/80 mt-0.5">{currentUser.college}</div>
                <div className="text-xs text-white/60 mt-0.5">学号：{currentUser.student_id}</div>
              </div>
            </div>
          </div>

          {/* 信用分 + 资产 */}
          <div className="p-4 space-y-4">
            {/* 信用区域 */}
            <div className="flex items-center justify-between bg-gray-50 rounded-lg p-4">
              <div>
                <div className="text-xs text-gray-500 mb-1">信用分</div>
                <div className="text-2xl font-bold text-gray-800">{currentUser.credit_score}</div>
              </div>
              <div className={`w-12 h-12 rounded-full ${levelBadge[currentUser.credit_level] || 'bg-gray-400'} flex items-center justify-center text-white text-lg font-bold`}>
                {currentUser.credit_level}
              </div>
            </div>

            {/* 资产概览 */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">账户余额</span>
                <span className="font-semibold text-gray-800">¥{currentUser.balance.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">积分余额</span>
                <span className="font-semibold text-gray-800">{currentUser.points_balance}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">冻结金额</span>
                <span className="text-gray-400 text-xs">¥{currentUser.frozen_amount.toFixed(2)} 冻结中</span>
              </div>
            </div>
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
            {quickLinks.map(link => (
              <Link
                key={link.label}
                to={link.path}
                className="flex flex-col items-center gap-1.5 py-3 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <span className="text-2xl">{link.icon}</span>
                <span className="text-xs text-gray-600">{link.label}</span>
              </Link>
            ))}
          </div>
        </div>

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
            <div className="text-center py-10 text-gray-400 text-sm">暂无该状态工单</div>
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
