# 吉林大学校园“灵活用工”与技能互助平台 - 前端开发上下文

## 1. 项目定位
- **开发端**：仅开发学生端（C端），**绝对不做管理端（B端）**。
- **响应式要求**：同时适配手机和电脑。手机端（<768px）底部导航+单列布局；电脑端（≥768px）左侧侧边栏+多列网格布局。
- **技术栈**：React 18 + Vite + Tailwind CSS + React Router v6。
- **主题色**：吉大校徽蓝 `#1A56DB`。

## 2. 核心数据结构（必须严格对应报告 3.2 数据库设计）

### 2.1 用户信息表 (User)
- student_id (学号/主键), name (姓名), college (学院), phone (手机号)
- real_name_status (实名状态: 0未/1已), credit_score (信用分, 默认100), credit_level (等级: A/B/C/D)
- balance (余额), points_balance (积分), frozen_amount (冻结金额)

### 2.2 技能信息表 (Skill)
- skill_id (主键), provider_id (服务方学号/外键)
- skill_tag (标签: 如PPT), skill_category (类别: 学业/技术/生活/文体)
- service_price (价格), available_time (可服务时间), skill_description (描述)
- audit_status (审核: 0待/1过/2驳), skill_status (状态: 0空闲/1匹配/2完成/3下架)

### 2.3 需求信息表 (Demand)
- demand_id (主键), demander_id (需求方学号/外键)
- demand_tag (标签), service_type (类别), task_description (描述)
- budget_amount (预算), deadline (截止时间), urgent_flag (紧急: 0普通/1紧急)
- audit_status (审核), demand_status (状态: 0空闲/1匹配/2完成/3取消)

### 2.4 工单记录表 (Order)
- order_id (主键), demand_id (外键), skill_id (外键)
- demander_id (需求方), provider_id (服务方)
- reward_amount (报酬), agreed_delivery_time (约定时间), actual_delivery_time (实际时间)
- order_status (状态: 待确认/进行中/待验收/已完成/申诉中/已关闭)

### 2.5 评价信息表 (Evaluation)
- evaluation_id, order_id, evaluator_id, evaluated_id, star_score (1-5), evaluation_text

### 2.6 交易记录表 (Transaction)
- transaction_id, order_id, payer_id, payee_id, amount, transaction_type (冻结/转账/退款)

### 2.7 申诉记录表 (Appeal)
- appeal_id, order_id, appellant_id, appeal_type, appeal_description, process_status, arbitration_result

## 3. 核心业务逻辑
1. 服务方发布技能 -> 审核(模拟通过) -> 上架技能广场。
2. 需求方发布需求 -> 审核(模拟通过) -> 上架需求广场。
3. 需求方在技能广场下单，或服务方在需求广场接单 -> 生成工单(状态:待确认)。
4. 双方确认 -> 工单进行中 -> 服务方提交成果 -> 需求方验收。
5. 验收通过 -> 自动结算(扣需求方余额,加服务方余额) -> 双向评价 -> 更新信用分。
