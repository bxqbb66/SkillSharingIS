import { Link } from 'react-router-dom';
import { useStore } from '../data/store';
import { avatarUrl, getCategoryMeta } from '../utils/images';

const categoryColors = {
  '学业': 'bg-blue-50 text-blue-700', '学业辅导': 'bg-blue-50 text-blue-700',
  '技术': 'bg-purple-50 text-purple-700', '技术服务': 'bg-purple-50 text-purple-700',
  '生活': 'bg-green-50 text-green-700', '生活服务': 'bg-green-50 text-green-700',
  '文体': 'bg-orange-50 text-orange-700', '文体服务': 'bg-orange-50 text-orange-700',
};

export default function SkillCard({ skill }) {
  const store = useStore();
  const provider = store.getUserById(skill.provider_id);
  if (!provider) return null;

  const meta = getCategoryMeta(skill.skill_category);

  return (
    <Link
      to={`/skill/${skill.skill_id}`}
      className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover-card cursor-pointer block"
    >
      {/* Category gradient header */}
      <div className={`relative h-28 bg-gradient-to-br ${meta.gradient} flex items-center justify-center`}>
        <span className="text-5xl drop-shadow-lg">{meta.emoji}</span>
        <div className="absolute bottom-0 left-0 right-0 bg-black/20 px-3 py-1.5">
          <span className="text-white text-xs font-medium truncate block">{skill.skill_tag}</span>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-start gap-3">
          <img
            src={avatarUrl(provider.student_id)}
            alt={provider.name}
            className="w-11 h-11 rounded-full bg-gray-100 shrink-0"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-semibold text-gray-800 text-sm">{provider.name}</span>
              <span className={`text-xs px-1.5 py-0.5 rounded ${categoryColors[skill.skill_category] || 'bg-gray-100 text-gray-600'}`}>
                {skill.skill_category}
              </span>
              <span className="text-xs text-yellow-500">★ {provider.credit_level}</span>
            </div>
            <p className="text-gray-500 text-xs mt-1 line-clamp-2">{skill.skill_description}</p>
            <div className="flex items-center justify-between mt-3">
              <span className="text-primary font-bold text-base">¥{skill.service_price}<span className="text-xs text-gray-400 font-normal">/次</span></span>
              <span className="text-xs bg-primary text-white px-3 py-1.5 rounded-full hover:bg-primary-light transition-colors inline-block btn-press">
                立即下单
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
