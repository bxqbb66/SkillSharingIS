import { useState, useEffect, useCallback } from 'react';
import {
  chatContacts as initContacts,
  notifications as initNotifs,
  orders as initOrders,
  skills as initSkills,
  demands as initDemands,
  users as initUsers,
} from './mockData';

const STORAGE_KEY = 'jlu-skill-share-state';
const USER_ID_KEY = 'jlu-skill-share-current-user-id';

// ----- Helpers -----
function clone(data) {
  return JSON.parse(JSON.stringify(data));
}
function nowText() {
  const d = new Date();
  const pad = (v) => String(v).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}
function makeId(prefix) {
  return `${prefix}_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
}
function readStoredState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    localStorage.removeItem(STORAGE_KEY);
    return null;
  }
}
function normalizeOrder(order) {
  return {
    progressLog: [],
    statusChanges: [],
    delivery: null,
    acceptance: null,
    transactionStatus: order.order_status === '已完成' ? '已转账' : '未冻结',
    evaluationStatus: order.order_status === '已完成' ? '待评价' : '未评价',
    appealStatus: '无申诉',
    arbitrationFlag: '无仲裁',
    ...order,
  };
}

// ----- Module-level state -----
let _listeners = [];
const stored = readStoredState();

function validArray(arr) { return Array.isArray(arr) && arr.length > 0; }
let _contacts = validArray(stored?.contacts) ? stored.contacts : initContacts.map(c => ({ ...c }));
let _notifications = validArray(stored?.notifications) ? stored.notifications : initNotifs.map(n => ({ ...n }));
let _orders = validArray(stored?.orders) ? stored.orders : initOrders.map(o => normalizeOrder(o));
let _skills = validArray(stored?.skills) ? stored.skills : initSkills.map(s => ({ ...s }));
let _demands = validArray(stored?.demands) ? stored.demands : initDemands.map(d => ({ ...d }));
let _users = validArray(stored?.users) ? stored.users : initUsers.map(u => ({ ...u }));
let _evaluations = stored?.evaluations || [
  { evaluation_id: 'E001', order_id: 'O003', evaluator_id: '20210104', evaluated_id: '20210001', star_score: 5, evaluation_text: '需求方很配合，验收很快！', created_at: '2026-06-14 14:00' },
  { evaluation_id: 'E002', order_id: 'O003', evaluator_id: '20210001', evaluated_id: '20210104', star_score: 4, evaluation_text: 'PPT做得很专业，略有延迟但质量很高', created_at: '2026-06-14 14:10' },
  { evaluation_id: 'E003', order_id: '', evaluator_id: '20210101', evaluated_id: '20210103', star_score: 5, evaluation_text: '张明讲的Python很清晰，帮我顺利过了考试', created_at: '2026-05-20' },
  { evaluation_id: 'E004', order_id: '', evaluator_id: '20210106', evaluated_id: '20210108', star_score: 5, evaluation_text: '网站开发水平很高，项目做得很好', created_at: '2026-05-15' },
  { evaluation_id: 'E005', order_id: '', evaluator_id: '20210103', evaluated_id: '20210101', star_score: 5, evaluation_text: '非常耐心，代码讲解得很透彻', created_at: '2026-05-22' },
  { evaluation_id: 'E006', order_id: '', evaluator_id: '20210105', evaluated_id: '20210101', star_score: 4, evaluation_text: 'Python辅导很专业，推荐', created_at: '2026-05-25' },
  { evaluation_id: 'E007', order_id: '', evaluator_id: '20210101', evaluated_id: '20210102', star_score: 5, evaluation_text: '英语口语很流利，帮了我很多', created_at: '2026-05-18' },
  { evaluation_id: 'E008', order_id: '', evaluator_id: '20210107', evaluated_id: '20210102', star_score: 5, evaluation_text: '发音纠正很有效，四六级辅导到位', created_at: '2026-05-28' },
  { evaluation_id: 'E009', order_id: '', evaluator_id: '20210102', evaluated_id: '20210105', star_score: 3, evaluation_text: '篮球陪练还行，但有时候迟到', created_at: '2026-06-02' },
  { evaluation_id: 'E010', order_id: '', evaluator_id: '20210108', evaluated_id: '20210105', star_score: 4, evaluation_text: '很认真负责的陪练', created_at: '2026-06-05' },
  { evaluation_id: 'E011', order_id: '', evaluator_id: '20210104', evaluated_id: '20210108', star_score: 5, evaluation_text: 'React教得很好，入门快', created_at: '2026-05-30' },
  { evaluation_id: 'E012', order_id: '', evaluator_id: '20210101', evaluated_id: '20210106', star_score: 5, evaluation_text: '经济学讲解很清晰，期末顺利通过', created_at: '2026-06-03' },
];
let _transactions = stored?.transactions || [];
let _appeals = stored?.appeals || [];
let _creditLogs = stored?.creditLogs || [];
let _account = stored?.account || { balance: 120.50, points_balance: 300, frozen_amount: 0 };

// Apply override for user 20210001
(function() {
  const u = _users.find(u => u.student_id === '20210001');
  if (u) u.name = '鲜花饼';
})();

// ----- Pub/Sub -----
function persist() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      contacts: _contacts, notifications: _notifications, orders: _orders,
      skills: _skills, demands: _demands, users: _users, evaluations: _evaluations,
      transactions: _transactions, appeals: _appeals, creditLogs: _creditLogs, account: _account,
    }));
  } catch(e) { /* quota exceeded, ignore */ }
}
function emit() { _listeners.forEach(fn => fn()); }
function subscribe(fn) { _listeners.push(fn); return () => { _listeners = _listeners.filter(f => f !== fn); }; }

// ----- Notification helper -----
function addNotice(text, relatedOrderId = '', type = '系统通知') {
  _notifications.unshift({
    id: makeId('notif'), type, text, relatedOrderId, unread: true, time: nowText(),
  });
}

// ----- Auth helpers (module-level) -----
function getCurrentUserId() {
  return localStorage.getItem(USER_ID_KEY) || initUsers[0]?.student_id || '20210001';
}
function setCurrentUserId(id) { localStorage.setItem(USER_ID_KEY, id); }
export { getCurrentUserId, setCurrentUserId };
export function findUserById(studentId) { return _users.find(u => u.student_id === studentId); }
export function createUser(studentId, name) {
  const newUser = {
    student_id: studentId, name: name || `用户${studentId.slice(-4)}`, college: '吉林大学',
    phone: '', real_name_status: 1, credit_score: 650, credit_level: 'C',
    balance: 100, points_balance: 0, frozen_amount: 0,
  };
  _users.push(newUser); persist(); return newUser;
}

// ====================== PUBLIC HOOK ======================
export function useStore() {
  const [, setTick] = useState(0);
  useEffect(() => subscribe(() => setTick(t => t + 1)), []);

  return {
    getContacts: () => _contacts,
    getNotifications: () => _notifications,
    getOrders: () => _orders,
    getSkills: () => _skills,
    getDemands: () => _demands,
    getUsers: () => _users,
    getEvaluations: () => _evaluations,
    getTransactions: () => _transactions,
    getAppeals: () => _appeals,
    getCreditLogs: () => _creditLogs,
    getAccount: () => _account,
    getSkillById: (id) => _skills.find(s => s.skill_id === id),
    getDemandById: (id) => _demands.find(d => d.demand_id === id),
    getUserById: (id) => _users.find(u => u.student_id === id),
    getOrderById: (id) => _orders.find(o => o.order_id === id),
    getCurrentUserId: () => getCurrentUserId(),
    hasUnread: () => _contacts.some(c => c.unread > 0) || _notifications.some(n => n.unread),

    markContactRead: useCallback((contactId) => {
      const c = _contacts.find(x => x.contact_id === contactId);
      if (c) { c.unread = 0; persist(); emit(); }
    }, []),
    markNotifRead: useCallback((notifId) => {
      const n = _notifications.find(x => x.id === notifId);
      if (n) { n.unread = false; persist(); emit(); }
    }, []),

    // --- Evaluations ---
    addEvaluation: useCallback((evalData) => {
      const exists = _evaluations.some(e => e.order_id === evalData.order_id && e.evaluator_id === evalData.evaluator_id);
      if (exists) return null;
      const newEval = { evaluation_id: makeId('eval'), ...evalData, created_at: nowText() };
      _evaluations.unshift(newEval);
      const user = _users.find(u => u.student_id === newEval.evaluated_id);
      if (user) {
        const sc = newEval.star_score >= 4 ? 3 : -3;
        user.credit_score = Math.min(1000, Math.max(0, (user.credit_score || 650) + sc));
        user.credit_level = user.credit_score >= 850 ? 'A' : user.credit_score >= 750 ? 'B' : user.credit_score >= 650 ? 'C' : 'D';
      }
      const order = _orders.find(o => o.order_id === evalData.order_id);
      if (order) {
        const count = _evaluations.filter(e => e.order_id === evalData.order_id).length;
        order.evaluationStatus = count >= 2 ? '已互评' : '部分评价';
      }
      addNotice(`评价已提交：工单 ${evalData.order_id} 新增一条评价。`, evalData.order_id, '评价通知');
      persist(); emit(); return newEval;
    }, []),
    getEvaluationsForUser: useCallback((sid) => _evaluations.filter(e => e.evaluated_id === sid), []),
    getMyEvals: useCallback((myId) => ({
      byMe: _evaluations.filter(e => e.evaluator_id === myId),
      aboutMe: _evaluations.filter(e => e.evaluated_id === myId),
    }), []),

    // --- Order lifecycle ---
    createOrderFromSkill: useCallback((skillId) => {
      const skill = _skills.find(s => s.skill_id === skillId);
      if (!skill) return null;
      const oid = makeId('order');
      const order = normalizeOrder({
        order_id: oid, skill_id: skill.skill_id, demand_id: '',
        demander_id: getCurrentUserId(), provider_id: skill.provider_id,
        task_description: skill.skill_tag, delivery_requirement: skill.skill_description,
        reward_amount: Number(skill.service_price), agreed_delivery_time: skill.available_time || '协商确定',
        actual_delivery_time: '', order_status: '待确认', created_at: nowText(),
      });
      order.progressLog = [{ time: nowText(), title: '下单', desc: '需求方已发起下单，等待双方确认。' }];
      _orders.unshift(order);
      addNotice(`新工单已生成：${order.task_description}，等待双方确认。`, order.order_id, '工单通知');
      persist(); emit(); return order;
    }, []),
    createOrderFromDemand: useCallback((demandId) => {
      const demand = _demands.find(d => d.demand_id === demandId);
      if (!demand) return null;
      const oid = makeId('order');
      const order = normalizeOrder({
        order_id: oid, skill_id: '', demand_id: demand.demand_id,
        demander_id: demand.demander_id, provider_id: getCurrentUserId(),
        task_description: demand.demand_tag, delivery_requirement: demand.delivery_requirement || '',
        reward_amount: Number(demand.budget_amount), agreed_delivery_time: demand.deadline || '协商确定',
        actual_delivery_time: '', order_status: '待确认', created_at: nowText(),
      });
      order.progressLog = [{ time: nowText(), title: '接单', desc: '服务方已申请接单，等待双方确认。' }];
      _orders.unshift(order);
      addNotice(`新工单已生成：${order.task_description}，等待双方确认。`, order.order_id, '工单通知');
      persist(); emit(); return order;
    }, []),
    confirmOrder: useCallback((orderId) => {
      const order = _orders.find(o => o.order_id === orderId);
      if (!order) return null;
      order.order_status = '进行中';
      order.progressLog = order.progressLog || [];
      order.progressLog.push({ time: nowText(), title: '确认', desc: '双方已确认工单，任务进入执行阶段。' });
      const already = _transactions.some(t => t.order_id === orderId && t.transaction_type === '冻结');
      if (!already) {
        const amt = Math.max(0, Number(order.reward_amount || 0));
        _account.balance = Math.max(0, Number(_account.balance || 0) - amt);
        _account.frozen_amount = Math.max(0, Number(_account.frozen_amount || 0) + amt);
        _transactions.unshift({ transaction_id: makeId('txn'), order_id: orderId, payer_id: order.demander_id, payee_id: order.provider_id, amount: amt, transaction_type: '冻结', transaction_status: '已冻结', created_at: nowText() });
      }
      order.transactionStatus = '已冻结';
      addNotice(`工单已确认：${order.task_description} 已进入进行中。`, orderId, '工单通知');
      persist(); emit(); return order;
    }, []),
    submitDelivery: useCallback((orderId, desc) => {
      const order = _orders.find(o => o.order_id === orderId);
      if (!order) return null;
      order.delivery = { description: desc, submitTime: nowText() };
      order.order_status = '待验收';
      order.progressLog = order.progressLog || [];
      order.progressLog.push({ time: nowText(), title: '提交成果', desc: `服务方已提交成果：${desc}` });
      addNotice(`成果待验收：${order.task_description} 已提交成果，请及时验收。`, orderId, '验收提醒');
      persist(); emit(); return order;
    }, []),
    acceptDelivery: useCallback((orderId) => {
      const order = _orders.find(o => o.order_id === orderId);
      if (!order) return null;
      order.order_status = '已完成';
      order.acceptance = { result: '通过', reason: '需求方确认成果符合约定', time: nowText() };
      order.transactionStatus = '已转账';
      order.evaluationStatus = '待评价';
      order.progressLog = order.progressLog || [];
      order.progressLog.push({ time: nowText(), title: '验收通过', desc: '需求方验收通过，系统模拟完成结算。' });
      const amt = Math.min(Math.max(0, Number(order.reward_amount || 0)), Number(_account.frozen_amount || 0));
      _account.frozen_amount = Math.max(0, Number(_account.frozen_amount || 0) - amt);
      _transactions.unshift({ transaction_id: makeId('txn'), order_id: orderId, payer_id: order.demander_id, payee_id: order.provider_id, amount: amt, transaction_type: '转账', transaction_status: '已完成', created_at: nowText() });
      addNotice(`结算已完成：${order.task_description} 已验收通过并完成结算。`, orderId, '结算通知');
      persist(); emit(); return order;
    }, []),
    createAppeal: useCallback((orderId, appealType, desc) => {
      const order = _orders.find(o => o.order_id === orderId);
      if (!order) return null;
      order.order_status = '申诉中';
      order.appealStatus = '待处理';
      order.arbitrationFlag = '仲裁中';
      order.progressLog = order.progressLog || [];
      order.progressLog.push({ time: nowText(), title: '发起申诉', desc: `用户发起申诉：${appealType}` });
      const aid = makeId('appeal');
      _appeals.unshift({ appeal_id: aid, order_id: orderId, appellant_id: getCurrentUserId(), appeal_type: appealType, appeal_description: desc, process_status: '待处理', arbitration_result: '', created_at: nowText() });
      addNotice(`申诉已提交：${order.task_description} 已进入申诉中。`, orderId, '申诉通知');
      persist(); emit(); return { appeal_id: aid };
    }, []),

    // --- Admin functions ---
    auditPost: useCallback((type, id, decision, opinion = '') => {
      const list = type === 'skill' ? _skills : _demands;
      const item = list.find(i => (i.skill_id || i.demand_id) === id);
      if (!item) return null;
      item.audit_status = decision === '通过' ? 1 : 2;
      if (type === 'skill') item.skill_status = decision === '通过' ? 0 : 3;
      else item.demand_status = decision === '通过' ? 0 : 3;
      addNotice(`内容审核更新：${item.skill_tag || item.demand_tag} 审核${decision}。${opinion || ''}`, '', '审核通知');
      persist(); emit(); return item;
    }, []),
    adjustUserCredit: useCallback((userId, scoreChange, reason) => {
      const user = _users.find(u => u.student_id === userId);
      if (!user) return null;
      const change = Number(scoreChange || 0);
      user.credit_score = Math.min(1000, Math.max(0, (user.credit_score || 0) + change));
      user.credit_level = user.credit_score >= 850 ? 'A' : user.credit_score >= 750 ? 'B' : user.credit_score >= 650 ? 'C' : 'D';
      _creditLogs.unshift({ id: makeId('credit'), user_id: userId, score_change: change, reason, created_at: nowText() });
      persist(); emit(); return user;
    }, []),
    markOrderAbnormal: useCallback((orderId, reason = '管理员标记异常') => {
      const order = _orders.find(o => o.order_id === orderId);
      if (!order) return null;
      order.arbitrationFlag = '异常待核查';
      order.abnormalReason = reason;
      addNotice(`工单异常提醒：${order.task_description} 已被管理员标记为异常。`, orderId, '工单通知');
      persist(); emit(); return order;
    }, []),
    arbitrateAppeal: useCallback((appealId, decision) => {
      const appeal = _appeals.find(a => a.appeal_id === appealId);
      if (!appeal || appeal.process_status === '已裁决') return null;
      const order = _orders.find(o => o.order_id === appeal.order_id);
      if (!order) return null;
      const refundRatio = Math.min(100, Math.max(0, Number(decision.refundRatio || 0)));
      const refundAmt = Math.round(Number(order.reward_amount || 0) * (refundRatio / 100));
      if (refundAmt > 0) {
        _account.frozen_amount = Math.max(0, Number(_account.frozen_amount || 0) - refundAmt);
        _account.balance = Math.max(0, Number(_account.balance || 0) + refundAmt);
        _transactions.unshift({ transaction_id: makeId('txn'), order_id: appeal.order_id, payer_id: order.provider_id, payee_id: order.demander_id, amount: refundAmt, transaction_type: '退款', transaction_status: '已退款', created_at: nowText() });
      }
      if (decision.providerCreditChange) {
        const pu = _users.find(u => u.student_id === order.provider_id);
        if (pu) { pu.credit_score = Math.min(1000, Math.max(0, (pu.credit_score || 650) + Number(decision.providerCreditChange))); pu.credit_level = pu.credit_score >= 850 ? 'A' : pu.credit_score >= 750 ? 'B' : pu.credit_score >= 650 ? 'C' : 'D'; }
      }
      if (decision.demanderCreditChange) {
        const du = _users.find(u => u.student_id === order.demander_id);
        if (du) { du.credit_score = Math.min(1000, Math.max(0, (du.credit_score || 650) + Number(decision.demanderCreditChange))); du.credit_level = du.credit_score >= 850 ? 'A' : du.credit_score >= 750 ? 'B' : du.credit_score >= 650 ? 'C' : 'D'; }
      }
      appeal.process_status = '已裁决';
      appeal.arbitration_result = decision.description;
      appeal.handler = decision.handler || '平台管理员';
      order.order_status = decision.finalStatus || '已关闭';
      order.appealStatus = '已裁决';
      order.arbitrationFlag = '已裁决';
      order.transactionStatus = refundAmt > 0 ? '已退款' : order.transactionStatus;
      order.progressLog = order.progressLog || [];
      order.progressLog.push({ time: nowText(), title: '申诉裁决', desc: `管理员裁决：${decision.description}` });
      addNotice(`申诉裁决结果：${order.task_description} — ${decision.description}`, order.order_id, '申诉通知');
      persist(); emit(); return { appeal, order };
    }, []),

    // --- Publish ---
    addSkill: useCallback((form) => {
      const skill = {
        skill_id: makeId('skill'), provider_id: getCurrentUserId(),
        skill_tag: form.skill_tag, skill_category: form.skill_category,
        service_price: Number(form.service_price), available_time: form.available_time || '',
        skill_description: form.skill_description || '', qualification_info: form.qualification_info || '',
        audit_status: 0, skill_status: 0, created_at: nowText(),
      };
      _skills.unshift(skill);
      addNotice(`技能发布成功：${form.skill_tag}，请等待管理员审核。`, skill.skill_id, '审核通知');
      persist(); emit(); return skill;
    }, []),
    addDemand: useCallback((form) => {
      const demand = {
        demand_id: makeId('demand'), demander_id: getCurrentUserId(),
        demand_tag: form.demand_tag, service_type: form.service_type,
        task_description: form.task_description || '', budget_amount: Number(form.budget_amount),
        deadline: form.deadline || '', delivery_requirement: form.delivery_requirement || '',
        urgent_flag: form.urgent_flag ? 1 : 0, audit_status: 0, demand_status: 0, created_at: nowText(),
      };
      _demands.unshift(demand);
      addNotice(`需求发布成功：${form.demand_tag}，请等待管理员审核。`, demand.demand_id, '审核通知');
      persist(); emit(); return demand;
    }, []),

    sendMessage: useCallback((contactId, text) => {
      const contact = _contacts.find(c => c.contact_id === contactId);
      if (contact) { contact.last_message = text; contact.last_time = '刚刚'; }
      addNotice(`新消息：${text}`, '', '聊天消息');
      persist(); emit();
    }, []),
  };
}

// ====================== ADMIN STORE ======================
const ADMIN_KEY = 'jlu-skill-share-admin';
let _adminListeners = [];
let _currentAdmin = (() => {
  try { const raw = localStorage.getItem(ADMIN_KEY); return raw ? JSON.parse(raw) : null; }
  catch { return null; }
})();

export function useAdminStore() {
  const [, setTick] = useState(0);
  useEffect(() => {
    const fn = () => setTick(t => t + 1);
    _adminListeners.push(fn);
    return () => { _adminListeners = _adminListeners.filter(f => f !== fn); };
  }, []);

  const adminLogin = useCallback((account, password) => {
    if (account === 'admin' && password === 'admin123') {
      _currentAdmin = { account, name: '勤工助学中心管理员' };
      localStorage.setItem(ADMIN_KEY, JSON.stringify(_currentAdmin));
      _adminListeners.forEach(fn => fn());
      return true;
    }
    return false;
  }, []);

  const adminLogout = useCallback(() => {
    _currentAdmin = null;
    localStorage.removeItem(ADMIN_KEY);
    _adminListeners.forEach(fn => fn());
  }, []);

  return {
    admin: _currentAdmin,
    isAdminLoggedIn: !!_currentAdmin,
    adminLogin,
    adminLogout,
  };
}
