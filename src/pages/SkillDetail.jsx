import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getSkillById, getUserById } from '../data/mockData';

const categoryColors = {
  '学业': 'bg-blue-50 text-blue-700',
  '技术': 'bg-purple-50 text-purple-700',
  '生活': 'bg-green-50 text-green-700',
  '文体': 'bg-orange-50 text-orange-700',
};

export default function SkillDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const skill = getSkillById(id);
  if (!skill) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-400">
        技能不存在或已下架
      </div>
    );
  }

  const provider = getUserById(skill.provider_id);

  function handleConfirm() {
    setShowConfirm(false);
    setConfirmed(true);
    setTimeout(() => {
      navigate('/orders');
    }, 1200);
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
        {/* 顶部标签区 */}
        <div className="bg-white px-4 py-4 md:rounded-xl md:shadow-sm">
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

        {/* 可服务时间 */}
        <div className="bg-white mt-2 px-4 py-4 md:rounded-xl md:shadow-sm md:mt-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">可服务时间</h3>
          <p className="text-sm text-gray-600">{skill.available_time || '未设置'}</p>
        </div>

        {/* 技能描述 */}
        <div className="bg-white mt-2 px-4 py-4 md:rounded-xl md:shadow-sm md:mt-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">技能描述</h3>
          <p className="text-sm text-gray-600 leading-relaxed">{skill.skill_description}</p>
        </div>

        {/* 资质信息 */}
        {skill.qualification_info && (
          <div className="bg-white mt-2 px-4 py-4 md:rounded-xl md:shadow-sm md:mt-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">资质信息</h3>
            <p className="text-sm text-gray-600">{skill.qualification_info}</p>
          </div>
        )}

        {/* 作品展示 */}
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
      </div>

      {/* 右侧：发布者信息 + 操作（桌面端） */}
      <div className="hidden md:block md:w-1/3">
        <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center text-xl font-bold">
              {provider?.name?.[0]}
            </div>
            <div>
              <div className="font-semibold text-gray-800">{provider?.name}</div>
              <div className="text-xs text-gray-500 mt-0.5">{provider?.college}</div>
              <div className="flex items-center gap-1 mt-1">
                <span className="text-xs text-yellow-500">★ {provider?.credit_level}</span>
                <span className="text-xs text-gray-400 ml-1">信用 {provider?.credit_score}分</span>
              </div>
            </div>
          </div>
          <button
            onClick={() => setShowConfirm(true)}
            className="w-full bg-primary text-white font-medium py-3 rounded-xl text-sm hover:bg-blue-700 transition-colors"
          >
            立即预约
          </button>
        </div>
      </div>

      {/* 手机端底部悬浮操作栏 */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 z-10 flex items-center gap-3">
        <div className="flex items-center gap-2 flex-1">
          <div className="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold shrink-0">
            {provider?.name?.[0]}
          </div>
          <div>
            <div className="text-sm font-semibold text-gray-800">{provider?.name}</div>
            <div className="text-xs text-yellow-500">★ {provider?.credit_level}</div>
          </div>
        </div>
        <button
          onClick={() => setShowConfirm(true)}
          className="bg-primary text-white font-medium px-8 py-2.5 rounded-full text-sm hover:bg-blue-700 transition-colors"
        >
          立即预约
        </button>
      </div>

      {/* 确认弹窗 */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-6">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm">
            <h3 className="text-lg font-bold text-gray-800 mb-2">确认预约</h3>
            <p className="text-sm text-gray-500 mb-6">确认要预约此项技能服务吗？确认后将生成工单。</p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 py-2.5 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                取消
              </button>
              <button
                onClick={handleConfirm}
                className="flex-1 py-2.5 text-sm font-medium text-white bg-primary rounded-lg hover:bg-blue-700 transition-colors"
              >
                确认预约
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 手机端底部占位 */}
      <div className="md:hidden h-16" />
    </div>
  );
}
