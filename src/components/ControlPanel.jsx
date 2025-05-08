
import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw, Database } from "lucide-react";
import TemperatureForm from "@/components/temperature-form";

const ControlPanel = ({ onAddTemperature, onClearData, onReloadSampleData }) => {
  return (
    <div className="lg:col-span-1">
      <Tabs defaultValue="manual" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="manual">Manual</TabsTrigger>
          <TabsTrigger value="config">Configuração</TabsTrigger>
        </TabsList>
        <TabsContent value="manual" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Adicionar Temperatura</CardTitle>
            </CardHeader>
            <CardContent>
              <TemperatureForm onAddTemperature={onAddTemperature} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="config" className="mt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Gerenciar Dados</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Button 
                  variant="outline" 
                  className="w-full flex items-center justify-center"
                  onClick={onReloadSampleData}
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Recarregar Dados Exemplo
                </Button>
                <Button 
                  variant="destructive" 
                  className="w-full flex items-center justify-center"
                  onClick={onClearData}
                >
                  <Database className="mr-2 h-4 w-4" />
                  Limpar Todos os Dados
                </Button>
              </div>
              <div className="text-sm text-muted-foreground border-t pt-4">
                <p className="font-semibold mb-2">Instruções para Arduino:</p>
                <ol className="list-decimal pl-5 space-y-1">
                  <li>Configure seu Arduino para enviar dados via HTTP POST.</li>
                  <li>Use o formato JSON: <code className="bg-muted px-1 rounded">{"{"}"temperature": 25.5{"}"}</code></li>
                  <li>Envie para o endpoint da sua API (a ser configurado com Supabase).</li>
                </ol>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ControlPanel;
