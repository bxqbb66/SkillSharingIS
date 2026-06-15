# Bug 修复：工单详情页显示“没有工单”

请优先修复以下问题：

1. **问题现象**：
   - 在“我的”页面，“我的工单”列表里能看到多条工单。
   - 点击某条工单，跳转到工单详情页后，页面却显示“没有工单”或空白内容。

2. **根因分析**：
   - 详情页路由使用的是 /order/:id，但详情页组件没有使用 useParams 获取 URL 中的 id。
   - 即使有 id，详情页也没有根据 id 去 Mock 数据源中查找对应的工单记录。
   - 列表页和详情页可能使用了不同的 Mock 数据源或字段名，导致数据对不上。

3. **修复要求**：

   A. 路由与跳转：
   - 确保路由配置中有 /order/:id（如果已有，不要重复添加）。
   - 在“我的工单”列表中，每一项的点击跳转路径必须带上工单 ID，例如：
     - <Link to={`/order/${order.id}`}>查看详情</Link>
     - 或使用 useNavigate：navigate(`/order/${order.id}`)

   B. 详情页获取参数：
   - 在工单详情页组件中，使用 useParams 从路由中获取 id：
     import { useParams } from 'react-router-dom';
     const { id } = useParams();

   C. 根据 ID 查找工单数据：
   - 定义一个统一的 Mock 工单数据数组（建议放在独立文件如 src/mock/orders.js，或 CONTEXT.md 对应的 order_record）。
   - 在详情页中，根据 id 从该数组中找到对应工单：
     const order = mockOrders.find(o => o.id === id);
     如果找不到，显示“工单不存在”；找到则渲染详情。

   D. 字段对齐：
   - 列表页和详情页使用的字段名必须一致，严格参照 CONTEXT.md 中的 order_record 定义：
     - id
     - order_status
     - reward_amount
     - task_description
     - progress_log
     - evaluation
     等。

   E. 补充“工单不存在”的提示：
   - 如果 id 对应的工单不存在，页面应提示“该工单不存在或已被删除”，并提供一个“返回我的工单”按钮，点击跳转回 /profile 或 /orders。
