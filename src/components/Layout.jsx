import { NavLink, Outlet, useLocation } from 'react-router-dom';

const tabs = [
  { path: '/home', label: '首页', icon: '🏠' },
  { path: '/publish', label: '发布', icon: '➕' },
  { path: '/orders', label: '订单', icon: '📋' },
  { path: '/profile', label: '我的', icon: '👤' },
];

export default function Layout() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* 电脑端：左侧侧边栏 */}
      <aside className="hidden md:flex md:flex-col md:w-56 md:fixed md:inset-y-0 md:bg-primary md:text-white md:z-10">
        <div className="flex items-center gap-2 px-6 py-5 border-b border-white/20">
          <span className="text-xl font-bold tracking-wide">吉大技能共享</span>
        </div>
        <nav className="flex-1 py-4 space-y-1 px-3">
          {tabs.map((tab) => {
            const isActive = location.pathname.startsWith(tab.path);
            return (
              <NavLink
                key={tab.path}
                to={tab.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors ${
                  isActive
                    ? 'bg-white/20 font-semibold'
                    : 'hover:bg-white/10'
                }`}
              >
                <span className="text-lg">{tab.icon}</span>
                <span>{tab.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </aside>

      {/* 主内容区 */}
      <main className="flex-1 pb-16 md:pb-0 md:ml-56">
        <Outlet />
      </main>

      {/* 手机端：底部 Tab 导航栏 */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-10">
        <div className="flex justify-around items-center h-14">
          {tabs.map((tab) => {
            const isActive = location.pathname.startsWith(tab.path);
            return (
              <NavLink
                key={tab.path}
                to={tab.path}
                className={`flex flex-col items-center gap-0.5 text-xs ${
                  isActive ? 'text-primary font-semibold' : 'text-gray-500'
                }`}
              >
                <span className="text-lg">{tab.icon}</span>
                <span>{tab.label}</span>
              </NavLink>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
