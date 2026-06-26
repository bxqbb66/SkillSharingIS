import { useState } from 'react';

const defaultCategories = [
  { id: 'academic', name: '学业辅导', icon: '📚' },
  { id: 'tech', name: '技术服务', icon: '💻' },
  { id: 'life', name: '生活服务', icon: '🏠' },
  { id: 'sports', name: '文体服务', icon: '🎯' },
];

const defaultPriceRanges = [
  { label: '低价', min: 0, max: 50 },
  { label: '中价', min: 50, max: 120 },
  { label: '高价', min: 120, max: 999 },
];

const defaultCreditLevels = [
  { level: 'A', minScore: 850, color: 'bg-green-500' },
  { level: 'B', minScore: 750, color: 'bg-blue-500' },
  { level: 'C', minScore: 650, color: 'bg-yellow-500' },
  { level: 'D', minScore: 0, color: 'bg-red-500' },
];

const defaultAnnouncements = [
  { id: 'ann-1', title: '平台使用规范', content: '请文明使用平台，禁止发布违规内容。', time: '2026-06-01' },
];

export default function AdminRules() {
  const [announcements, setAnnouncements] = useState(defaultAnnouncements);
  const [newAnnTitle, setNewAnnTitle] = useState('');
  const [newAnnContent, setNewAnnContent] = useState('');

  function addAnnouncement() {
    if (!newAnnTitle.trim() || !newAnnContent.trim()) return;
    setAnnouncements(prev => [{
      id: 'ann-' + Date.now(),
      title: newAnnTitle,
      content: newAnnContent,
      time: new Date().toISOString().slice(0, 10),
    }, ...prev]);
    setNewAnnTitle('');
    setNewAnnContent('');
  }

  function deleteAnnouncement(id) {
    setAnnouncements(prev => prev.filter(a => a.id !== id));
  }

  return (
    <div className="p-4 md:p-6 page-enter">
      <h1 className="text-xl font-bold text-gray-800 mb-4">规则配置</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Categories */}
        <div className="bg-white rounded-xl shadow-sm p-5">
          <h2 className="text-sm font-semibold text-gray-700 mb-3">服务分类</h2>
          <div className="space-y-2">
            {defaultCategories.map(cat => (
              <div key={cat.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <span className="text-xl">{cat.icon}</span>
                <span className="text-sm font-medium text-gray-800">{cat.name}</span>
                <span className="text-xs text-gray-400 ml-auto">{cat.id}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Price ranges */}
        <div className="bg-white rounded-xl shadow-sm p-5">
          <h2 className="text-sm font-semibold text-gray-700 mb-3">价格区间</h2>
          <div className="space-y-2">
            {defaultPriceRanges.map((range, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium text-gray-800">{range.label}</span>
                <span className="text-xs text-gray-500 ml-auto">¥{range.min} - ¥{range.max}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Credit levels */}
        <div className="bg-white rounded-xl shadow-sm p-5">
          <h2 className="text-sm font-semibold text-gray-700 mb-3">信用等级体系</h2>
          <div className="space-y-2">
            {defaultCreditLevels.map(cl => (
              <div key={cl.level} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className={`w-8 h-8 rounded-full ${cl.color} flex items-center justify-center text-white text-sm font-bold`}>
                  {cl.level}
                </div>
                <span className="text-sm text-gray-800">≥ {cl.minScore} 分</span>
              </div>
            ))}
          </div>
        </div>

        {/* Announcements */}
        <div className="bg-white rounded-xl shadow-sm p-5">
          <h2 className="text-sm font-semibold text-gray-700 mb-3">平台公告</h2>
          <div className="space-y-2 mb-4">
            {announcements.map(ann => (
              <div key={ann.id} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-800">{ann.title}</span>
                  <button
                    onClick={() => deleteAnnouncement(ann.id)}
                    className="text-xs text-red-400 hover:text-red-600"
                  >
                    删除
                  </button>
                </div>
                <p className="text-xs text-gray-500">{ann.content}</p>
                <div className="text-xs text-gray-400 mt-1">{ann.time}</div>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-100 pt-3">
            <input
              type="text"
              placeholder="公告标题"
              value={newAnnTitle}
              onChange={e => setNewAnnTitle(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-primary/30 mb-2"
            />
            <textarea
              rows={2}
              placeholder="公告内容..."
              value={newAnnContent}
              onChange={e => setNewAnnContent(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-primary/30 mb-2"
            />
            <button
              onClick={addAnnouncement}
              className="w-full py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary-light transition-colors btn-press"
            >
              发布公告
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
