import { Link } from 'react-router-dom';
import { getUserById } from '../data/mockData';
import { avatarUrl, coverUrl } from '../utils/images';

const categoryColors = {
  '学业': 'bg-blue-50 text-blue-700',
  '技术': 'bg-purple-50 text-purple-700',
  '生活': 'bg-green-50 text-green-700',
  '文体': 'bg-orange-50 text-orange-700',
};

export default function SkillCard({ skill }) {
  const provider = getUserById(skill.provider_id);
  if (!provider) return null;

  return (
    <Link
      to={`/skill/${skill.skill_id}`}
      className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover-card cursor-pointer block"
    >
      <img
        src={coverUrl(skill.skill_id)}
        alt={skill.skill_tag}
        className="w-full h-32 object-cover"
        loading="lazy"
      />
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
