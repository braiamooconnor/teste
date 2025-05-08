
import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LayoutDashboard, Settings, Thermometer } from 'lucide-react';
import { cn } from '@/lib/utils';

const Sidebar = () => {
  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Configurações', path: '/settings', icon: Settings }, // Exemplo de outra rota
  ];

  const navLinkClasses = ({ isActive }) =>
    cn(
      "flex items-center px-4 py-3 rounded-lg transition-colors duration-200",
      isActive
        ? "bg-primary/10 text-primary font-semibold shadow-inner"
        : "text-gray-600 hover:bg-gray-200 hover:text-gray-800"
    );

  return (
    <motion.div
      initial={{ x: -250 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="w-64 bg-white shadow-lg flex flex-col border-r border-gray-200"
    >
      <div className="h-20 flex items-center justify-center border-b border-gray-200">
         <div className="flex items-center text-xl font-bold text-primary">
            <Thermometer className="h-8 w-8 mr-2" />
            <span>TempApp</span>
         </div>
      </div>
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item, index) => (
          <motion.div
            key={item.path}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * index + 0.3 }}
          >
            <NavLink
              to={item.path}
              className={navLinkClasses}
              end={item.path === '/dashboard'} // Garante que só /dashboard seja ativo na raiz
            >
              <div className="w-6 h-6 mr-3 flex items-center justify-center bg-primary/20 text-primary rounded">
                <item.icon className="h-4 w-4" />
              </div>
              <span>{item.name}</span>
            </NavLink>
          </motion.div>
        ))}
      </nav>
      <div className="p-4 border-t border-gray-200 mt-auto">
        <p className="text-xs text-gray-500 text-center">© 2025 TempApp</p>
      </div>
    </motion.div>
  );
};

export default Sidebar;
