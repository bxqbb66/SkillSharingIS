import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { orders, progressLogs, getUserById, currentUser } from '../data/mockData';

const statusBg = {
  '待确认': 'bg-yellow-50 border-yellow-200',
  '进行中': 'bg-blue-50 border-blue-200',
  '待验收': 'bg-purple-50 border-purple-200',
  '已完成': 'bg-green-50 border-green-200',
  '申诉中': 'bg-red-50 border-red-200',
  '已关闭': 'bg-gray-50 border-gray-200',
};

const statusTextColor = {
  '待确认': 'text-yellow-700',
  '进行中': 'text-blue-700',
  '待验收': 'text-purple-700',
  '已完成': 'text-green-700',
  '申诉中': 'text-red-700',
  '已关闭': 'text-gray-600',
};

export default function OrderDetail() {
  const { id } = useParams();
  const order = orders.find(o => o.order_id === id);
  const [showDeliver, setShowDeliver] = useState(false);
  const [showEvaluate, setShowEvaluate] = useState(false);
  const [deliverText, setDeliverText] = useState('');
  const [starScore, setStarScore] = useState(5);
  const [evalText, setEvalText] = useState('');
  const [actionDone, setActionDone] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(order?.order_status || '');

  if (!order) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-400">
        工单不存在
      </div>
    );
  }

  const logs = progressLogs[order.order_id] || [];
  const isProvider = order.provider_id === currentUser.student_id;
  const isDemander = order.demander_id === currentUser.student_id;
  const otherParty = getUserById(isProvider ? order.demander_id : order.provider_id);

  function handleDeliver() {
    setShowDeliver(false);
    setCurrentStatus('待验收');
    setActionDone(true);
  }

  function handleAccept() {
    setCurrentStatus('已完成');
    setActionDone(true);
  }

  function handleEvaluate() {
    setShowEvaluate(false);
    setActionDone(true);
    setTimeout(() => setActionDone(false), 2000);
  }

  return (
    <div className="min-h-screen pb-6 md:max-w-3xl md:mx-auto md:pt-6">
      {/* 顶部状态区 */}
      <div className={`px-4 py-6 border-b ${statusBg[currentStatus] || statusBg['待确认']}`}>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs text-gray-500 mb-1">工单 {order.order_id}</div>
            <span className={`inline-block text-lg font-bold ${statusTextColor[currentStatus] || ''}`}>
              {currentStatus}
            </span>
          </div>
          <div className="text-right">
            <div className="text-xs text-gray-500 mb-1">报酬金额</div>
            <div className="text-2xl font-bold text-primary">¥{order.reward_amount}</div>
          </div>
        </div>
      </div>

      {/* 进度时间轴 */}
      <div className="bg-white px-4 py-4 md:rounded-xl md:shadow-sm md:mx-0 md:mt-4">
        <h3 className="text-sm font-semibold text-gray-700 mb-4">进度追踪</h3>
        <div className="relative">
          {logs.map((log, i) => (
            <div key={i} className="flex gap-4 pb-5 relative">
              {/* 竖线 */}
              {i < logs.length - 1 && (
                <div className="absolute left-[11px] top-7 bottom-0 w-0.5 bg-gray-200" />
              )}
              {/* 圆点 */}
              <div className={`relative z-10 w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 ${
                i === logs.length - 1
                  ? 'bg-primary border-primary'
                  : 'bg-gray-100 border-gray-300'
              }`}>
                {i === logs.length - 1 && (
                  <span className="w-2 h-2 rounded-full bg-white" />
                )}
              </div>
              {/* 内容 */}
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-gray-800">{log.title}</div>
                <div className="text-xs text-gray-500 mt-0.5">{log.desc}</div>
                <div className="text-xs text-gray-400 mt-0.5">{log.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 任务信息 */}
      <div className="bg-white mt-2 px-4 py-4 md:rounded-xl md:shadow-sm md:mt-4">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">任务信息</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">任务描述</span>
            <span className="text-gray-800 text-right max-w-[60%]">{order.task_description || '-'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">约定交付</span>
            <span className="text-gray-800">{order.agreed_delivery_time}</span>
          </div>
          {order.actual_delivery_time && (
            <div className="flex justify-between">
              <span className="text-gray-500">实际交付</span>
              <span className="text-gray-800">{order.actual_delivery_time}</span>
            </div>
          )}
          {order.delivery_requirement && (
            <div className="flex justify-between">
              <span className="text-gray-500 shrink-0">交付要求</span>
              <span className="text-gray-800 text-right max-w-[60%]">{order.delivery_requirement}</span>
            </div>
          )}
        </div>
      </div>

      {/* 对方信息 */}
      <div className="bg-white mt-2 px-4 py-4 md:rounded-xl md:shadow-sm md:mt-4">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">
          {isProvider ? '需求方信息' : '服务方信息'}
        </h3>
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white ${
            isProvider ? 'bg-amber-500' : 'bg-primary'
          }`}>
            {otherParty?.name?.[0]}
          </div>
          <div>
            <div className="text-sm font-medium text-gray-800">{otherParty?.name}</div>
            <div className="text-xs text-gray-500">{otherParty?.college}</div>
          </div>
        </div>
      </div>

      {/* 动态操作按钮区 */}
      <div className="bg-white mt-2 px-4 py-4 md:rounded-xl md:shadow-sm md:mt-4">
        {actionDone && (
          <div className="text-center py-3 text-green-600 text-sm font-medium bg-green-50 rounded-lg mb-3">
            ✓ 操作成功
          </div>
        )}

        {/* 进行中 + 我是服务方 -> 提交交付成果 */}
        {currentStatus === '进行中' && isProvider && (
          <button
            onClick={() => setShowDeliver(true)}
            className="w-full bg-primary text-white font-medium py-3 rounded-xl text-sm hover:bg-blue-700 transition-colors"
          >
            提交交付成果
          </button>
        )}

        {/* 待验收 + 我是需求方 -> 确认验收 + 发起申诉 */}
        {currentStatus === '待验收' && isDemander && (
          <div className="flex gap-3">
            <button
              onClick={() => setShowDeliver(true)}
              className="flex-1 bg-red-50 text-red-600 border border-red-200 font-medium py-3 rounded-xl text-sm hover:bg-red-100 transition-colors"
            >
              发起申诉
            </button>
            <button
              onClick={handleAccept}
              className="flex-1 bg-primary text-white font-medium py-3 rounded-xl text-sm hover:bg-blue-700 transition-colors"
            >
              确认验收并付款
            </button>
          </div>
        )}

        {/* 已完成 + 未评价 -> 评价对方 */}
        {currentStatus === '已完成' && (
          <button
            onClick={() => setShowEvaluate(true)}
            className="w-full bg-amber-500 text-white font-medium py-3 rounded-xl text-sm hover:bg-amber-600 transition-colors"
          >
            评价对方
          </button>
        )}

        {/* 无操作时显示提示 */}
        {!actionDone && (
          (currentStatus === '进行中' && !isProvider) ||
          (currentStatus === '待确认') ||
          (currentStatus === '申诉中')
        ) && (
          <p className="text-center text-sm text-gray-400 py-2">
            {currentStatus === '进行中' ? '等待服务方提交成果...' :
             currentStatus === '待确认' ? '等待服务方确认接单...' :
             '平台正在处理申诉，请耐心等待'}
          </p>
        )}
      </div>

      {/* 提交交付成果弹窗 */}
      {showDeliver && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-6">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm">
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              {currentStatus === '待验收' && isDemander ? '发起申诉' : '提交交付成果'}
            </h3>
            <textarea
              rows={4}
              placeholder={currentStatus === '待验收' && isDemander ? '请描述申诉原因...' : '上传截图链接，或输入交付说明...'}
              value={deliverText}
              onChange={e => setDeliverText(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary mb-4"
            />
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeliver(false)}
                className="flex-1 py-2.5 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                取消
              </button>
              <button
                onClick={handleDeliver}
                className="flex-1 py-2.5 text-sm font-medium text-white bg-primary rounded-lg hover:bg-blue-700 transition-colors"
              >
                确认提交
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 评价弹窗 */}
      {showEvaluate && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-6">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm">
            <h3 className="text-lg font-bold text-gray-800 mb-4">评价对方</h3>
            <div className="flex items-center gap-1 mb-4">
              {[1, 2, 3, 4, 5].map(s => (
                <button
                  key={s}
                  onClick={() => setStarScore(s)}
                  className={`text-3xl transition-colors ${s <= starScore ? 'text-yellow-400' : 'text-gray-300'}`}
                >
                  ★
                </button>
              ))}
              <span className="text-sm text-gray-500 ml-2">{starScore} 分</span>
            </div>
            <textarea
              rows={3}
              placeholder="写下你的评价..."
              value={evalText}
              onChange={e => setEvalText(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary mb-4"
            />
            <div className="flex gap-3">
              <button
                onClick={() => setShowEvaluate(false)}
                className="flex-1 py-2.5 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                取消
              </button>
              <button
                onClick={handleEvaluate}
                className="flex-1 py-2.5 text-sm font-medium text-white bg-primary rounded-lg hover:bg-blue-700 transition-colors"
              >
                提交评价
              </button>
            </div>
          </div>
        </div>
      )}

      {actionDone && <div className="h-4" />}
    </div>
  );
}
