import { useState } from 'react';
import { useStore } from '../../data/store';

export default function AdminUsers() {
  const store = useStore();
  const users = store.getUsers();
  const orders = store.getOrders();
  const creditLogs = store.getCreditLogs();
  const [selectedUser, setSelectedUser] = useState(null);
  const [scoreChange, setScoreChange] = useState('');
  const [reason, setReason] = useState('');

  const userStats = users.map(u => {
    const userOrders = orders.filter(o => o.demander_id === u.student_id || o.provider_id === u.student_id);
    const completed = userOrders.filter(o => o.order_status === '已完成').length;
    const complaints = userOrders.filter(o => o.order_status === '申诉中').length;
    return { ...u, completed, complaints };
  });

  function handleAdjustCredit() {
    if (!selectedUser || !scoreChange) return;
    store.adjustUserCredit(selectedUser.student_id, Number(scoreChange), reason);
    setScoreChange('');
    setReason('');
    setSelectedUser(store.getUsers().find(u => u.student_id === selectedUser.student_id));
  }

  const userCreditLogs = selectedUser ? creditLogs.filter(l => l.user_id === selectedUser.student_id) : [];

  return (
    <div className="p-4 md:p-6 page-enter">
      <h1 className="text-xl font-bold text-gray-800 mb-4">用户管理</h1>

      <div className="flex gap-6 flex-col lg:flex-row">
        {/* User list */}
        <div className="flex-1 space-y-2">
          {userStats.map(u => (
            <button
              key={u.student_id}
              onClick={() => setSelectedUser(u)}
              className={`w-full text-left bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition-shadow ${
                selectedUser?.student_id === u.student_id ? 'ring-2 ring-primary' : ''
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-semibold text-gray-800">{u.name}</span>
                  <span className="text-xs text-gray-400 ml-2">{u.student_id}</span>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded font-bold ${
                  u.credit_level === 'A' ? 'bg-green-100 text-green-700' :
                  u.credit_level === 'B' ? 'bg-blue-100 text-blue-700' :
                  u.credit_level === 'C' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                }`}>{u.credit_level}</span>
              </div>
              <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                <span>{u.college}</span>
                <span>信用 {u.credit_score}分</span>
                <span>成交 {u.completed}单</span>
                {u.complaints > 0 && <span className="text-red-500">申诉 {u.complaints}次</span>}
              </div>
            </button>
          ))}
        </div>

        {/* User detail */}
        {selectedUser && (
          <div className="lg:w-80 bg-white rounded-xl shadow-sm p-5">
            <h3 className="font-semibold text-gray-800 mb-3">{selectedUser.name}</h3>
            <div className="space-y-2 text-sm mb-4">
              <div className="flex justify-between">
                <span className="text-gray-500">学号</span>
                <span className="text-gray-800">{selectedUser.student_id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">学院</span>
                <span className="text-gray-800">{selectedUser.college}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">信用分</span>
                <span className="text-gray-800 font-bold">{selectedUser.credit_score}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">信用等级</span>
                <span className={`text-xs px-2 py-0.5 rounded font-bold ${
                  selectedUser.credit_level === 'A' ? 'bg-green-100 text-green-700' :
                  selectedUser.credit_level === 'B' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'
                }`}>{selectedUser.credit_level}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">余额</span>
                <span className="text-gray-800">¥{(selectedUser.balance || 0).toFixed(2)}</span>
              </div>
            </div>

            {/* Credit adjustment */}
            <div className="border-t border-gray-100 pt-4 mb-4">
              <h4 className="text-xs font-semibold text-gray-700 mb-2">调整信用分</h4>
              <div className="flex gap-2 mb-2">
                <input
                  type="number"
                  placeholder="分值变化 (如 -10)"
                  value={scoreChange}
                  onChange={e => setScoreChange(e.target.value)}
                  className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
              <input
                type="text"
                placeholder="调整原因..."
                value={reason}
                onChange={e => setReason(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-primary/30 mb-2"
              />
              <button
                onClick={handleAdjustCredit}
                className="w-full py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary-light transition-colors btn-press"
              >
                确认调整
              </button>
            </div>

            {/* Credit logs */}
            {userCreditLogs.length > 0 && (
              <div>
                <h4 className="text-xs font-semibold text-gray-700 mb-2">信用变动记录</h4>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {userCreditLogs.map(log => (
                    <div key={log.id} className="text-xs border-l-2 border-gray-200 pl-3">
                      <div className={`font-medium ${log.score_change >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                        {log.score_change >= 0 ? '+' : ''}{log.score_change} 分
                      </div>
                      <div className="text-gray-500">{log.reason}</div>
                      <div className="text-gray-400">{log.created_at}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
