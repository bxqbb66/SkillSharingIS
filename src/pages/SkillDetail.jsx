import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getSkillById, getUserById } from '../data/mockData';
import { useStore } from '../data/store';
import { avatarUrl } from '../utils/images';
import { DetailSkeleton } from '../components/Skeleton';

const categoryColors = {
  '学业': 'bg-blue-50 text-blue-700',
  '技术': 'bg-purple-50 text-purple-700',
  '生活': 'bg-green-50 text-green-700',
  '文体': 'bg-orange-50 text-orange-700',
};

export default function SkillDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const store = useStore();
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const skill = getSkillById(id);

  if (loading) return <DetailSkeleton />;

  if (!skill) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-400">
        技能不存在或已下架
      </div>
    );
  }

  const provider = getUserById(skill.provider_id);
  const providerEvals = store.getEvaluationsForUser(skill.provider_id);

  function handleConfirm() {
    setShowConfirm(false);
    setConfirmed(true);
    setTimeout(() => navigate('/orders'), 1200);
  }

  if (confirmed) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center mx-4">
          <div className="text-4xl mb-3">📋</div>
          <h2 className="text-lg font-bold text-gray-800 mb-1">工单生成成功</h2>
          <p className="text-sm text-gray-500">请尽快联系对方确认服务详情</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row md:gap-6 md:p-6 md:max-w-5xl md:mx-auto">
      {/* 左侧：详情内容 */}
      <div className="flex-1 md:w-2/3">
        {/* 返回按钮 + 顶部标签区 */}
        <div className="bg-white px-4 py-4 md:rounded-xl md:shadow-sm">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1 text-sm text-gray-500 hover:text-primary mb-3 transition-colors"
          >
            <span className="text-lg leading-none">‹</span>
            <span>返回</span>
          </button>
          <div className="flex items-center gap-2 flex-wrap mb-3">
            <span className="text-lg font-bold text-gray-800">{skill.skill_tag}</span>
            <span className={`text-xs px-2 py-0.5 rounded ${categoryColors[skill.skill_category] || 'bg-gray-100 text-gray-600'}`}>
              {skill.skill_category}
            </span>
            <span className="text-xs bg-green-50 text-green-600 px-2 py-0.5 rounded">已审核</span>
          </div>
          <div className="text-primary font-bold text-3xl">
            ¥{skill.service_price}
            <span className="text-sm text-gray-400 font-normal ml-1">/次</span>
          </div>
        </div>

        <div className="bg-white mt-2 px-4 py-4 md:rounded-xl md:shadow-sm md:mt-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">可服务时间</h3>
          <p className="text-sm text-gray-600">{skill.available_time || '未设置'}</p>
        </div>

        <div className="bg-white mt-2 px-4 py-4 md:rounded-xl md:shadow-sm md:mt-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">技能描述</h3>
          <p className="text-sm text-gray-600 leading-relaxed">{skill.skill_description}</p>
        </div>

        {skill.qualification_info && (
          <div className="bg-white mt-2 px-4 py-4 md:rounded-xl md:shadow-sm md:mt-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">资质信息</h3>
            <p className="text-sm text-gray-600">{skill.qualification_info}</p>
          </div>
        )}

        <div className="bg-white mt-2 px-4 py-4 md:rounded-xl md:shadow-sm md:mt-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">作品展示</h3>
          <div className="grid grid-cols-3 gap-2">
            {[1, 2, 3].map(i => (
              <div key={i} className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center text-gray-300 text-2xl border border-gray-200">
                🖼️
              </div>
            ))}
          </div>
        </div>

        {/* 历史评价 */}
        {providerEvals.length > 0 && (
          <div className="bg-white mt-2 px-4 py-4 md:rounded-xl md:shadow-sm md:mt-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">
              历史评价（{providerEvals.length}）
            </h3>
            <div className="space-y-3">
              {providerEvals.map(e => {
                const evaluator = getUserById(e.evaluator_id);
                return (
                  <div key={e.evaluation_id} className="border-b border-gray-50 pb-3 last:border-0 last:pb-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Link to={`/user/${e.evaluator_id}`} className="hover:opacity-80 transition-opacity">
                        <img src={avatarUrl(e.evaluator_id)} alt={evaluator?.name} className="w-7 h-7 rounded-full bg-gray-100" />
                      </Link>
                      <span className="text-xs font-medium text-gray-700">{evaluator?.name}</span>
                      <span className="text-xs text-yellow-500">{'★'.repeat(e.star_score)}{'☆'.repeat(5 - e.star_score)}</span>
                    </div>
                    <p className="text-xs text-gray-500 ml-9">{e.evaluation_text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* 右侧：发布者信息 + 操作（桌面端） */}
      <div className="hidden md:block md:w-1/3">
        <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
          <Link to={`/user/${skill.provider_id}`} className="flex items-center gap-3 mb-4 hover:opacity-80 transition-opacity">
            <img
              src={avatarUrl(provider?.student_id)}
              alt={provider?.name}
              className="w-14 h-14 rounded-full bg-gray-100"
            />
            <div>
              <div className="font-semibold text-gray-800">{provider?.name}</div>
              <div className="text-xs text-gray-500 mt-0.5">{provider?.college}</div>
              <div className="flex items-center gap-1 mt-1">
                <span className="text-xs text-yellow-500">★ {provider?.credit_level}</span>
                <span className="text-xs text-gray-400 ml-1">信用 {provider?.credit_score}分</span>
              </div>
            </div>
          </Link>
          <button
            onClick={() => setShowConfirm(true)}
            className="w-full bg-primary text-white font-medium py-3 rounded-xl text-sm hover:bg-primary-light transition-colors btn-press"
          >
            立即预约
          </button>
        </div>
      </div>

      {/* 手机端底部悬浮操作栏 */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 z-10 flex items-center gap-3">
        <Link to={`/user/${skill.provider_id}`} className="flex items-center gap-2 flex-1">
          <img
            src={avatarUrl(provider?.student_id)}
            alt={provider?.name}
            className="w-9 h-9 rounded-full bg-gray-100 shrink-0"
          />
          <div>
            <div className="text-sm font-semibold text-gray-800">{provider?.name}</div>
            <div className="text-xs text-yellow-500">★ {provider?.credit_level}</div>
          </div>
        </Link>
        <button
          onClick={() => setShowConfirm(true)}
          className="bg-primary text-white font-medium px-8 py-2.5 rounded-full text-sm hover:bg-primary-light transition-colors btn-press"
        >
          立即预约
        </button>
      </div>

      {showConfirm && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-6">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm">
            <h3 className="text-lg font-bold text-gray-800 mb-2">确认预约</h3>
            <p className="text-sm text-gray-500 mb-6">确认要预约此项技能服务吗？确认后将生成工单。</p>
            <div className="flex gap-3">
              <button onClick={() => setShowConfirm(false)} className="flex-1 py-2.5 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">取消</button>
              <button onClick={handleConfirm} className="flex-1 py-2.5 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary-light transition-colors">确认预约</button>
            </div>
          </div>
        </div>
      )}

      <div className="md:hidden h-16" />
    </div>
  );
}
