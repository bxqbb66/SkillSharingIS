# 吉大互助 — 吉林大学校园技能共享平台

吉林大学校园技能互助平台（学生端），支持学生发布技能、发布需求、生成工单、评价互认，实现校园内的"灵活用工"闭环。

**在线演示**：本地运行，暂未部署线上版本。

## 技术栈

| 类别 | 技术 |
|------|------|
| 框架 | React 18 (Vite) |
| 样式 | Tailwind CSS v3 |
| 路由 | React Router v6 |
| 状态管理 | React Context + 自定义 Pub/Sub Store |
| 头像 | [DiceBear Avataaars](https://www.dicebear.com/styles/avataaars) |
| 卡片封面 | [Lorem Picsum](https://picsum.photos) |

## 快速开始

```bash
# 1. 克隆仓库
git clone https://github.com/bxqbb66/SkillSharingIS.git
cd SkillSharingIS

# 2. 安装依赖
npm install

# 3. 启动开发服务器
npm run dev

# 4. 生产构建
npm run build
npm run preview
```

浏览器访问 `http://localhost:5173` 即可看到应用。

## 项目结构

```
src/
├── components/           # 可复用组件
│   ├── Layout.jsx        # 全局响应式布局（手机底部Tab / 电脑左侧侧边栏）
│   ├── SkillCard.jsx     # 技能卡片（封面图 + 头像 + 标签 + 价格）
│   ├── DemandCard.jsx    # 需求卡片（封面图 + 头像 + 标签 + 预算）
│   └── Skeleton.jsx      # 骨架屏组件
├── pages/                # 页面组件
│   ├── Home.jsx          # 首页广场（技能/需求双Tab + 搜索 + 分类筛选）
│   ├── Publish.jsx       # 发布页（发布技能 / 发布需求表单）
│   ├── SkillDetail.jsx   # 技能详情页 /skill/:id
│   ├── DemandDetail.jsx  # 需求详情页 /demand/:id
│   ├── OrderDetail.jsx   # 工单详情页 /order/:id（进度追踪 + 操作按钮）
│   ├── Orders.jsx        # 我的工单列表 /orders
│   ├── Messages.jsx      # 消息页 /messages（聊天 + 系统通知）
│   ├── Profile.jsx       # 个人中心 /profile（信用分 + 钱包 + 评价）
│   ├── UserProfile.jsx   # 他人主页 /user/:id
│   └── Login.jsx         # 登录/注册页 /login
├── data/                 # 数据层
│   ├── mockData.js       # Mock 数据（用户、技能、需求、工单、评价、聊天）
│   ├── store.js          # 响应式共享状态（Pub/Sub 模式）
│   └── AuthContext.jsx   # 全局认证状态（React Context）
├── utils/
│   └── images.js         # 头像/封面图 URL 生成工具
├── App.jsx               # 路由配置
├── main.jsx              # 入口文件
└── index.css             # Tailwind 指令 + 全局样式 + 动画
```

## 页面路由

| 路由 | 页面 | 说明 |
|------|------|------|
| `/home` | 首页广场 | 技能/需求双Tab，支持搜索和分类筛选 |
| `/publish` | 发布页 | 发布技能或需求 |
| `/messages` | 消息 | 聊天列表 + 系统通知 |
| `/orders` | 我的工单 | 按状态筛选工单列表 |
| `/profile` | 个人中心 | 信用分、钱包、评价、退出登录 |
| `/skill/:id` | 技能详情 | 服务方信息 + 预约按钮 |
| `/demand/:id` | 需求详情 | 需求方信息 + 接单按钮 |
| `/order/:id` | 工单详情 | 进度时间轴 + 动态操作按钮 |
| `/user/:id` | 他人主页 | 公开信息 + 技能/需求/评价Tab |
| `/login` | 登录注册 | 模拟统一身份认证 |

## 核心业务闭环

```
服务方发布技能 ─┐
               ├─→ 审核通过 → 上架广场
需求方发布需求 ─┘

广场下单/接单 → 生成工单(待确认)
  → 双方确认(进行中)
    → 服务方提交成果(待验收)
      → 需求方验收(已完成)
        → 双向评价 → 更新信用分
```

## 响应式设计

- **手机端 (<768px)**：底部Tab导航，单列卡片布局，底部悬浮操作栏
- **电脑端 (≥768px)**：左侧固定侧边栏（56px宽），2-3列网格布局，Sticky操作面板

采用 Mobile First 原则：默认样式为手机端，`md:` 前缀覆写为电脑端。

## 主题色

吉林大学校徽蓝 `#003366`，定义在 `tailwind.config.js` 中：

```js
colors: {
  primary: { DEFAULT: '#003366', light: '#004a8f', dark: '#002244' },
  accent: '#A4212E',
}
```

## 协作开发指南

### 分支策略

- `master` — 主分支，保持可运行状态
- `feat/xxx` — 新功能分支
- `fix/xxx` — 修复分支

### 提交规范

```bash
feat: 新功能描述
fix: 修复问题描述
chore: 配置/工具变更
style: UI/样式调整
```

### 添加新页面

1. 在 `src/pages/` 下创建页面组件
2. 在 `src/App.jsx` 中添加路由
3. 如需数据，在 `src/data/mockData.js` 中添加 Mock 数据
4. 如需全局状态，在 `src/data/store.js` 中扩展

### Mock 数据规范

所有 Mock 数据必须严格使用 `CONTEXT.md` 中定义的表字段名（snake_case），例如：

- 用户：`student_id`, `credit_score`, `credit_level`
- 技能：`skill_id`, `provider_id`, `skill_tag`, `service_price`
- 需求：`demand_id`, `demander_id`, `budget_amount`, `urgent_flag`
- 工单：`order_id`, `order_status`, `reward_amount`

## License

内部项目，仅供学习和毕业设计使用。
