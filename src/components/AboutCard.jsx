
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Info } from 'lucide-react';

const AboutCard = () => {
  return (
    <Card className="shadow-lg">
      <CardHeader className="flex flex-row items-center space-x-2">
        <Info className="h-5 w-5 text-primary" />
        <CardTitle>Sobre este Dashboard</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">
          Este dashboard visualiza dados de temperatura coletados via Arduino e armazenados no Supabase. 
          Faça login para ver e gerenciar suas leituras. Configure seu Arduino para enviar dados para o 
          endpoint correto (requer configuração de API adicional, por exemplo, com Supabase Functions ou um backend simples).
        </p>
      </CardContent>
    </Card>
  );
};

export default AboutCard;
