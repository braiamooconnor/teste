
import React from "react";
import { motion } from "framer-motion";
import { 
  Thermometer, 
  ThermometerSun, 
  ThermometerSnowflake, 
  BarChart3, 
} from "lucide-react";

import StatsCard from "@/components/stats-card";
import ChartSection from "@/components/ChartSection";
import ControlPanel from "@/components/ControlPanel";
import AboutCard from "@/components/AboutCard";
import useTemperatureData from "@/hooks/useTemperatureData"; // Import the hook

const DashboardPage = () => {
  // Use the custom hook to manage data and logic
  const {
    loading,
    filteredData,
    stats,
    timeRange,
    setTimeRange,
    addTemperature,
    clearData,
    reloadSampleData,
    fetchData // For potential manual refresh
  } = useTemperatureData();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  if (loading) {
     return <div className="flex justify-center items-center h-full">Carregando dados...</div>; // Basic loading indicator
  }

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Temperatura Média"
          value={`${stats.average}°C`}
          icon={<Thermometer className="h-5 w-5" />}
        />
        <StatsCard
          title="Temperatura Máxima"
          value={`${stats.max}°C`}
          icon={<ThermometerSun className="h-5 w-5" />}
        />
        <StatsCard
          title="Temperatura Mínima"
          value={`${stats.min}°C`}
          icon={<ThermometerSnowflake className="h-5 w-5" />}
        />
        <StatsCard
          title="Total de Leituras"
          value={stats.count}
          icon={<BarChart3 className="h-5 w-5" />}
        />
      </motion.div>

      <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <ChartSection 
          filteredData={filteredData} 
          timeRange={timeRange} 
          setTimeRange={setTimeRange} 
        />
        <ControlPanel 
          onAddTemperature={addTemperature} 
          onClearData={clearData} 
          onReloadSampleData={reloadSampleData} // Pass the Supabase functions
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <AboutCard />
      </motion.div>
    </motion.div>
  );
};

export default DashboardPage;
