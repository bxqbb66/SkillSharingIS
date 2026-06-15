import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getUserById, skills, demands } from '../data/mockData';
import { useStore } from '../data/store';
import SkillCard from '../components/SkillCard';
import DemandCard from '../components/DemandCard';

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

  const user = getUserById(id);
  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center">
        <div className="text-5xl mb-4">🔍</div>
        <h2 className="text-lg font-bold text-gray-800 mb-2">用户不存在</h2>
        <p className="text-sm text-gray-500 mb-6">该用户可能已注销或ID不存在</p>
        <button
          onClick={() => navigate(-1)}
          className="bg-primary text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-blue-700 transition-colors"
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
            <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center text-3xl font-bold border-2 border-white/40 shrink-0">
              {user.name[0]}
            </div>
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
              <div className="text-center py-16 text-gray-400 text-sm">Ta还没有发布技能</div>
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
              <div className="text-center py-16 text-gray-400 text-sm">Ta还没有发布需求</div>
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
              <div className="text-center py-16 text-gray-400 text-sm">Ta还没有收到评价</div>
            ) : (
              <div className="space-y-3">
                {userEvals.map(e => {
                  const evaluator = getUserById(e.evaluator_id);
                  return (
                    <div key={e.evaluation_id} className="bg-white rounded-xl shadow-sm p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <Link to={`/user/${e.evaluator_id}`} className="w-9 h-9 rounded-full bg-gray-300 text-white flex items-center justify-center text-xs font-bold hover:opacity-80 transition-opacity">
                          {evaluator?.name?.[0]}
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
