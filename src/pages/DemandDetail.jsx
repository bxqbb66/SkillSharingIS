import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getDemandById, getUserById } from '../data/mockData';
import { useStore } from '../data/store';
import { avatarUrl } from '../utils/images';
import { DetailSkeleton } from '../components/Skeleton';

const categoryColors = {
  '学业': 'bg-blue-50 text-blue-700',
  '技术': 'bg-purple-50 text-purple-700',
  '生活': 'bg-green-50 text-green-700',
  '文体': 'bg-orange-50 text-orange-700',
};

export default function DemandDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const store = useStore();
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const demand = getDemandById(id);

  if (loading) return <DetailSkeleton />;

  if (!demand) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-400">
        需求不存在或已取消
      </div>
    );
  }

  const demander = getUserById(demand.demander_id);

  function handleConfirm() {
    setShowConfirm(false);
    const order = store.createOrderFromDemand(demand.demand_id);
    setConfirmed(true);
    setTimeout(() => navigate(`/order/${order.order_id}`), 1500);
  }

  if (confirmed) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center mx-4">
          <div className="text-4xl mb-3">📋</div>
          <h2 className="text-lg font-bold text-gray-800 mb-1">工单生成成功</h2>
          <p className="text-sm text-gray-500">请尽快联系对方确认服务详情</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row md:gap-6 md:p-6 md:max-w-5xl md:mx-auto">
      {/* 左侧：详情内容 */}
      <div className="flex-1 md:w-2/3">
        {/* 顶部标签区 */}
        <div className="bg-white px-4 py-4 md:rounded-xl md:shadow-sm">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1 text-sm text-gray-500 hover:text-primary mb-3 transition-colors"
          >
            <span className="text-lg leading-none">‹</span>
            <span>返回</span>
          </button>
          <div className="flex items-center gap-2 flex-wrap mb-3">
            <span className="text-lg font-bold text-gray-800">{demand.demand_tag}</span>
            {demand.urgent_flag === 1 && (
              <span className="text-xs bg-red-500 text-white px-2 py-0.5 rounded font-medium">紧急</span>
            )}
            <span className={`text-xs px-2 py-0.5 rounded ${categoryColors[demand.service_type] || 'bg-gray-100 text-gray-600'}`}>
              {demand.service_type}
            </span>
            <span className="text-xs bg-green-50 text-green-600 px-2 py-0.5 rounded">已审核</span>
          </div>
          <div className="flex items-baseline gap-4">
            <div className="text-amber-600 font-bold text-3xl">
              ¥{demand.budget_amount}
            </div>
            <div className="text-sm text-gray-500">
              截止时间：{demand.deadline}
            </div>
          </div>
        </div>

        {/* 任务描述 */}
        <div className="bg-white mt-2 px-4 py-4 md:rounded-xl md:shadow-sm md:mt-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">任务描述</h3>
          <p className="text-sm text-gray-600 leading-relaxed">{demand.task_description}</p>
        </div>

        {/* 交付要求 */}
        {demand.delivery_requirement && (
          <div className="bg-white mt-2 px-4 py-4 md:rounded-xl md:shadow-sm md:mt-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">交付要求</h3>
            <p className="text-sm text-gray-600">{demand.delivery_requirement}</p>
          </div>
        )}
      </div>

      {/* 右侧：发布者信息 + 操作（桌面端） */}
      <div className="hidden md:block md:w-1/3">
        <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
          <Link to={`/user/${demand.demander_id}`} className="flex items-center gap-3 mb-4 hover:opacity-80 transition-opacity">
            <img
              src={avatarUrl(demander?.student_id)}
              alt={demander?.name}
              className="w-14 h-14 rounded-full bg-gray-100"
            />
            <div>
              <div className="font-semibold text-gray-800">{demander?.name}</div>
              <div className="text-xs text-gray-500 mt-0.5">{demander?.college}</div>
              <div className="flex items-center gap-1 mt-1">
                <span className="text-xs text-yellow-500">★ {demander?.credit_level}</span>
                <span className="text-xs text-gray-400 ml-1">信用 {demander?.credit_score}分</span>
              </div>
            </div>
          </Link>
          <button
            onClick={() => setShowConfirm(true)}
            className="w-full bg-amber-500 text-white font-medium py-3 rounded-xl text-sm hover:bg-amber-600 transition-colors btn-press"
          >
            我要接单
          </button>
        </div>
      </div>

      {/* 手机端底部悬浮操作栏 */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 z-10 flex items-center gap-3">
        <Link to={`/user/${demand.demander_id}`} className="flex items-center gap-2 flex-1">
          <img
            src={avatarUrl(demander?.student_id)}
            alt={demander?.name}
            className="w-9 h-9 rounded-full bg-gray-100 shrink-0"
          />
          <div>
            <div className="text-sm font-semibold text-gray-800">{demander?.name}</div>
            <div className="text-xs text-yellow-500">★ {demander?.credit_level}</div>
          </div>
        </Link>
        <button
          onClick={() => setShowConfirm(true)}
          className="bg-amber-500 text-white font-medium px-8 py-2.5 rounded-full text-sm hover:bg-amber-600 transition-colors btn-press"
        >
          我要接单
        </button>
      </div>

      {/* 确认弹窗 */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-6">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm">
            <h3 className="text-lg font-bold text-gray-800 mb-2">确认接单</h3>
            <p className="text-sm text-gray-500 mb-6">确认要接此需求吗？确认后将生成工单。</p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 py-2.5 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                取消
              </button>
              <button
                onClick={handleConfirm}
                className="flex-1 py-2.5 text-sm font-medium text-white bg-amber-500 rounded-lg hover:bg-amber-600 transition-colors"
              >
                确认接单
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 手机端底部占位 */}
      <div className="md:hidden h-16" />
    </div>
  );
}
