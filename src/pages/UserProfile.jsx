import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getUserById, skills, demands } from '../data/mockData';
import { useStore } from '../data/store';
import { avatarUrl } from '../utils/images';
import SkillCard from '../components/SkillCard';
import DemandCard from '../components/DemandCard';
import { ProfileSkeleton } from '../components/Skeleton';

const levelBadge = {
  'A': 'bg-green-500',
  'B': 'bg-blue-500',
  'C': 'bg-yellow-500',
  'D': 'bg-red-500',
};

export default function UserProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const store = useStore();
  const [tab, setTab] = useState('skills');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const user = getUserById(id);

  if (loading) return <ProfileSkeleton />;

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center">
        <div className="text-5xl mb-4">🔍</div>
        <h2 className="text-lg font-bold text-gray-800 mb-2">用户不存在</h2>
        <p className="text-sm text-gray-500 mb-6">该用户可能已注销或ID不存在</p>
        <button
          onClick={() => navigate(-1)}
          className="bg-primary text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-primary-light transition-colors"
        >
          返回上一页
        </button>
      </div>
    );
  }

  const userSkills = skills.filter(s => s.provider_id === user.student_id && s.audit_status === 1);
  const userDemands = demands.filter(d => d.demander_id === user.student_id && d.audit_status === 1);
  const userEvals = store.getEvaluationsForUser(user.student_id);
  const completedCount = userSkills.filter(s => s.skill_status === 2).length + userDemands.filter(d => d.demand_status === 2).length;

  return (
    <div className="min-h-screen pb-6 md:max-w-4xl md:mx-auto md:pt-6">
      {/* 返回按钮 */}
      <div className="px-4 py-3 md:px-0">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 text-sm text-gray-500 hover:text-primary transition-colors"
        >
          <span className="text-lg leading-none">‹</span>
          <span>返回</span>
        </button>
      </div>

      {/* 顶部用户信息横幅 */}
      <div className="bg-white mx-4 md:mx-0 md:rounded-xl md:shadow-sm">
        <div className="bg-primary text-white px-6 py-6 md:rounded-t-xl">
          <div className="flex items-center gap-5">
            <img
              src={avatarUrl(user.student_id)}
              alt={user.name}
              className="w-20 h-20 rounded-full bg-white/20 border-2 border-white/40 shrink-0"
            />
            <div>
              <div className="text-xl font-bold">{user.name}</div>
              <div className="text-sm text-white/80 mt-1">{user.college}</div>
              <div className="text-xs text-white/60 mt-0.5">学号：{user.student_id}</div>
            </div>
          </div>

          {/* 信用 + 统计 */}
          <div className="flex items-center gap-4 mt-5">
            <div className="flex items-center gap-2 bg-white/20 rounded-lg px-3 py-2">
              <span className="text-xs text-white/70">信用分</span>
              <span className="text-lg font-bold">{user.credit_score}</span>
              <span className={`w-7 h-7 rounded-full ${levelBadge[user.credit_level] || 'bg-gray-400'} flex items-center justify-center text-white text-xs font-bold`}>
                {user.credit_level}
              </span>
            </div>
          </div>
        </div>

        {/* 统计概览 */}
        <div className="flex justify-around py-4 text-center">
          <div>
            <div className="text-lg font-bold text-gray-800">{userSkills.length}</div>
            <div className="text-xs text-gray-500">发布技能</div>
          </div>
          <div className="border-x border-gray-100 px-8">
            <div className="text-lg font-bold text-gray-800">{userDemands.length}</div>
            <div className="text-xs text-gray-500">发布需求</div>
          </div>
          <div>
            <div className="text-lg font-bold text-gray-800">{completedCount}</div>
            <div className="text-xs text-gray-500">历史成交</div>
          </div>
          <div className="border-l border-gray-100 pl-8">
            <div className="text-lg font-bold text-gray-800">{userEvals.length}</div>
            <div className="text-xs text-gray-500">收到评价</div>
          </div>
        </div>
      </div>

      {/* Tab 切换 */}
      <div className="bg-white mt-2 mx-4 md:mx-0 border-b border-gray-100 md:rounded-t-xl md:shadow-sm">
        <div className="flex">
          {[
            { key: 'skills', label: 'Ta的技能', count: userSkills.length },
            { key: 'demands', label: 'Ta的需求', count: userDemands.length },
            { key: 'evals', label: 'Ta的评价', count: userEvals.length },
          ].map(item => (
            <button
              key={item.key}
              onClick={() => setTab(item.key)}
              className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors ${
                tab === item.key
                  ? 'text-primary border-primary'
                  : 'text-gray-500 border-transparent hover:text-gray-700'
              }`}
            >
              {item.label} ({item.count})
            </button>
          ))}
        </div>
      </div>

      {/* Tab 内容 */}
      <div className="px-4 mt-4 md:px-0">
        {tab === 'skills' && (
          <>
            {userSkills.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-gray-400">
                <svg className="w-20 h-20 mb-4 text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                <p className="text-sm font-medium text-gray-500">Ta还没有发布技能</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {userSkills.map(skill => (
                  <SkillCard key={skill.skill_id} skill={skill} />
                ))}
              </div>
            )}
          </>
        )}

        {tab === 'demands' && (
          <>
            {userDemands.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-gray-400">
                <svg className="w-20 h-20 mb-4 text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
                <p className="text-sm font-medium text-gray-500">Ta还没有发布需求</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {userDemands.map(demand => (
                  <DemandCard key={demand.demand_id} demand={demand} />
                ))}
              </div>
            )}
          </>
        )}

        {tab === 'evals' && (
          <>
            {userEvals.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-gray-400">
                <svg className="w-20 h-20 mb-4 text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
                <p className="text-sm font-medium text-gray-500">Ta还没有收到评价</p>
              </div>
            ) : (
              <div className="space-y-3">
                {userEvals.map(e => {
                  const evaluator = getUserById(e.evaluator_id);
                  return (
                    <div key={e.evaluation_id} className="bg-white rounded-xl shadow-sm p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <Link to={`/user/${e.evaluator_id}`} className="hover:opacity-80 transition-opacity">
                          <img
                            src={avatarUrl(e.evaluator_id)}
                            alt={evaluator?.name}
                            className="w-9 h-9 rounded-full bg-gray-100"
                          />
                        </Link>
                        <div>
                          <Link to={`/user/${e.evaluator_id}`} className="text-sm font-medium text-gray-800 hover:text-primary transition-colors">
                            {evaluator?.name}
                          </Link>
                          <div className="text-xs text-yellow-500">{'★'.repeat(e.star_score)}{'☆'.repeat(5 - e.star_score)}</div>
                        </div>
                        <span className="text-xs text-gray-400 ml-auto">{e.created_at}</span>
                      </div>
                      <p className="text-sm text-gray-600 ml-12">{e.evaluation_text}</p>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
