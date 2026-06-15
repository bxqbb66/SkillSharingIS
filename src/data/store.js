import { useState, useEffect, useCallback } from 'react';
import { chatContacts as initContacts, notifications as initNotifs } from './mockData';

let _listeners = [];

let _contacts = initContacts.map(c => ({ ...c }));
let _notifications = initNotifs.map(n => ({ ...n }));
let _evaluations = [
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

function emit() {
  _listeners.forEach(fn => fn());
}

function subscribe(fn) {
  _listeners.push(fn);
  return () => { _listeners = _listeners.filter(f => f !== fn); };
}

export function useStore() {
  const [, setTick] = useState(0);
  useEffect(() => subscribe(() => setTick(t => t + 1)), []);
  return {
    getContacts: () => _contacts,
    getNotifications: () => _notifications,
    getEvaluations: () => _evaluations,
    hasUnread: () => _contacts.some(c => c.unread > 0) || _notifications.some(n => n.unread),
    markContactRead: useCallback((contactId) => {
      const c = _contacts.find(x => x.contact_id === contactId);
      if (c) { c.unread = 0; emit(); }
    }, []),
    markNotifRead: useCallback((notifId) => {
      const n = _notifications.find(x => x.id === notifId);
      if (n) { n.unread = false; emit(); }
    }, []),
    addEvaluation: useCallback((evalData) => {
      const newEval = {
        evaluation_id: 'E' + String(_evaluations.length + 1).padStart(3, '0'),
        ...evalData,
        created_at: new Date().toISOString().slice(0, 16).replace('T', ' '),
      };
      _evaluations.unshift(newEval);
      emit();
    }, []),
    getEvaluationsForUser: useCallback((studentId) => {
      return _evaluations.filter(e => e.evaluated_id === studentId);
    }, []),
    getMyEvals: useCallback((myId) => {
      return {
        byMe: _evaluations.filter(e => e.evaluator_id === myId),
        aboutMe: _evaluations.filter(e => e.evaluated_id === myId),
      };
    }, []),
  };
}
