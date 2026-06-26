import { Link } from 'react-router-dom';
import { useStore } from '../data/store';
import { avatarUrl, getCategoryMeta } from '../utils/images';

const categoryColors = {
  '学业': 'bg-blue-50 text-blue-700', '学业辅导': 'bg-blue-50 text-blue-700',
  '技术': 'bg-purple-50 text-purple-700', '技术服务': 'bg-purple-50 text-purple-700',
  '生活': 'bg-green-50 text-green-700', '生活服务': 'bg-green-50 text-green-700',
  '文体': 'bg-orange-50 text-orange-700', '文体服务': 'bg-orange-50 text-orange-700',
};

export default function DemandCard({ demand }) {
  const store = useStore();
  const demander = store.getUserById(demand.demander_id);
  if (!demander) return null;

  const meta = getCategoryMeta(demand.service_type);

  return (
    <Link
      to={`/demand/${demand.demand_id}`}
      className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover-card cursor-pointer block"
    >
      {/* Category gradient header */}
      <div className={`relative h-28 bg-gradient-to-br ${meta.gradient} flex items-center justify-center`}>
        <span className="text-5xl drop-shadow-lg">{meta.emoji}</span>
        {demand.urgent_flag === 1 && (
          <span className="absolute top-2 right-2 text-xs bg-red-500 text-white px-2 py-0.5 rounded-full font-bold animate-pulse">
            紧急
          </span>
        )}
        <div className="absolute bottom-0 left-0 right-0 bg-black/20 px-3 py-1.5">
          <span className="text-white text-xs font-medium truncate block">{demand.demand_tag}</span>
        </div>
      </div>
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
