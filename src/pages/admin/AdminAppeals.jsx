import { useState } from 'react';
import { useStore } from '../../data/store';

export default function AdminAppeals() {
  const store = useStore();
  const appeals = store.getAppeals();
  const [selectedAppeal, setSelectedAppeal] = useState(null);
  const [decision, setDecision] = useState({
    description: '',
    finalStatus: '已关闭',
    refundRatio: 0,
    providerCreditChange: 0,
    demanderCreditChange: 0,
    responsibleParty: '',
  });

  const pending = appeals.filter(a => a.process_status !== '已裁决');
  const resolved = appeals.filter(a => a.process_status === '已裁决');

  function handleArbitrate() {
    if (!selectedAppeal) return;
    store.arbitrateAppeal(selectedAppeal.appeal_id, decision);
    setSelectedAppeal(null);
    setDecision({ description: '', finalStatus: '已关闭', refundRatio: 0, providerCreditChange: 0, demanderCreditChange: 0, responsibleParty: '' });
  }

  return (
    <div className="p-4 md:p-6 page-enter">
      <h1 className="text-xl font-bold text-gray-800 mb-4">申诉仲裁</h1>

      <div className="flex gap-6 flex-col lg:flex-row">
        <div className="flex-1">
          {/* Pending appeals */}
          <h2 className="text-sm font-semibold text-gray-700 mb-2">
            待处理 ({pending.length})
          </h2>
          <div className="space-y-2 mb-6">
            {pending.length === 0 ? (
              <div className="bg-white rounded-xl p-6 text-center text-gray-400 text-sm">暂无待处理申诉</div>
            ) : (
              pending.map(a => (
                <button
                  key={a.appeal_id}
                  onClick={() => setSelectedAppeal(a)}
                  className={`w-full text-left bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition-shadow ${
                    selectedAppeal?.appeal_id === a.appeal_id ? 'ring-2 ring-primary' : ''
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-xs text-gray-500">{a.appeal_id}</span>
                    <span className="text-xs bg-orange-50 text-orange-700 px-2 py-0.5 rounded">{a.process_status}</span>
                  </div>
                  <p className="text-sm text-gray-800 font-medium">{a.appeal_type}</p>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">{a.appeal_description}</p>
                  <div className="text-xs text-gray-400 mt-2">工单：{a.order_id} · {a.created_at}</div>
                </button>
              ))
            )}
          </div>

          {/* Resolved */}
          <h2 className="text-sm font-semibold text-gray-700 mb-2">
            已裁决 ({resolved.length})
          </h2>
          <div className="space-y-2">
            {resolved.map(a => (
              <div key={a.appeal_id} className="bg-white rounded-xl shadow-sm p-4 opacity-60">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-xs text-gray-500">{a.appeal_id}</span>
                  <span className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded">已裁决</span>
                </div>
                <p className="text-sm text-gray-800">{a.appeal_type}</p>
                <p className="text-xs text-gray-500 mt-1">裁决：{a.arbitration_result}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Arbitration panel */}
        {selectedAppeal && (
          <div className="lg:w-80 bg-white rounded-xl shadow-sm p-5">
            <h3 className="font-semibold text-gray-800 mb-3">申诉详情</h3>
            <div className="space-y-2 text-sm mb-4">
              <div className="flex justify-between">
                <span className="text-gray-500">申诉ID</span>
                <span className="text-gray-800 font-mono text-xs">{selectedAppeal.appeal_id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">关联工单</span>
                <span className="text-gray-800">{selectedAppeal.order_id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">申诉类型</span>
                <span className="text-gray-800">{selectedAppeal.appeal_type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">申诉人</span>
                <span className="text-gray-800">{selectedAppeal.appellant_id}</span>
              </div>
            </div>
            <p className="text-xs text-gray-600 bg-gray-50 rounded-lg p-3 mb-4">
              {selectedAppeal.appeal_description}
            </p>

            {/* Arbitration form */}
            <h4 className="text-xs font-semibold text-gray-700 mb-2">裁决决定</h4>
            <div className="space-y-3">
              <textarea
                rows={2}
                placeholder="裁决描述..."
                value={decision.description}
                onChange={e => setDecision({ ...decision, description: e.target.value })}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
              <div>
                <label className="text-xs text-gray-500">最终状态</label>
                <select
                  value={decision.finalStatus}
                  onChange={e => setDecision({ ...decision, finalStatus: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs mt-1"
                >
                  <option value="已关闭">已关闭</option>
                  <option value="已完成">已完成</option>
                  <option value="进行中">进行中（继续执行）</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-gray-500">退款比例 (%)</label>
                <input
                  type="number"
                  value={decision.refundRatio}
                  onChange={e => setDecision({ ...decision, refundRatio: Number(e.target.value) })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs mt-1"
                  min="0" max="100"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs text-gray-500">服务方信用变动</label>
                  <input
                    type="number"
                    value={decision.providerCreditChange}
                    onChange={e => setDecision({ ...decision, providerCreditChange: Number(e.target.value) })}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs mt-1"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500">需求方信用变动</label>
                  <input
                    type="number"
                    value={decision.demanderCreditChange}
                    onChange={e => setDecision({ ...decision, demanderCreditChange: Number(e.target.value) })}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs mt-1"
                  />
                </div>
              </div>
              <button
                onClick={handleArbitrate}
                className="w-full py-2.5 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary-light transition-colors btn-press"
              >
                确认裁决
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
