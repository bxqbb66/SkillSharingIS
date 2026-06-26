import { useStore } from '../../data/store';

export default function Dashboard() {
  const store = useStore();
  const orders = store.getOrders();
  const users = store.getUsers();
  const skills = store.getSkills();
  const demands = store.getDemands();
  const appeals = store.getAppeals();
  const transactions = store.getTransactions();
  const evals = store.getEvaluations();

  const totalRevenue = transactions
    .filter(t => t.transaction_type === '转账' && t.transaction_status === '已完成')
    .reduce((sum, t) => sum + (t.amount || 0), 0);

  const pendingAudit = skills.filter(s => s.audit_status === 0).length + demands.filter(d => d.audit_status === 0).length;
  const pendingAppeals = appeals.filter(a => a.process_status !== '已裁决').length;
  const activeOrders = orders.filter(o => o.order_status === '进行中').length;

  const stats = [
    { label: '平台用户', value: users.length, icon: '👥', color: 'bg-blue-500' },
    { label: '进行中工单', value: activeOrders, icon: '📋', color: 'bg-green-500' },
    { label: '待审核内容', value: pendingAudit, icon: '📝', color: 'bg-orange-500' },
    { label: '待处理申诉', value: pendingAppeals, icon: '⚖️', color: 'bg-red-500' },
    { label: '累计交易额', value: `¥${totalRevenue}`, icon: '💰', color: 'bg-purple-500' },
    { label: '评价总数', value: evals.length, icon: '⭐', color: 'bg-yellow-500' },
  ];

  const orderStatusCounts = {};
  orders.forEach(o => {
    orderStatusCounts[o.order_status] = (orderStatusCounts[o.order_status] || 0) + 1;
  });

  return (
    <div className="p-4 md:p-6 page-enter">
      <h1 className="text-xl font-bold text-gray-800 mb-4">数据看板</h1>

      {/* Stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
        {stats.map(s => (
          <div key={s.label} className="bg-white rounded-xl shadow-sm p-4">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg ${s.color} flex items-center justify-center text-lg`}>
                {s.icon}
              </div>
              <div>
                <div className="text-xs text-gray-500">{s.label}</div>
                <div className="text-lg font-bold text-gray-800">{s.value}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Order status distribution */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
        <h2 className="text-sm font-semibold text-gray-700 mb-3">工单状态分布</h2>
        <div className="flex flex-wrap gap-2">
          {Object.entries(orderStatusCounts).map(([status, count]) => {
            const colors = {
              '待确认': 'bg-yellow-50 text-yellow-700 border-yellow-200',
              '进行中': 'bg-blue-50 text-blue-700 border-blue-200',
              '待验收': 'bg-purple-50 text-purple-700 border-purple-200',
              '已完成': 'bg-green-50 text-green-700 border-green-200',
              '申诉中': 'bg-red-50 text-red-700 border-red-200',
              '已关闭': 'bg-gray-50 text-gray-600 border-gray-200',
            };
            return (
              <div key={status} className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${colors[status] || 'bg-gray-50 text-gray-600 border-gray-200'}`}>
                <span className="text-sm font-medium">{status}</span>
                <span className="text-lg font-bold">{count}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent orders */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <h2 className="text-sm font-semibold text-gray-700 mb-3">最近工单</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-left">
                <th className="pb-2 text-xs text-gray-500 font-medium">工单ID</th>
                <th className="pb-2 text-xs text-gray-500 font-medium">描述</th>
                <th className="pb-2 text-xs text-gray-500 font-medium">金额</th>
                <th className="pb-2 text-xs text-gray-500 font-medium">状态</th>
                <th className="pb-2 text-xs text-gray-500 font-medium">时间</th>
              </tr>
            </thead>
            <tbody>
              {orders.slice(0, 8).map(o => (
                <tr key={o.order_id} className="border-b border-gray-50">
                  <td className="py-2 text-gray-600 font-mono text-xs">{o.order_id}</td>
                  <td className="py-2 text-gray-800 truncate max-w-[200px]">{o.task_description || o.delivery_requirement || '-'}</td>
                  <td className="py-2 text-gray-800 font-medium">¥{o.reward_amount}</td>
                  <td className="py-2">
                    <span className={`text-xs px-1.5 py-0.5 rounded ${
                      o.order_status === '已完成' ? 'bg-green-50 text-green-700' :
                      o.order_status === '进行中' ? 'bg-blue-50 text-blue-700' :
                      o.order_status === '申诉中' ? 'bg-red-50 text-red-700' :
                      'bg-gray-100 text-gray-600'
                    }`}>{o.order_status}</span>
                  </td>
                  <td className="py-2 text-xs text-gray-400">{o.created_at}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
