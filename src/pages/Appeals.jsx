import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../data/AuthContext';
import { useStore } from '../data/store';

const statusColors = {
  '待处理': 'bg-orange-50 text-orange-700',
  '处理中': 'bg-blue-50 text-blue-700',
  '已裁决': 'bg-green-50 text-green-700',
};

export default function Appeals() {
  const navigate = useNavigate();
  const { isLoggedIn, user } = useAuth();
  const store = useStore();

  if (!isLoggedIn) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center">
        <div className="text-5xl mb-4">⚖️</div>
        <h2 className="text-lg font-bold text-gray-800 mb-2">请先登录</h2>
        <p className="text-sm text-gray-500 mb-6">登录后查看申诉记录</p>
        <button
          onClick={() => navigate('/login')}
          className="bg-primary text-white px-8 py-2.5 rounded-full text-sm font-medium hover:bg-primary-light transition-colors"
        >
          登录 / 注册
        </button>
      </div>
    );
  }

  const allAppeals = store.getAppeals();
  const myAppeals = allAppeals.filter(a => a.appellant_id === user.student_id);
  const allOrders = store.getOrders();

  return (
    <div className="p-4 md:p-6 md:max-w-3xl md:mx-auto page-enter">
      <h1 className="text-xl font-bold text-gray-800 mb-4">我的申诉</h1>

      {myAppeals.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-400">
          <svg className="w-20 h-20 mb-4 text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
          </svg>
          <p className="text-sm font-medium text-gray-500">暂无申诉记录</p>
          <p className="text-xs text-gray-400 mt-1">对工单验收有异议时可以在工单详情页发起申诉</p>
        </div>
      ) : (
        <div className="space-y-3">
          {myAppeals.map(appeal => {
            const order = allOrders.find(o => o.order_id === appeal.order_id);
            return (
              <div key={appeal.appeal_id} className="bg-white rounded-xl shadow-sm p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-gray-500">{appeal.appeal_id}</span>
                    <span className={`text-xs px-2 py-0.5 rounded ${statusColors[appeal.process_status] || 'bg-gray-100 text-gray-600'}`}>
                      {appeal.process_status}
                    </span>
                  </div>
                  <span className="text-xs text-gray-400">{appeal.created_at}</span>
                </div>

                <div className="bg-gray-50 rounded-lg p-3 mb-3">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-medium text-gray-500">申诉类型：</span>
                    <span className="text-sm text-gray-800">{appeal.appeal_type}</span>
                  </div>
                  <p className="text-xs text-gray-600">{appeal.appeal_description}</p>
                </div>

                {appeal.process_status === '已裁决' && (
                  <div className="bg-green-50 rounded-lg p-3 border border-green-100">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-medium text-green-700">裁决结果</span>
                      {appeal.handler && (
                        <span className="text-xs text-green-600">· {appeal.handler}</span>
                      )}
                    </div>
                    <p className="text-sm text-green-800">{appeal.arbitration_result}</p>
                    {appeal.refundRatio > 0 && (
                      <p className="text-xs text-green-600 mt-1">退款比例：{appeal.refundRatio}%</p>
                    )}
                  </div>
                )}

                {appeal.process_status === '待处理' && (
                  <p className="text-xs text-gray-400 text-center">等待管理员处理中...</p>
                )}
                {appeal.process_status === '处理中' && (
                  <p className="text-xs text-blue-400 text-center">管理员正在审核中...</p>
                )}

                {order && (
                  <Link
                    to={`/order/${order.order_id}`}
                    className="block text-center text-xs text-primary mt-3 hover:underline"
                  >
                    查看关联工单 ›
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
