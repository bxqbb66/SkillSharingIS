import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAdminStore } from '../data/store';

const navItems = [
  { path: '/admin/dashboard', label: '数据看板', icon: '📊' },
  { path: '/admin/contents', label: '内容审核', icon: '📝' },
  { path: '/admin/orders', label: '工单监管', icon: '📋' },
  { path: '/admin/users', label: '用户管理', icon: '👥' },
  { path: '/admin/appeals', label: '申诉仲裁', icon: '⚖️' },
  { path: '/admin/transactions', label: '交易记录', icon: '💰' },
  { path: '/admin/rules', label: '规则配置', icon: '⚙️' },
];

export default function AdminLayout() {
  const { admin, adminLogout } = useAdminStore();
  const navigate = useNavigate();

  function handleLogout() {
    adminLogout();
    navigate('/admin/login');
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex md:flex-col md:w-56 md:fixed md:inset-y-0 bg-gray-900 text-white z-10">
        <div className="px-5 py-4 border-b border-gray-700">
          <div className="text-sm font-bold tracking-wide">管理后台</div>
          <div className="text-xs text-gray-400 mt-0.5">{admin?.name}</div>
        </div>
        <nav className="flex-1 py-3 space-y-0.5 px-2">
          {navItems.map(item => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  isActive ? 'bg-white/15 font-semibold' : 'text-gray-300 hover:bg-white/10'
                }`
              }
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="px-3 py-3 border-t border-gray-700">
          <NavLink to="/home" className="block text-xs text-gray-400 hover:text-white px-3 py-2 rounded-lg transition-colors mb-1">
            ← 返回学生端
          </NavLink>
          <button
            onClick={handleLogout}
            className="w-full text-left text-xs text-gray-400 hover:text-red-400 px-3 py-2 rounded-lg transition-colors"
          >
            退出登录
          </button>
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="md:hidden bg-gray-900 text-white px-4 py-2.5 flex items-center justify-between">
        <div>
          <span className="text-sm font-bold">管理后台</span>
          <span className="text-xs text-gray-400 ml-2">{admin?.name}</span>
        </div>
        <div className="flex items-center gap-3">
          <NavLink to="/home" className="text-xs text-gray-400">学生端</NavLink>
          <button onClick={handleLogout} className="text-xs text-red-400">退出</button>
        </div>
      </div>

      {/* Mobile bottom tabs for admin */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-10">
        <div className="flex overflow-x-auto h-14">
          {navItems.map(item => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center gap-0.5 px-3 shrink-0 text-xs ${
                  isActive ? 'text-primary font-semibold' : 'text-gray-500'
                }`
              }
            >
              <span className="text-base">{item.icon}</span>
              <span className="text-[10px]">{item.label}</span>
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Main content */}
      <main className="flex-1 pb-16 md:pb-0 md:ml-56">
        <Outlet />
      </main>
    </div>
  );
}
