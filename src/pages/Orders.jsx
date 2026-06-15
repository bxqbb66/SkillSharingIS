import { useState } from 'react';
import { Link } from 'react-router-dom';
import { orders } from '../data/mockData';

const statusColors = {
  '待确认': 'bg-orange-100 text-orange-700',
  '进行中': 'bg-blue-100 text-blue-700',
  '待验收': 'bg-purple-100 text-purple-700',
  '已完成': 'bg-green-100 text-green-700',
  '申诉中': 'bg-red-100 text-red-700',
  '已关闭': 'bg-gray-100 text-gray-600',
};

export default function Orders() {
  const [orderFilter, setOrderFilter] = useState('全部');

  const filteredOrders = orderFilter === '全部'
    ? orders
    : orders.filter(o => o.order_status === orderFilter);

  return (
    <div className="p-4 md:p-6 md:max-w-3xl md:mx-auto">
      <h1 className="text-xl font-bold text-gray-800 mb-4">我的工单</h1>

      {/* 状态筛选 */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-3">
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

      {/* 工单列表 */}
      {filteredOrders.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-400">
          <div className="text-5xl mb-4">📋</div>
          <p className="text-sm">暂无该状态工单</p>
        </div>
      ) : (
        <div className="space-y-2">
          {filteredOrders.map(order => (
            <Link
              key={order.order_id}
              to={`/order/${order.order_id}`}
              className="block bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium text-gray-800 truncate">
                      工单 {order.order_id}
                    </span>
                    <span className={`text-xs px-1.5 py-0.5 rounded ${statusColors[order.order_status] || 'bg-gray-100 text-gray-600'}`}>
                      {order.order_status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 truncate">{order.task_description}</p>
                  <div className="text-xs text-gray-400 mt-1">
                    {order.created_at} · 约定 {order.agreed_delivery_time}
                  </div>
                </div>
                <div className="text-right ml-4 shrink-0">
                  <div className="text-base font-bold text-primary">¥{order.reward_amount}</div>
                  <span className="text-xs text-gray-400">查看详情 ›</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
