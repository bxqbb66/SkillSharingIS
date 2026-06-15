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

// 当前登录用户
export const currentUser = {
  student_id: '20210001',
  name: '林小吉',
  college: '计算机科学与技术学院',
  phone: '13800000001',
  real_name_status: 1,
  credit_score: 650,
  credit_level: 'A',
  balance: 120.50,
  points_balance: 300,
  frozen_amount: 30.00,
};

export const skills = [
  { skill_id: 'S001', provider_id: '20210101', skill_tag: 'Python编程', skill_category: '技术', service_price: 50, available_time: '周一至周五 18:00-21:00', skill_description: 'Python基础教学，包括数据结构、算法入门，适合大一、大二同学', qualification_info: '计算机竞赛省级一等奖, ACM校队成员', audit_status: 1, skill_status: 0 },
  { skill_id: 'S002', provider_id: '20210102', skill_tag: '英语口语', skill_category: '学业', service_price: 40, available_time: '周末全天', skill_description: '英语口语陪练，四六级备考辅导，发音纠正', qualification_info: '英语六级620分, 英语演讲比赛冠军', audit_status: 1, skill_status: 0 },
  { skill_id: 'S003', provider_id: '20210103', skill_tag: '高数辅导', skill_category: '学业', service_price: 45, available_time: '周三、周五下午', skill_description: '高等数学、线性代数、概率论辅导，帮你攻克数学难关', qualification_info: '数学竞赛全国二等奖, 数院绩点前5%', audit_status: 1, skill_status: 0 },
  { skill_id: 'S004', provider_id: '20210104', skill_tag: 'PPT设计', skill_category: '技术', service_price: 60, available_time: '课余时间均可', skill_description: '精美PPT制作与美化，包括学术汇报、竞赛路演、答辩等', qualification_info: '校学生会宣传部部长, 多次校级活动设计经验', audit_status: 1, skill_status: 1 },
  { skill_id: 'S005', provider_id: '20210105', skill_tag: '篮球陪练', skill_category: '文体', service_price: 30, available_time: '每天下午 16:00-18:00', skill_description: '篮球基础教学及陪练，可组队训练，帮助提高球技', qualification_info: '校篮球队成员, 篮球二级裁判', audit_status: 1, skill_status: 0 },
  { skill_id: 'S006', provider_id: '20210106', skill_tag: '经济学辅导', skill_category: '学业', service_price: 55, available_time: '周一至周四 19:00-21:00', skill_description: '微观经济学、宏观经济学课程辅导，作业讲解及考试复习', qualification_info: '经济学院绩点第一, 发表核心期刊论文一篇', audit_status: 1, skill_status: 0 },
  { skill_id: 'S007', provider_id: '20210107', skill_tag: '文案写作', skill_category: '生活', service_price: 35, available_time: '弹性时间', skill_description: '各类文案撰写：活动策划、宣传文案、个人简历润色', qualification_info: '校园文学社主编, 多次发表校园公众号推文', audit_status: 1, skill_status: 0 },
  { skill_id: 'S008', provider_id: '20210108', skill_tag: '网站开发', skill_category: '技术', service_price: 80, available_time: '周末及课余', skill_description: '前端开发教学，HTML/CSS/JavaScript/React入门到实战', qualification_info: '软件学院优秀学生, 参与过3个校级信息系统开发', audit_status: 1, skill_status: 0 },
];

export const demands = [
  { demand_id: 'D001', demander_id: '20210103', demand_tag: 'Python作业辅导', service_type: '学业', task_description: '急需一位Python高手帮我完成数据结构大作业，要求本周内完成', budget_amount: 60, deadline: '2026-06-20', delivery_requirement: '需要完整的Python代码和说明文档，代码注释清晰', urgent_flag: 1, audit_status: 1, demand_status: 0 },
  { demand_id: 'D002', demander_id: '20210104', demand_tag: '网页制作', service_type: '技术', task_description: '需要帮我做一个个人作品集网站，大概5个页面，响应式设计', budget_amount: 120, deadline: '2026-06-30', delivery_requirement: '支持手机和电脑访问，包含首页、作品展示、关于我、联系方式等页面', urgent_flag: 0, audit_status: 1, demand_status: 0 },
  { demand_id: 'D003', demander_id: '20210101', demand_tag: '英语四级辅导', service_type: '学业', task_description: '四级备考冲刺，主要想提高阅读和写作部分，每周2次', budget_amount: 50, deadline: '2026-07-05', delivery_requirement: '希望能提供学习计划和模拟测试', urgent_flag: 0, audit_status: 1, demand_status: 0 },
  { demand_id: 'D004', demander_id: '20210107', demand_tag: '吉他教学', service_type: '文体', task_description: '零基础想学吉他，希望有耐心的同学教我入门，每周1-2次', budget_amount: 40, deadline: '2026-07-15', delivery_requirement: '自带吉他，能在学期末学会弹唱2-3首歌', urgent_flag: 0, audit_status: 1, demand_status: 0 },
  { demand_id: 'D005', demander_id: '20210105', demand_tag: '搬宿舍帮忙', service_type: '生活', task_description: '下周搬宿舍，需要1-2位同学帮忙搬运行李，大概2小时', budget_amount: 25, deadline: '2026-06-18', delivery_requirement: '行李从南苑5栋搬至北苑3栋，有电梯', urgent_flag: 1, audit_status: 1, demand_status: 0 },
  { demand_id: 'D006', demander_id: '20210102', demand_tag: '考研数学答疑', service_type: '学业', task_description: '考研数学一复习中，需要答疑和解题技巧指导，每周1次', budget_amount: 70, deadline: '2026-07-20', delivery_requirement: '能覆盖高数、线代、概率论三大板块', urgent_flag: 0, audit_status: 1, demand_status: 1 },
];

export const orders = [
  { order_id: 'O001', demand_id: 'D001', skill_id: 'S001', demander_id: '20210001', provider_id: '20210101', reward_amount: 60, agreed_delivery_time: '2026-06-20', actual_delivery_time: '', order_status: '进行中', created_at: '2026-06-10 14:30', task_description: 'Python数据结构大作业辅导，包括链表、树、图等核心内容', delivery_requirement: '需要完整的Python代码和说明文档，代码注释清晰' },
  { order_id: 'O002', demand_id: 'D003', skill_id: 'S002', demander_id: '20210001', provider_id: '20210102', reward_amount: 50, agreed_delivery_time: '2026-07-05', actual_delivery_time: '', order_status: '待确认', created_at: '2026-06-12 09:15', task_description: '英语四级备考冲刺，阅读和写作专项辅导', delivery_requirement: '希望能提供学习计划和模拟测试' },
  { order_id: 'O003', demand_id: '', skill_id: 'S004', demander_id: '20210001', provider_id: '20210104', reward_amount: 60, agreed_delivery_time: '2026-06-15', actual_delivery_time: '2026-06-14', order_status: '已完成', created_at: '2026-06-08 16:00', task_description: '竞赛路演PPT美化设计，约20页', delivery_requirement: '风格现代简约，符合竞赛要求' },
  { order_id: 'O004', demand_id: '', skill_id: 'S003', demander_id: '20210001', provider_id: '20210103', reward_amount: 45, agreed_delivery_time: '2026-06-18', actual_delivery_time: '', order_status: '待验收', created_at: '2026-06-13 11:20', task_description: '高等数学极限与导数章节辅导', delivery_requirement: '重点讲解洛必达法则和泰勒展开' },
  { order_id: 'O005', demand_id: 'D005', skill_id: '', demander_id: '20210001', provider_id: '20210105', reward_amount: 25, agreed_delivery_time: '2026-06-18', actual_delivery_time: '', order_status: '申诉中', created_at: '2026-06-14 08:00', task_description: '搬宿舍：南苑5栋搬至北苑3栋', delivery_requirement: '行李搬运，有电梯' },
];

export const progressLogs = {
  O001: [
    { time: '2026-06-10 14:30', title: '工单创建', desc: '需求方下单成功，等待服务方确认' },
    { time: '2026-06-10 15:00', title: '双方确认', desc: '服务方已确认接单，工单进入进行中状态' },
    { time: '2026-06-11 10:00', title: '服务方开始执行', desc: '服务方已开始提供服务' },
  ],
  O002: [
    { time: '2026-06-12 09:15', title: '工单创建', desc: '需求方下单成功，等待服务方确认' },
  ],
  O003: [
    { time: '2026-06-08 16:00', title: '工单创建', desc: '需求方下单成功' },
    { time: '2026-06-08 16:30', title: '双方确认', desc: '服务方确认接单' },
    { time: '2026-06-10 09:00', title: '服务方开始执行', desc: '服务方开始制作PPT' },
    { time: '2026-06-13 20:00', title: '服务方提交成果', desc: 'PPT初稿提交，等待需求方审核' },
    { time: '2026-06-14 10:00', title: '需求方验收通过', desc: '需求方确认验收，报酬已结算' },
    { time: '2026-06-14 14:00', title: '双方互评完成', desc: '双方已完成评价，信用分已更新' },
  ],
  O004: [
    { time: '2026-06-13 11:20', title: '工单创建', desc: '需求方下单成功' },
    { time: '2026-06-13 12:00', title: '双方确认', desc: '服务方确认接单' },
    { time: '2026-06-14 09:00', title: '服务方开始执行', desc: '服务方开始辅导' },
    { time: '2026-06-15 18:00', title: '服务方提交成果', desc: '辅导完成，提交辅导总结，等待验收' },
  ],
  O005: [
    { time: '2026-06-14 08:00', title: '工单创建', desc: '需求方下单成功' },
    { time: '2026-06-14 08:30', title: '双方确认', desc: '服务方确认接单' },
    { time: '2026-06-15 12:00', title: '服务方提交成果', desc: '服务方声称已完成搬运' },
    { time: '2026-06-15 13:00', title: '需求方发起申诉', desc: '需求方认为行李有损坏，发起申诉' },
  ],
};

export const chatContacts = [
  { contact_id: '20210101', last_message: '好的，那我们定在周五下午3点开始？', last_time: '14:30', unread: 2 },
  { contact_id: '20210102', last_message: '四级阅读的真题我已经发给你了', last_time: '昨天', unread: 0 },
  { contact_id: '20210104', last_message: 'PPT初稿已经完成，请查看', last_time: '周一', unread: 0 },
  { contact_id: '20210103', last_message: '洛必达法则这块需要多练几道题', last_time: '6月13日', unread: 0 },
  { contact_id: '20210105', last_message: '明天下午我们来搬，行吗？', last_time: '6月14日', unread: 1 },
];

export const chatMessages = {
  '20210101': [
    { from: '20210101', text: '你好，看到你下单了Python辅导', time: '14:00' },
    { from: '20210001', text: '是的！我数据结构大作业需要帮忙', time: '14:05' },
    { from: '20210101', text: '没问题，你先说说具体需要辅导哪些内容？', time: '14:10' },
    { from: '20210001', text: '主要是链表和二叉树部分，还有图的遍历', time: '14:20' },
    { from: '20210101', text: '好的，那我们定在周五下午3点开始？', time: '14:30' },
  ],
  '20210102': [
    { from: '20210102', text: '同学你好，我是负责英语辅导的李婷', time: '09:00' },
    { from: '20210001', text: '你好！我四级阅读比较薄弱', time: '09:10' },
    { from: '20210102', text: '四级阅读的真题我已经发给你了', time: '09:15' },
  ],
  '20210104': [
    { from: '20210104', text: '你好，你的PPT需求我看到了', time: '周一 10:00' },
    { from: '20210001', text: '太好了！我需要一个竞赛路演的PPT', time: '周一 10:15' },
    { from: '20210104', text: '没问题，大概多少页？什么风格？', time: '周一 10:20' },
    { from: '20210001', text: '大概20页，现代简约风格就好', time: '周一 10:25' },
    { from: '20210104', text: 'PPT初稿已经完成，请查看', time: '周一 15:30' },
  ],
  '20210103': [
    { from: '20210103', text: '你好，我看到你预约了高数辅导', time: '6月13日 14:00' },
    { from: '20210001', text: '是的，我极限和导数部分不太懂', time: '6月13日 14:10' },
    { from: '20210103', text: '洛必达法则这块需要多练几道题', time: '6月13日 14:15' },
    { from: '20210001', text: '好的，我找些题目练练', time: '6月13日 14:20' },
  ],
  '20210105': [
    { from: '20210105', text: '同学你好，我接了你搬宿舍的单', time: '6月14日 10:00' },
    { from: '20210001', text: '好的！行李有点多，辛苦了', time: '6月14日 10:05' },
    { from: '20210105', text: '明天下午我们来搬，行吗？', time: '6月14日 10:10' },
  ],
};

export const notifications = [
  { id: 1, text: '系统通知：您的需求"Python作业辅导"已被接单', time: '2026-06-10 15:00', unread: true },
  { id: 2, text: '系统通知：您有一笔报酬 ¥60.00 已冻结，待服务完成', time: '2026-06-10 15:01', unread: true },
  { id: 3, text: '系统通知：工单 O003 已完成，报酬 ¥60.00 已到账', time: '2026-06-14 10:00', unread: false },
  { id: 4, text: '系统通知：您的信用分已更新，当前 650 分', time: '2026-06-14 14:00', unread: false },
  { id: 5, text: '系统通知：服务方已提交成果，请及时验收工单 O004', time: '2026-06-15 18:00', unread: true },
  { id: 6, text: '系统通知：工单 O005 已进入申诉流程，平台将介入处理', time: '2026-06-15 13:00', unread: false },
];

export function getUserById(studentId) {
  return users.find(u => u.student_id === studentId) || null;
}

export function getSkillById(skillId) {
  return skills.find(s => s.skill_id === skillId) || null;
}

export function getDemandById(demandId) {
  return demands.find(d => d.demand_id === demandId) || null;
}
