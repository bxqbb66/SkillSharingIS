import { useParams } from 'react-router-dom';
import { orders } from '../data/mockData';

const statusColors = {
  '待确认': 'bg-orange-100 text-orange-700',
  '进行中': 'bg-blue-100 text-blue-700',
  '待验收': 'bg-purple-100 text-purple-700',
  '已完成': 'bg-green-100 text-green-700',
  '申诉中': 'bg-red-100 text-red-700',
  '已关闭': 'bg-gray-100 text-gray-600',
};

export default function OrderDetail() {
  const { id } = useParams();
  const order = orders.find(o => o.order_id === id);

  if (!order) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-400">
        工单不存在
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-6 md:max-w-3xl md:mx-auto">
      <h1 className="text-lg font-bold text-gray-800 mb-4">工单详情</h1>
      <div className="bg-white rounded-xl shadow-sm p-4 space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">工单编号</span>
          <span className="text-sm font-medium text-gray-800">{order.order_id}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">状态</span>
          <span className={`text-xs px-2 py-0.5 rounded ${statusColors[order.order_status] || 'bg-gray-100 text-gray-600'}`}>
            {order.order_status}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">报酬金额</span>
          <span className="text-sm font-semibold text-primary">¥{order.reward_amount}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">约定交付时间</span>
          <span className="text-sm text-gray-800">{order.agreed_delivery_time}</span>
        </div>
        {order.actual_delivery_time && (
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">实际交付时间</span>
            <span className="text-sm text-gray-800">{order.actual_delivery_time}</span>
          </div>
        )}
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">创建时间</span>
          <span className="text-sm text-gray-800">{order.created_at}</span>
        </div>
      </div>
    </div>
  );
}
