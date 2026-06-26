import { useState } from 'react';
import { useStore } from '../../data/store';

const typeColors = {
  '冻结': 'bg-blue-50 text-blue-700',
  '转账': 'bg-green-50 text-green-700',
  '退款': 'bg-red-50 text-red-700',
};

export default function AdminTransactions() {
  const store = useStore();
  const transactions = store.getTransactions();
  const [filter, setFilter] = useState('全部');

  const types = ['全部', '冻结', '转账', '退款'];
  const filtered = filter === '全部' ? transactions : transactions.filter(t => t.transaction_type === filter);

  const totalAmount = filtered.reduce((sum, t) => sum + (t.amount || 0), 0);

  return (
    <div className="p-4 md:p-6 page-enter">
      <h1 className="text-xl font-bold text-gray-800 mb-4">交易记录</h1>

      {/* Summary */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs text-gray-500">筛选结果</div>
            <div className="text-2xl font-bold text-gray-800">{filtered.length} 笔</div>
          </div>
          <div className="text-right">
            <div className="text-xs text-gray-500">合计金额</div>
            <div className="text-2xl font-bold text-primary">¥{totalAmount}</div>
          </div>
        </div>
      </div>

      {/* Filter */}
      <div className="flex gap-2 mb-4">
        {types.map(t => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            className={`text-xs px-3 py-1.5 rounded-full transition-colors ${
              filter === t ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Transaction list */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-left bg-gray-50">
                <th className="px-4 py-3 text-xs text-gray-500 font-medium">交易ID</th>
                <th className="px-4 py-3 text-xs text-gray-500 font-medium">工单ID</th>
                <th className="px-4 py-3 text-xs text-gray-500 font-medium">类型</th>
                <th className="px-4 py-3 text-xs text-gray-500 font-medium">金额</th>
                <th className="px-4 py-3 text-xs text-gray-500 font-medium">付款方</th>
                <th className="px-4 py-3 text-xs text-gray-500 font-medium">收款方</th>
                <th className="px-4 py-3 text-xs text-gray-500 font-medium">状态</th>
                <th className="px-4 py-3 text-xs text-gray-500 font-medium">时间</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-8 text-gray-400 text-sm">暂无交易记录</td>
                </tr>
              ) : (
                filtered.map(t => (
                  <tr key={t.transaction_id} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="px-4 py-2.5 text-gray-600 font-mono text-xs">{t.transaction_id}</td>
                    <td className="px-4 py-2.5 text-gray-600 font-mono text-xs">{t.order_id}</td>
                    <td className="px-4 py-2.5">
                      <span className={`text-xs px-1.5 py-0.5 rounded ${typeColors[t.transaction_type] || 'bg-gray-100'}`}>
                        {t.transaction_type}
                      </span>
                    </td>
                    <td className="px-4 py-2.5 text-gray-800 font-medium">¥{t.amount}</td>
                    <td className="px-4 py-2.5 text-gray-600 text-xs">{t.payer_id}</td>
                    <td className="px-4 py-2.5 text-gray-600 text-xs">{t.payee_id}</td>
                    <td className="px-4 py-2.5 text-xs text-gray-500">{t.transaction_status}</td>
                    <td className="px-4 py-2.5 text-xs text-gray-400">{t.created_at}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
