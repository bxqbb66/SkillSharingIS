# 吉大互助平台 (JLU-Mutual-Hub)

吉林大学校园技能与需求互助平台。悬赏互助，技能变现！

**技术栈**：React 18 + Vite + Tailwind CSS v3 + React Router v6

---

## 新人如何跑起来？（3 步搞定）

1. 确保电脑装了 [Node.js](https://nodejs.org/)（下载 LTS 版）和 Git
2. 克隆仓库并安装依赖：

```bash
git clone https://github.com/bxqbb66/SkillSharingIS.git
cd SkillSharingIS
npm install
```

3. 启动项目：

```bash
npm run dev
```

终端会出现本地网址 `http://localhost:5173`，点开就能看到项目。

生产构建：

```bash
npm run build
npm run preview
```

---

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
- **电脑端 (≥768px)**：左侧固定侧边栏，2-3列网格布局

采用 Mobile First 原则：默认样式为手机端，`md:` 前缀覆写为电脑端。

## 主题色

吉林大学校徽蓝 `#003366`，在 `tailwind.config.js` 中定义。

---

## 团队协作红线（必看，违规请客奶茶！）

为了防止代码冲突导致大家白干，**严禁直接在主分支 `master` 上写代码！**

### 正确的开发姿势

1. 每天开工前，先拉取最新代码：

```bash
git checkout master
git pull
```

2. 新建功能分支（分支名用英文，见名知意）：

```bash
git checkout -b feature/消息页面    # 新功能
git checkout -b fix/首页样式错乱    # 修Bug
```

3. 在你自己分支上写代码

4. 写完后推送到远程：

```bash
git add .
git commit -m "feat: 完成了消息页面的UI"
git push origin feature/消息页面
```

5. **在 GitHub 网页端发起 Pull Request (PR)**，通知队长审核合并。**绝对不要自己合并到主分支！**

---

## AI 协作开发指南

我们用 Claude Code 辅助开发，但 AI 没有记忆，它全靠读项目里的文件来理解上下文。项目里有三个灵魂文件：

- **`CONTEXT.md`**：项目的基因库。记录了所有 Mock 数据结构、页面路由和核心逻辑。**绝对不要删！** 如果 AI 改错了数据结构，去这里查。
- **`NEXT_STEPS.md`**：任务看板。你想让 AI 干什么活，先写在这里。
- **`README.md`**：就是你现在看的这个。

### 和 AI 对话的正确模板

> 1. 先在 `NEXT_STEPS.md` 写好需求
> 2. 在终端对 AI 说："我已经把需求写在 NEXT_STEPS.md 里了，请阅读并帮我开发。"

---

## Commit 提交规范

提交代码时请按以下前缀开头，方便看历史记录：

- `feat:` 新功能（例: `feat: 新增钱包页面`）
- `fix:` 修 Bug（例: `fix: 修复登录状态丢失`）
- `docs:` 改文档（例: `docs: 更新README`）
- `style:` 改样式（例: `style: 优化首页卡片圆角`）
- `chore:` 配置/工具变更

---

## Mock 数据规范

所有 Mock 数据必须严格使用 `CONTEXT.md` 中定义的表字段名（snake_case）：

- 用户：`student_id`, `credit_score`, `credit_level`, `balance`
- 技能：`skill_id`, `provider_id`, `skill_tag`, `service_price`
- 需求：`demand_id`, `demander_id`, `budget_amount`, `urgent_flag`
- 工单：`order_id`, `order_status`, `reward_amount`

---

## 队长如何邀请协作者？

如果要让队友能推代码到仓库，必须把他们加为协作者：

1. 打开仓库页面，点击 **Settings**
2. 左侧菜单点击 **Collaborators**
3. 点击 **Add people**，输入队友的 GitHub 用户名或邮箱
4. 权限选 **Write**，点击邀请
5. **关键**：队友必须去邮箱点击确认链接接受邀请，才能推代码！（经常有人漏掉这步）

---

## License

内部项目，仅供学习和毕业设计使用。
