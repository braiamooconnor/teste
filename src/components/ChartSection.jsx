
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TemperatureChart from "@/components/temperature-chart";
import TimeFilter from "@/components/time-filter";

const ChartSection = ({ filteredData, timeRange, setTimeRange }) => {
  return (
    <div className="lg:col-span-3">
      <Card className="shadow-lg h-full">
        <CardHeader className="pb-2">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <CardTitle>Gráfico de Temperatura</CardTitle>
            <div className="w-full sm:w-auto">
              <TimeFilter value={timeRange} onChange={setTimeRange} />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {filteredData.length > 0 ? (
            <TemperatureChart data={filteredData} timeFormat={timeRange} />
          ) : (
            <div className="h-[400px] flex items-center justify-center">
              <p className="text-muted-foreground">Nenhum dado disponível para o período selecionado</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ChartSection;
