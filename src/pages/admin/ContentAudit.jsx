import { useState } from 'react';
import { useStore } from '../../data/store';

const categoryColors = {
  '学业': 'bg-blue-50 text-blue-700', '学业辅导': 'bg-blue-50 text-blue-700',
  '技术': 'bg-purple-50 text-purple-700', '技术服务': 'bg-purple-50 text-purple-700',
  '生活': 'bg-green-50 text-green-700', '生活服务': 'bg-green-50 text-green-700',
  '文体': 'bg-orange-50 text-orange-700', '文体服务': 'bg-orange-50 text-orange-700',
};

export default function ContentAudit() {
  const store = useStore();
  const skills = store.getSkills();
  const demands = store.getDemands();
  const [tab, setTab] = useState('skills');
  const [selectedItem, setSelectedItem] = useState(null);
  const [opinion, setOpinion] = useState('');

  const skillItems = skills.filter(s => s.audit_status === 0);
  const demandItems = demands.filter(d => d.audit_status === 0);
  const items = tab === 'skills' ? skillItems : demandItems;

  function handleAudit(decision) {
    if (!selectedItem) return;
    const type = tab === 'skills' ? 'skill' : 'demand';
    store.auditPost(type, tab === 'skills' ? selectedItem.skill_id : selectedItem.demand_id, decision, opinion);
    setSelectedItem(null);
    setOpinion('');
  }

  return (
    <div className="p-4 md:p-6 page-enter">
      <h1 className="text-xl font-bold text-gray-800 mb-4">内容审核</h1>

      {/* Tab */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => { setTab('skills'); setSelectedItem(null); }}
          className={`text-sm px-4 py-2 rounded-lg transition-colors ${
            tab === 'skills' ? 'bg-primary text-white' : 'bg-white text-gray-600 border'
          }`}
        >
          待审技能 ({skillItems.length})
        </button>
        <button
          onClick={() => { setTab('demands'); setSelectedItem(null); }}
          className={`text-sm px-4 py-2 rounded-lg transition-colors ${
            tab === 'demands' ? 'bg-primary text-white' : 'bg-white text-gray-600 border'
          }`}
        >
          待审需求 ({demandItems.length})
        </button>
      </div>

      <div className="flex gap-6 flex-col lg:flex-row">
        {/* List */}
        <div className="flex-1 space-y-2">
          {items.length === 0 ? (
            <div className="bg-white rounded-xl p-8 text-center text-gray-400 text-sm">暂无待审核内容</div>
          ) : (
            items.map(item => {
              const tag = item.skill_tag || item.demand_tag;
              const category = item.skill_category || item.service_type;
              const price = item.service_price || item.budget_amount;
              const isSelected = selectedItem && (selectedItem.skill_id || selectedItem.demand_id) === (item.skill_id || item.demand_id);
              return (
                <button
                  key={item.skill_id || item.demand_id}
                  onClick={() => setSelectedItem(item)}
                  className={`w-full text-left bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition-shadow ${
                    isSelected ? 'ring-2 ring-primary' : ''
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-gray-800">{tag}</span>
                    <span className="font-bold text-primary">¥{price}</span>
                  </div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-xs px-1.5 py-0.5 rounded ${categoryColors[category] || 'bg-gray-100 text-gray-600'}`}>
                      {category}
                    </span>
                    <span className="text-xs text-orange-500 font-medium">待审核</span>
                  </div>
                  <p className="text-xs text-gray-500 line-clamp-2">
                    {item.skill_description || item.task_description}
                  </p>
                </button>
              );
            })
          )}
        </div>

        {/* Detail panel */}
        {selectedItem && (
          <div className="lg:w-80 bg-white rounded-xl shadow-sm p-5">
            <h3 className="font-semibold text-gray-800 mb-3">
              {selectedItem.skill_tag || selectedItem.demand_tag}
            </h3>
            <div className="space-y-2 text-sm mb-4">
              <div className="flex justify-between">
                <span className="text-gray-500">类别</span>
                <span className="text-gray-800">{selectedItem.skill_category || selectedItem.service_type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">价格/预算</span>
                <span className="text-gray-800 font-medium">¥{selectedItem.service_price || selectedItem.budget_amount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">发布时间</span>
                <span className="text-gray-800 text-xs">{selectedItem.created_at || '近期'}</span>
              </div>
              {selectedItem.qualification_info && (
                <div className="flex justify-between">
                  <span className="text-gray-500">资质</span>
                  <span className="text-gray-800 text-xs">{selectedItem.qualification_info}</span>
                </div>
              )}
              {selectedItem.urgent_flag === 1 && (
                <span className="inline-block text-xs bg-red-50 text-red-600 px-2 py-0.5 rounded">紧急需求</span>
              )}
            </div>
            <p className="text-xs text-gray-600 mb-4 bg-gray-50 rounded-lg p-3">
              {selectedItem.skill_description || selectedItem.task_description}
            </p>
            <textarea
              rows={2}
              placeholder="审核意见（可选）"
              value={opinion}
              onChange={e => setOpinion(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-primary/30 mb-3"
            />
            <div className="flex gap-2">
              <button
                onClick={() => handleAudit('驳回')}
                className="flex-1 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors btn-press"
              >
                驳回
              </button>
              <button
                onClick={() => handleAudit('通过')}
                className="flex-1 py-2 text-sm font-medium text-white bg-green-500 rounded-lg hover:bg-green-600 transition-colors btn-press"
              >
                通过
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
