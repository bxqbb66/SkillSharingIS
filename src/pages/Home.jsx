import { useState } from 'react';
import { skills, demands } from '../data/mockData';
import SkillCard from '../components/SkillCard';
import DemandCard from '../components/DemandCard';

const categories = ['全部', '学业', '技术', '生活', '文体'];

export default function Home() {
  const [activeTab, setActiveTab] = useState('skills');
  const [activeCategory, setActiveCategory] = useState('全部');

  const filteredSkills = activeCategory === '全部'
    ? skills
    : skills.filter(s => s.skill_category === activeCategory);

  const filteredDemands = activeCategory === '全部'
    ? demands
    : demands.filter(d => d.service_type === activeCategory);

  return (
    <div className="flex flex-col min-h-screen">
      {/* === 顶部导航栏 === */}
      <header className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
        <div className="flex items-center justify-between px-4 py-2.5 md:px-6 md:py-3">
          {/* 左侧：校徽 + 名称 */}
          <div className="flex items-center gap-2">
            <img
              src="/jlu-logo.png"
              alt="吉林大学校徽"
              className="h-8 md:h-9 w-auto"
            />
            <span className="text-base md:text-lg font-bold text-primary tracking-wide">
              吉大互助
            </span>
          </div>
          {/* 右侧：登录/注册 */}
          <button className="text-xs md:text-sm text-primary border border-primary px-3 py-1.5 rounded-full hover:bg-primary hover:text-white transition-colors">
            登录 / 注册
          </button>
        </div>
      </header>

      {/* === 技能/需求 Tab 切换 === */}
      <div className="bg-white border-b border-gray-100">
        <div className="flex px-4 md:px-6">
          <button
            onClick={() => setActiveTab('skills')}
            className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'skills'
                ? 'text-primary border-primary'
                : 'text-gray-500 border-transparent hover:text-gray-700'
            }`}
          >
            技能广场
          </button>
          <button
            onClick={() => setActiveTab('demands')}
            className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'demands'
                ? 'text-primary border-primary'
                : 'text-gray-500 border-transparent hover:text-gray-700'
            }`}
          >
            需求广场
          </button>
        </div>
      </div>

      {/* === 分类筛选 === */}
      <div className="flex gap-2 px-4 py-3 md:px-6 overflow-x-auto">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`text-xs md:text-sm px-3 py-1.5 rounded-full whitespace-nowrap transition-colors ${
              activeCategory === cat
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* === 卡片列表 === */}
      <div className="px-4 pb-4 md:px-6 md:pb-6 flex-1">
        {activeTab === 'skills' ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
              {filteredSkills.map(skill => (
                <SkillCard key={skill.skill_id} skill={skill} />
              ))}
            </div>
            {filteredSkills.length === 0 && (
              <div className="text-center py-20 text-gray-400">暂无该分类的技能</div>
            )}
          </>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
              {filteredDemands.map(demand => (
                <DemandCard key={demand.demand_id} demand={demand} />
              ))}
            </div>
            {filteredDemands.length === 0 && (
              <div className="text-center py-20 text-gray-400">暂无该分类的需求</div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
