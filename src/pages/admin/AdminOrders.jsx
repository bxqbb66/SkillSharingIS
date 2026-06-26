import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../../data/store';

const statusColors = {
  '待确认': 'bg-yellow-50 text-yellow-700',
  '进行中': 'bg-blue-50 text-blue-700',
  '待验收': 'bg-purple-50 text-purple-700',
  '已完成': 'bg-green-50 text-green-700',
  '申诉中': 'bg-red-50 text-red-700',
  '已关闭': 'bg-gray-50 text-gray-600',
};

export default function AdminOrders() {
  const store = useStore();
  const orders = store.getOrders();
  const [filter, setFilter] = useState('全部');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [abnormalReason, setAbnormalReason] = useState('');

  const statuses = ['全部', '待确认', '进行中', '待验收', '已完成', '申诉中'];
  const filtered = filter === '全部' ? orders : orders.filter(o => o.order_status === filter);

  function handleMarkAbnormal() {
    if (!selectedOrder || !abnormalReason.trim()) return;
    store.markOrderAbnormal(selectedOrder.order_id, abnormalReason);
    setAbnormalReason('');
  }

  return (
    <div className="p-4 md:p-6 page-enter">
      <h1 className="text-xl font-bold text-gray-800 mb-4">工单监管</h1>

      {/* Filter tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-4">
        {statuses.map(s => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`text-xs px-3 py-1.5 rounded-full whitespace-nowrap transition-colors ${
              filter === s ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="flex gap-6 flex-col lg:flex-row">
        {/* Order list */}
        <div className="flex-1 space-y-2">
          {filtered.length === 0 ? (
            <div className="bg-white rounded-xl p-8 text-center text-gray-400 text-sm">暂无该状态工单</div>
          ) : (
            filtered.map(o => (
              <button
                key={o.order_id}
                onClick={() => setSelectedOrder(o)}
                className={`w-full text-left bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition-shadow ${
                  selectedOrder?.order_id === o.order_id ? 'ring-2 ring-primary' : ''
                } ${o.arbitrationFlag === '异常待核查' ? 'border-l-4 border-red-500' : ''}`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-xs text-gray-500">{o.order_id}</span>
                  <span className={`text-xs px-1.5 py-0.5 rounded ${statusColors[o.order_status] || 'bg-gray-100'}`}>
                    {o.order_status}
                  </span>
                </div>
                <p className="text-sm text-gray-800 font-medium truncate">{o.task_description || '-'}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-gray-500">{o.created_at}</span>
                  <span className="font-bold text-primary">¥{o.reward_amount}</span>
                </div>
                {o.arbitrationFlag === '异常待核查' && (
                  <p className="text-xs text-red-500 mt-1">⚠ {o.abnormalReason || '异常待核查'}</p>
                )}
              </button>
            ))
          )}
        </div>

        {/* Order detail panel */}
        {selectedOrder && (
          <div className="lg:w-96 bg-white rounded-xl shadow-sm p-5">
            <h3 className="font-semibold text-gray-800 mb-3">工单详情</h3>
            <div className="space-y-2 text-sm mb-4">
              <div className="flex justify-between">
                <span className="text-gray-500">工单ID</span>
                <span className="text-gray-800 font-mono text-xs">{selectedOrder.order_id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">需求方</span>
                <span className="text-gray-800">{selectedOrder.demander_id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">服务方</span>
                <span className="text-gray-800">{selectedOrder.provider_id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">金额</span>
                <span className="text-gray-800 font-bold">¥{selectedOrder.reward_amount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">状态</span>
                <span className={`text-xs px-1.5 py-0.5 rounded ${statusColors[selectedOrder.order_status] || ''}`}>
                  {selectedOrder.order_status}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">交易状态</span>
                <span className="text-gray-800 text-xs">{selectedOrder.transactionStatus || '-'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">仲裁标记</span>
                <span className={`text-xs ${selectedOrder.arbitrationFlag === '异常待核查' ? 'text-red-500' : 'text-gray-500'}`}>
                  {selectedOrder.arbitrationFlag || '无'}
                </span>
              </div>
            </div>

            {/* Progress log */}
            {selectedOrder.progressLog?.length > 0 && (
              <div className="mb-4">
                <h4 className="text-xs font-semibold text-gray-700 mb-2">进度日志</h4>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {selectedOrder.progressLog.map((log, i) => (
                    <div key={i} className="text-xs border-l-2 border-gray-200 pl-3 py-1">
                      <div className="text-gray-800">{log.desc || log.content}</div>
                      <div className="text-gray-400">{log.time}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Mark abnormal */}
            <div className="border-t border-gray-100 pt-4">
              <h4 className="text-xs font-semibold text-gray-700 mb-2">标记异常</h4>
              <textarea
                rows={2}
                placeholder="异常原因..."
                value={abnormalReason}
                onChange={e => setAbnormalReason(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-red-500/30 mb-2"
              />
              <button
                onClick={handleMarkAbnormal}
                className="w-full py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors btn-press"
              >
                标记为异常
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
