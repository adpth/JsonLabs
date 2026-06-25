import { Outlet, NavLink, useLocation } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from 'framer-motion';
import { FiBook, FiCode, FiPlay, FiHome } from 'react-icons/fi';

export default function Layout() {
  const location = useLocation();

  const navItems = [
    { to: '/', label: 'Dashboard', icon: FiHome },
    { to: '/learn', label: 'Learn', icon: FiBook },
    { to: '/practice', label: 'Practice', icon: FiCode },
    { to: '/playground', label: 'Playground', icon: FiPlay },
  ];

  return (
    <div className="flex h-screen bg-void text-slate-100">
      {/* ── Sidebar ── */}
      <aside className="w-60 flex-shrink-0 border-r border-border-subtle bg-surface-0 flex flex-col">
        {/* Logo */}
        <div className="px-5 pt-6 pb-5">
          <div className="flex items-baseline gap-0.5 font-display">
            <span className="text-key text-xl font-bold">{'{'}</span>
            <span className="text-lg font-bold tracking-tight text-white ml-0.5">JSON</span>
            <span className="text-lg font-bold tracking-tight text-slate-400">Labs</span>
            <span className="text-key text-xl font-bold ml-0.5">{'}'}</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 space-y-0.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `group flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13.5px] font-medium transition-all duration-150 ${
                    isActive
                      ? 'bg-key/10 text-key'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-surface-2'
                  }`
                }
              >
                <Icon className="w-[18px] h-[18px]" />
                {item.label}
              </NavLink>
            );
          })}
        </nav>
      </aside>

      {/* ── Main content ── */}
      <main className="flex-1 overflow-hidden bg-void relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="h-full overflow-auto"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
