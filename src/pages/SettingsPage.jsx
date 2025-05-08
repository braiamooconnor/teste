
import React from 'react';
import { motion } from 'framer-motion';
import ThemeToggle from '@/components/ThemeToggle';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useTheme } from '@/contexts/ThemeContext';
import { cn } from '@/lib/utils';

const SettingsPage = () => {
  const { theme } = useTheme();
  const cardBg = theme === 'light' ? 'bg-white' : 'bg-slate-800';
  const textColor = theme === 'light' ? 'text-gray-700' : 'text-gray-200';
  const descriptionColor = theme === 'light' ? 'text-gray-500' : 'text-gray-400';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <h1 className={cn("text-3xl font-bold", textColor)}>Configurações</h1>
      
      <Card className={cn(cardBg, "shadow-lg")}>
        <CardHeader>
          <CardTitle className={textColor}>Preferências de Tema</CardTitle>
          <CardDescription className={descriptionColor}>
            Personalize a aparência do seu dashboard.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ThemeToggle />
        </CardContent>
      </Card>

      {/* Adicionar mais seções de configurações aqui no futuro */}
      {/* 
      <Card className={cn(cardBg, "shadow-lg")}>
        <CardHeader>
          <CardTitle className={textColor}>Notificações</CardTitle>
          <CardDescription className={descriptionColor}>
            Gerencie suas preferências de notificação.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className={descriptionColor}>Configurações de notificação em breve.</p>
        </CardContent>
      </Card>
      */}
    </motion.div>
  );
};

export default SettingsPage;
