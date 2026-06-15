import { Link } from 'react-router-dom';
import { getUserById } from '../data/mockData';
import { avatarUrl, coverUrl } from '../utils/images';

const categoryColors = {
  '学业': 'bg-blue-50 text-blue-700',
  '技术': 'bg-purple-50 text-purple-700',
  '生活': 'bg-green-50 text-green-700',
  '文体': 'bg-orange-50 text-orange-700',
};

export default function DemandCard({ demand }) {
  const demander = getUserById(demand.demander_id);
  if (!demander) return null;

  return (
    <Link
      to={`/demand/${demand.demand_id}`}
      className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover-card cursor-pointer block"
    >
      <img
        src={coverUrl(demand.demand_id)}
        alt={demand.demand_tag}
        className="w-full h-32 object-cover"
        loading="lazy"
      />
      <div className="p-4">
        <div className="flex items-start gap-3">
          <img
            src={avatarUrl(demander.student_id)}
            alt={demander.name}
            className="w-11 h-11 rounded-full bg-gray-100 shrink-0"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-semibold text-gray-800 text-sm">{demander.name}</span>
              <span className={`text-xs px-1.5 py-0.5 rounded ${categoryColors[demand.service_type] || 'bg-gray-100 text-gray-600'}`}>
                {demand.service_type}
              </span>
              {demand.urgent_flag === 1 && (
                <span className="text-xs bg-red-50 text-red-600 px-1.5 py-0.5 rounded">紧急</span>
              )}
              <span className="text-xs text-yellow-500">★ {demander.credit_level}</span>
            </div>
            <p className="text-gray-500 text-xs mt-1 line-clamp-2">{demand.task_description}</p>
            <div className="flex items-center justify-between mt-3">
              <div>
                <span className="text-amber-600 font-bold text-base">¥{demand.budget_amount}</span>
                <span className="text-xs text-gray-400 ml-2">截止 {demand.deadline}</span>
              </div>
              <span className="text-xs bg-amber-500 text-white px-3 py-1.5 rounded-full hover:bg-amber-600 transition-colors inline-block btn-press">
                我要接单
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
