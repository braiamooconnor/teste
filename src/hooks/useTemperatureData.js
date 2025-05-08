
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { filterDataByTimeRange, calculateTemperatureStats, generateSampleData } from '@/utils/temperature-data'; // Keep utils for filtering/stats/sample

const useTemperatureData = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [allData, setAllData] = useState([]);
  const [timeRange, setTimeRange] = useState("dia");
  const [filteredData, setFilteredData] = useState([]);
  const [stats, setStats] = useState({ average: "N/A", min: "N/A", max: "N/A", count: 0 });
  const [loading, setLoading] = useState(true);

  // Fetch data from Supabase
  const fetchData = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('temperature_readings')
        .select('temperature, timestamp')
        .eq('user_id', user.id)
        .order('timestamp', { ascending: true });

      if (error) {
        throw error;
      }
      
      // Convert timestamp format if needed (Supabase returns ISO string)
       const formattedData = data.map(item => ({
         ...item,
         timestamp: new Date(item.timestamp).getTime() 
       }));

       // Check if sample data needs to be added (only if DB is empty)
       if (formattedData.length === 0) {
         // This part is tricky - generating sample data should ideally be a one-time seed
         // For now, let's keep the generation logic but consider removing it later
         // Or provide a button specifically for seeding sample data
         toast({
           title: "Nenhum dado encontrado",
           description: "Parece que você ainda não tem leituras. Adicione manualmente ou configure seu Arduino.",
         });
       }
       
       setAllData(formattedData);

    } catch (error) {
      console.error('Erro ao buscar dados:', error);
      toast({
        title: "Erro ao buscar dados",
        description: error.message || "Não foi possível carregar os dados do banco.",
        variant: "destructive",
      });
       setAllData([]); // Clear data on error
    } finally {
      setLoading(false);
    }
  }, [user, toast]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Update filtered data and stats when allData or timeRange changes
  useEffect(() => {
    const filtered = filterDataByTimeRange(allData, timeRange);
    setFilteredData(filtered);
    const newStats = calculateTemperatureStats(filtered);
    setStats(newStats);
  }, [allData, timeRange]);

  // Add a new temperature reading
  const addTemperature = useCallback(async (newTempData) => {
    if (!user) return;
    try {
      // Convert local timestamp back to ISO string for Supabase
      const timestampISO = new Date(newTempData.timestamp).toISOString();
      
      const { data, error } = await supabase
        .from('temperature_readings')
        .insert([{ 
          user_id: user.id, 
          temperature: newTempData.temperature,
          timestamp: timestampISO // Send ISO string
        }])
        .select('temperature, timestamp'); // Select the inserted data

      if (error) {
        throw error;
      }

      if (data && data.length > 0) {
         // Add the new data point correctly formatted to the local state
        const addedRecord = {
          ...data[0],
          timestamp: new Date(data[0].timestamp).getTime()
        };
        setAllData(prevData => [...prevData, addedRecord]);
        toast({
          title: "Sucesso",
          description: "Temperatura adicionada com sucesso!",
        });
      } else {
         throw new Error("Nenhum dado retornado após a inserção.");
      }

    } catch (error) {
      console.error('Erro ao adicionar temperatura:', error);
      toast({
        title: "Erro ao adicionar",
        description: error.message || "Não foi possível salvar a temperatura.",
        variant: "destructive",
      });
    }
  }, [user, toast]);

  // Clear all data for the current user
  const clearData = useCallback(async () => {
    if (!user) return;
    if (window.confirm("Tem certeza que deseja limpar todos os seus dados? Esta ação não pode ser desfeita.")) {
      try {
        const { error } = await supabase
          .from('temperature_readings')
          .delete()
          .eq('user_id', user.id);

        if (error) {
          throw error;
        }

        setAllData([]); // Clear local state
        toast({
          title: "Dados limpos",
          description: "Todas as suas leituras de temperatura foram removidas.",
        });

      } catch (error) {
        console.error('Erro ao limpar dados:', error);
        toast({
          title: "Erro ao limpar dados",
          description: error.message || "Não foi possível remover os dados.",
          variant: "destructive",
        });
      }
    }
  }, [user, toast]);
  
   // Reload sample data (This is less ideal with a real DB)
  // Consider replacing this with a seed function or removing it.
  // For now, it will add sample data IN ADDITION to existing data if any.
  const reloadSampleData = useCallback(async () => {
     if (!user) return;
     if (window.confirm("Isso adicionará dados de exemplo ao banco. Continuar?")) {
       setLoading(true);
       try {
         const sample = generateSampleData(); // Generates data with local timestamps
         const sampleForSupabase = sample.map(item => ({
           user_id: user.id,
           temperature: item.temperature,
           timestamp: new Date(item.timestamp).toISOString() // Convert to ISO
         }));

         const { error } = await supabase
           .from('temperature_readings')
           .insert(sampleForSupabase);

         if (error) {
           throw error;
         }
         
         toast({
           title: "Dados de exemplo adicionados",
           description: "Novos dados de exemplo foram inseridos.",
         });
         fetchData(); // Refetch all data including the new samples

       } catch (error) {
         console.error('Erro ao adicionar dados de exemplo:', error);
         toast({
           title: "Erro ao adicionar exemplos",
           description: error.message || "Não foi possível adicionar dados de exemplo.",
           variant: "destructive",
         });
       } finally {
         setLoading(false);
       }
     }
  }, [user, toast, fetchData]);


  return {
    loading,
    filteredData,
    stats,
    timeRange,
    setTimeRange,
    addTemperature,
    clearData,
    reloadSampleData, // Be cautious using this with a real DB
    fetchData // Expose fetchData if manual refresh is needed
  };
};

export default useTemperatureData;
