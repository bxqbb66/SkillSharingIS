import { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { skills, demands, currentUser } from '../data/mockData';
import { useAuth } from '../data/AuthContext';
import { avatarUrl } from '../utils/images';
import SkillCard from '../components/SkillCard';
import DemandCard from '../components/DemandCard';
import { CardSkeleton } from '../components/Skeleton';

const categories = ['全部', '学业', '技术', '生活', '文体'];

export default function Home() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { isLoggedIn, user } = useAuth();
  const myFilter = searchParams.get('my');
  const [loading, setLoading] = useState(true);

  const initialTab = myFilter === 'demands' ? 'demands' : 'skills';
  const [activeTab, setActiveTab] = useState(initialTab);
  const [activeCategory, setActiveCategory] = useState('全部');
  const [keyword, setKeyword] = useState('');

  const showOnlyMine = !!myFilter;

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const displayedSkills = useMemo(() => {
    let list = showOnlyMine
      ? skills.filter(s => s.provider_id === currentUser.student_id)
      : skills;
    if (activeCategory !== '全部') {
      list = list.filter(s => s.skill_category === activeCategory);
    }
    if (keyword.trim()) {
      const kw = keyword.trim().toLowerCase();
      list = list.filter(s => s.skill_tag.toLowerCase().includes(kw));
    }
    return list;
  }, [activeCategory, keyword, showOnlyMine]);

  const displayedDemands = useMemo(() => {
    let list = showOnlyMine
      ? demands.filter(d => d.demander_id === currentUser.student_id)
      : demands;
    if (activeCategory !== '全部') {
      list = list.filter(d => d.service_type === activeCategory);
    }
    if (keyword.trim()) {
      const kw = keyword.trim().toLowerCase();
      list = list.filter(d => d.demand_tag.toLowerCase().includes(kw));
    }
    return list;
  }, [activeCategory, keyword, showOnlyMine]);

  function handleTabChange(tab) {
    setActiveTab(tab);
    setActiveCategory('全部');
    setKeyword('');
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* === 顶部导航栏 === */}
      <header className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
        <div className="flex items-center justify-between px-4 py-2.5 md:px-6 md:py-3">
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
          {isLoggedIn ? (
            <Link to="/profile" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <img
                src={avatarUrl(user?.student_id)}
                alt={user?.name}
                className="w-8 h-8 rounded-full bg-gray-100"
              />
              <span className="text-xs text-gray-700 hidden md:inline">{user?.name}</span>
            </Link>
          ) : (
            <button
              onClick={() => navigate('/login')}
              className="text-xs md:text-sm text-primary border border-primary px-3 py-1.5 rounded-full hover:bg-primary hover:text-white transition-colors"
            >
              登录 / 注册
            </button>
          )}
        </div>
      </header>

      {/* === 搜索框 === */}
      <div className="bg-white px-4 py-2.5 md:px-6">
        <div className="relative">
          <input
            type="text"
            placeholder={activeTab === 'skills' ? '搜索技能标签，如：PPT、高数...' : '搜索需求标签，如：修电脑、搬家...'}
            value={keyword}
            onChange={e => setKeyword(e.target.value)}
            className="w-full bg-gray-100 rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:bg-white"
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
          {keyword && (
            <button
              onClick={() => setKeyword('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-sm"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* === 技能/需求 Tab 切换 === */}
      <div className="bg-white border-b border-gray-100">
        <div className="flex px-4 md:px-6 items-center">
          <button
            onClick={() => handleTabChange('skills')}
            className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'skills'
                ? 'text-primary border-primary'
                : 'text-gray-500 border-transparent hover:text-gray-700'
            }`}
          >
            {showOnlyMine ? '我的技能' : '技能广场'}
          </button>
          <button
            onClick={() => handleTabChange('demands')}
            className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'demands'
                ? 'text-primary border-primary'
                : 'text-gray-500 border-transparent hover:text-gray-700'
            }`}
          >
            {showOnlyMine ? '我的需求' : '需求广场'}
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
                ? 'bg-primary text-white font-medium'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* === 卡片列表 === */}
      <div className="px-4 pb-4 md:px-6 md:pb-6 flex-1 page-enter">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            {[1, 2, 3, 4, 5, 6].map(i => <CardSkeleton key={i} />)}
          </div>
        ) : activeTab === 'skills' ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
              {displayedSkills.map(skill => (
                <SkillCard key={skill.skill_id} skill={skill} />
              ))}
            </div>
            {displayedSkills.length === 0 && (
              <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                <svg className="w-24 h-24 mb-4 text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <p className="text-sm font-medium text-gray-500">
                  {keyword ? `未找到与"${keyword}"相关的技能` : '暂无该分类的技能'}
                </p>
                <p className="text-xs mt-1 text-gray-400">
                  {keyword ? '试试其他关键词' : '去发布页面创建第一个技能吧'}
                </p>
              </div>
            )}
          </>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
              {displayedDemands.map(demand => (
                <DemandCard key={demand.demand_id} demand={demand} />
              ))}
            </div>
            {displayedDemands.length === 0 && (
              <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                <svg className="w-24 h-24 mb-4 text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <p className="text-sm font-medium text-gray-500">
                  {keyword ? `未找到与"${keyword}"相关的需求` : '暂无该分类的需求'}
                </p>
                <p className="text-xs mt-1 text-gray-400">
                  {keyword ? '试试其他关键词' : '去发布页面发布第一个需求吧'}
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
