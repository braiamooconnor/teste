
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { LogOut, User } from 'lucide-react';
import { motion } from 'framer-motion';

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <motion.header 
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="h-20 bg-white shadow-md flex items-center justify-between px-6 border-b border-gray-200"
    >
      <div>
        {/* Pode adicionar breadcrumbs ou título da página aqui */}
        <h1 className="text-lg font-semibold text-gray-700">Dashboard</h1>
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <User className="h-5 w-5 text-primary" />
          <span>{user?.name || user?.email || 'Usuário'}</span>
        </div>
        <Button variant="ghost" size="sm" onClick={logout} className="text-red-600 hover:bg-red-100 hover:text-red-700">
          <LogOut className="mr-2 h-4 w-4" />
          Sair
        </Button>
      </div>
    </motion.header>
  );
};

export default Header;
