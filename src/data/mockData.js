export const users = [
  { student_id: '20210101', name: '张明', college: '计算机科学与技术学院', phone: '13800001001', real_name_status: 1, credit_score: 98, credit_level: 'A', balance: 500.00, points_balance: 120, frozen_amount: 0 },
  { student_id: '20210102', name: '李婷', college: '外国语学院', phone: '13800001002', real_name_status: 1, credit_score: 95, credit_level: 'A', balance: 320.50, points_balance: 80, frozen_amount: 0 },
  { student_id: '20210103', name: '王浩', college: '数学学院', phone: '13800001003', real_name_status: 1, credit_score: 88, credit_level: 'B', balance: 200.00, points_balance: 45, frozen_amount: 0 },
  { student_id: '20210104', name: '赵雪', college: '艺术学院', phone: '13800001004', real_name_status: 1, credit_score: 92, credit_level: 'A', balance: 150.00, points_balance: 60, frozen_amount: 0 },
  { student_id: '20210105', name: '陈强', college: '体育学院', phone: '13800001005', real_name_status: 1, credit_score: 85, credit_level: 'B', balance: 80.00, points_balance: 30, frozen_amount: 0 },
  { student_id: '20210106', name: '刘洋', college: '经济学院', phone: '13800001006', real_name_status: 1, credit_score: 90, credit_level: 'A', balance: 600.00, points_balance: 150, frozen_amount: 0 },
  { student_id: '20210107', name: '孙悦', college: '文学院', phone: '13800001007', real_name_status: 1, credit_score: 87, credit_level: 'B', balance: 250.00, points_balance: 55, frozen_amount: 0 },
  { student_id: '20210108', name: '周杰', college: '软件学院', phone: '13800001008', real_name_status: 1, credit_score: 96, credit_level: 'A', balance: 420.00, points_balance: 90, frozen_amount: 0 },
];

export const skills = [
  { skill_id: 'S001', provider_id: '20210101', skill_tag: 'Python编程', skill_category: '技术', service_price: 50, available_time: '周一至周五 18:00-21:00', skill_description: 'Python基础教学，包括数据结构、算法入门，适合大一、大二同学', audit_status: 1, skill_status: 0 },
  { skill_id: 'S002', provider_id: '20210102', skill_tag: '英语口语', skill_category: '学业', service_price: 40, available_time: '周末全天', skill_description: '英语口语陪练，四六级备考辅导，发音纠正', audit_status: 1, skill_status: 0 },
  { skill_id: 'S003', provider_id: '20210103', skill_tag: '高数辅导', skill_category: '学业', service_price: 45, available_time: '周三、周五下午', skill_description: '高等数学、线性代数、概率论辅导，帮你攻克数学难关', audit_status: 1, skill_status: 0 },
  { skill_id: 'S004', provider_id: '20210104', skill_tag: 'PPT设计', skill_category: '技术', service_price: 60, available_time: '课余时间均可', skill_description: '精美PPT制作与美化，包括学术汇报、竞赛路演、答辩等', audit_status: 1, skill_status: 1 },
  { skill_id: 'S005', provider_id: '20210105', skill_tag: '篮球陪练', skill_category: '文体', service_price: 30, available_time: '每天下午 16:00-18:00', skill_description: '篮球基础教学及陪练，可组队训练，帮助提高球技', audit_status: 1, skill_status: 0 },
  { skill_id: 'S006', provider_id: '20210106', skill_tag: '经济学辅导', skill_category: '学业', service_price: 55, available_time: '周一至周四 19:00-21:00', skill_description: '微观经济学、宏观经济学课程辅导，作业讲解及考试复习', audit_status: 1, skill_status: 0 },
  { skill_id: 'S007', provider_id: '20210107', skill_tag: '文案写作', skill_category: '生活', service_price: 35, available_time: '弹性时间', skill_description: '各类文案撰写：活动策划、宣传文案、个人简历润色', audit_status: 1, skill_status: 0 },
  { skill_id: 'S008', provider_id: '20210108', skill_tag: '网站开发', skill_category: '技术', service_price: 80, available_time: '周末及课余', skill_description: '前端开发教学，HTML/CSS/JavaScript/React入门到实战', audit_status: 1, skill_status: 0 },
];

export const demands = [
  { demand_id: 'D001', demander_id: '20210103', demand_tag: 'Python作业辅导', service_type: '学业', task_description: '急需一位Python高手帮我完成数据结构大作业，要求本周内完成', budget_amount: 60, deadline: '2026-06-20', urgent_flag: 1, audit_status: 1, demand_status: 0 },
  { demand_id: 'D002', demander_id: '20210104', demand_tag: '网页制作', service_type: '技术', task_description: '需要帮我做一个个人作品集网站，大概5个页面，响应式设计', budget_amount: 120, deadline: '2026-06-30', urgent_flag: 0, audit_status: 1, demand_status: 0 },
  { demand_id: 'D003', demander_id: '20210101', demand_tag: '英语四级辅导', service_type: '学业', task_description: '四级备考冲刺，主要想提高阅读和写作部分，每周2次', budget_amount: 50, deadline: '2026-07-05', urgent_flag: 0, audit_status: 1, demand_status: 0 },
  { demand_id: 'D004', demander_id: '20210107', demand_tag: '吉他教学', service_type: '文体', task_description: '零基础想学吉他，希望有耐心的同学教我入门，每周1-2次', budget_amount: 40, deadline: '2026-07-15', urgent_flag: 0, audit_status: 1, demand_status: 0 },
  { demand_id: 'D005', demander_id: '20210105', demand_tag: '搬宿舍帮忙', service_type: '生活', task_description: '下周搬宿舍，需要1-2位同学帮忙搬运行李，大概2小时', budget_amount: 25, deadline: '2026-06-18', urgent_flag: 1, audit_status: 1, demand_status: 0 },
  { demand_id: 'D006', demander_id: '20210102', demand_tag: '考研数学答疑', service_type: '学业', task_description: '考研数学一复习中，需要答疑和解题技巧指导，每周1次', budget_amount: 70, deadline: '2026-07-20', urgent_flag: 0, audit_status: 1, demand_status: 1 },
];

export function getUserById(studentId) {
  return users.find(u => u.student_id === studentId) || null;
}
