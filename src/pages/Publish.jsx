import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../data/AuthContext';
import { useStore } from '../data/store';

const categories = ['学业辅导', '技术服务', '生活服务', '文体服务'];

const initSkill = {
  skill_category: '',
  skill_tag: '',
  service_price: '',
  available_time: '',
  skill_description: '',
  qualification_info: '',
};

const initDemand = {
  service_type: '',
  demand_tag: '',
  task_description: '',
  budget_amount: '',
  deadline: '',
  delivery_requirement: '',
  urgent_flag: false,
};

export default function Publish() {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const store = useStore();
  const [tab, setTab] = useState('skill');

  if (!isLoggedIn) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center">
        <div className="text-5xl mb-4">🔒</div>
        <h2 className="text-lg font-bold text-gray-800 mb-2">请先登录</h2>
        <p className="text-sm text-gray-500 mb-6">登录后才能发布技能和需求</p>
        <button
          onClick={() => navigate('/login')}
          className="bg-primary text-white px-8 py-2.5 rounded-full text-sm font-medium hover:bg-primary-light transition-colors"
        >
          去登录
        </button>
      </div>
    );
  }
  const [skill, setSkill] = useState(initSkill);
  const [demand, setDemand] = useState(initDemand);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  function handleSkillChange(field, value) {
    setSkill(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  }

  function handleDemandChange(field, value) {
    setDemand(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  }

  function validateSkill() {
    const errs = {};
    if (!skill.skill_category) errs.skill_category = '请选择技能类别';
    if (!skill.skill_tag.trim()) errs.skill_tag = '请输入技能标签';
    if (!skill.service_price || Number(skill.service_price) <= 0) errs.service_price = '请输入有效价格';
    if (!skill.skill_description.trim()) errs.skill_description = '请输入技能描述';
    return errs;
  }

  function validateDemand() {
    const errs = {};
    if (!demand.service_type) errs.service_type = '请选择服务类型';
    if (!demand.demand_tag.trim()) errs.demand_tag = '请输入需求标签';
    if (!demand.task_description.trim()) errs.task_description = '请输入任务描述';
    if (!demand.budget_amount || Number(demand.budget_amount) <= 0) errs.budget_amount = '请输入有效预算';
    if (!demand.deadline) errs.deadline = '请选择截止时间';
    return errs;
  }

  function handleSubmit() {
    const errs = tab === 'skill' ? validateSkill() : validateDemand();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    if (tab === 'skill') {
      store.addSkill(skill);
    } else {
      store.addDemand(demand);
    }
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setSkill(initSkill);
      setDemand(initDemand);
      setErrors({});
      navigate('/home');
    }, 1500);
  }

  if (submitted) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center mx-4">
          <div className="text-4xl mb-3">✅</div>
          <h2 className="text-lg font-bold text-gray-800 mb-1">发布成功，等待审核</h2>
          <p className="text-sm text-gray-500">即将跳转回首页...</p>
        </div>
      </div>
    );
  }

  const labelClass = 'block text-sm font-medium text-gray-700 mb-1';
  const inputClass = 'w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary';
  const errorClass = 'text-xs text-red-500 mt-1';

  return (
    <div className="min-h-screen flex flex-col">
      {/* 顶部 Tab 切换 */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="flex">
          <button
            onClick={() => { setTab('skill'); setErrors({}); }}
            className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors ${
              tab === 'skill'
                ? 'text-primary border-primary'
                : 'text-gray-500 border-transparent hover:text-gray-700'
            }`}
          >
            发布技能
          </button>
          <button
            onClick={() => { setTab('demand'); setErrors({}); }}
            className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors ${
              tab === 'demand'
                ? 'text-primary border-primary'
                : 'text-gray-500 border-transparent hover:text-gray-700'
            }`}
          >
            发布需求
          </button>
        </div>
      </div>

      {/* 表单区域 */}
      <div className="flex-1 overflow-y-auto px-4 py-4 md:max-w-lg md:mx-auto md:w-full">
        {tab === 'skill' ? (
          <div className="space-y-4">
            {/* 技能类别 */}
            <div>
              <label className={labelClass}>
                技能类别 <span className="text-red-500">*</span>
              </label>
              <select
                value={skill.skill_category}
                onChange={e => handleSkillChange('skill_category', e.target.value)}
                className={inputClass}
              >
                <option value="">请选择类别</option>
                {categories.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              {errors.skill_category && <p className={errorClass}>{errors.skill_category}</p>}
            </div>

            {/* 技能标签 */}
            <div>
              <label className={labelClass}>
                技能标签 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="如：PPT制作、高数辅导"
                value={skill.skill_tag}
                onChange={e => handleSkillChange('skill_tag', e.target.value)}
                className={inputClass}
              />
              {errors.skill_tag && <p className={errorClass}>{errors.skill_tag}</p>}
            </div>

            {/* 服务价格 */}
            <div>
              <label className={labelClass}>
                服务价格 <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  placeholder="输入金额"
                  value={skill.service_price}
                  onChange={e => handleSkillChange('service_price', e.target.value)}
                  className={inputClass}
                  min="0"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">元</span>
              </div>
              {errors.service_price && <p className={errorClass}>{errors.service_price}</p>}
            </div>

            {/* 可服务时间 */}
            <div>
              <label className={labelClass}>可服务时间</label>
              <input
                type="text"
                placeholder="如：周末全天、工作日晚8点后"
                value={skill.available_time}
                onChange={e => handleSkillChange('available_time', e.target.value)}
                className={inputClass}
              />
            </div>

            {/* 技能描述 */}
            <div>
              <label className={labelClass}>
                技能描述 <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={4}
                placeholder="请描述你能提供的服务内容..."
                value={skill.skill_description}
                onChange={e => handleSkillChange('skill_description', e.target.value)}
                className={inputClass}
              />
              {errors.skill_description && <p className={errorClass}>{errors.skill_description}</p>}
            </div>

            {/* 资质信息 */}
            <div>
              <label className={labelClass}>资质信息（选填）</label>
              <input
                type="text"
                placeholder="如：英语六级、计算机二级、相关证书"
                value={skill.qualification_info}
                onChange={e => handleSkillChange('qualification_info', e.target.value)}
                className={inputClass}
              />
            </div>

            {/* 附件上传 */}
            <div>
              <label className={labelClass}>作品/证明</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
                <span className="text-gray-400 text-sm">📎 点击上传作品或证明材料</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {/* 服务类型 */}
            <div>
              <label className={labelClass}>
                服务类型 <span className="text-red-500">*</span>
              </label>
              <select
                value={demand.service_type}
                onChange={e => handleDemandChange('service_type', e.target.value)}
                className={inputClass}
              >
                <option value="">请选择类型</option>
                {categories.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              {errors.service_type && <p className={errorClass}>{errors.service_type}</p>}
            </div>

            {/* 需求标签 */}
            <div>
              <label className={labelClass}>
                需求标签 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="如：求修电脑、求搬家帮忙"
                value={demand.demand_tag}
                onChange={e => handleDemandChange('demand_tag', e.target.value)}
                className={inputClass}
              />
              {errors.demand_tag && <p className={errorClass}>{errors.demand_tag}</p>}
            </div>

            {/* 任务描述 */}
            <div>
              <label className={labelClass}>
                任务描述 <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={4}
                placeholder="请详细描述你的需求..."
                value={demand.task_description}
                onChange={e => handleDemandChange('task_description', e.target.value)}
                className={inputClass}
              />
              {errors.task_description && <p className={errorClass}>{errors.task_description}</p>}
            </div>

            {/* 预算金额 */}
            <div>
              <label className={labelClass}>
                预算金额 <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  placeholder="输入预算"
                  value={demand.budget_amount}
                  onChange={e => handleDemandChange('budget_amount', e.target.value)}
                  className={inputClass}
                  min="0"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">元</span>
              </div>
              {errors.budget_amount && <p className={errorClass}>{errors.budget_amount}</p>}
            </div>

            {/* 截止时间 */}
            <div>
              <label className={labelClass}>
                截止时间 <span className="text-red-500">*</span>
              </label>
              <input
                type="datetime-local"
                value={demand.deadline}
                onChange={e => handleDemandChange('deadline', e.target.value)}
                className={inputClass}
              />
              {errors.deadline && <p className={errorClass}>{errors.deadline}</p>}
            </div>

            {/* 交付要求 */}
            <div>
              <label className={labelClass}>交付要求（选填）</label>
              <textarea
                rows={3}
                placeholder="请说明对交付成果的具体要求..."
                value={demand.delivery_requirement}
                onChange={e => handleDemandChange('delivery_requirement', e.target.value)}
                className={inputClass}
              />
            </div>

            {/* 紧急标记 */}
            <div className="flex items-center justify-between bg-orange-50 rounded-lg px-4 py-3">
              <div>
                <span className="text-sm font-medium text-gray-700">紧急标记</span>
                <p className="text-xs text-gray-500 mt-0.5">标记为紧急需求将优先展示</p>
              </div>
              <button
                type="button"
                onClick={() => handleDemandChange('urgent_flag', !demand.urgent_flag)}
                className={`relative w-11 h-6 rounded-full transition-colors ${
                  demand.urgent_flag ? 'bg-red-500' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                    demand.urgent_flag ? 'translate-x-5' : ''
                  }`}
                />
              </button>
            </div>
          </div>
        )}

        {/* 提交按钮 - 桌面端在表单内 */}
        <div className="mt-6 mb-4 md:block">
          <button
            onClick={handleSubmit}
            className="w-full bg-primary text-white font-medium py-3 rounded-xl text-sm hover:bg-primary-light transition-colors"
          >
            提交发布
          </button>
        </div>
      </div>

      {/* 提交按钮 - 手机端固定在底部 */}
      <div className="md:hidden bg-white border-t border-gray-200 px-4 py-3">
        <button
          onClick={handleSubmit}
          className="w-full bg-primary text-white font-medium py-3 rounded-xl text-sm hover:bg-primary-light transition-colors"
        >
          提交发布
        </button>
      </div>
    </div>
  );
}
