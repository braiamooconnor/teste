
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { DialogFooter } from "@/components/ui/dialog";
import { useToast } from '@/components/ui/use-toast';

const ProjectForm = ({ project, onSave, onClose }) => {
  const [name, setName] = useState(project?.name || '');
  const [description, setDescription] = useState(project?.description || '');
  const [status, setStatus] = useState(project?.status || 'Não Iniciado');
  const [startDate, setStartDate] = useState(project?.start_date || '');
  const [endDate, setEndDate] = useState(project?.end_date || '');
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      toast({ title: "Erro", description: "O nome do projeto é obrigatório.", variant: "destructive" });
      return;
    }
    await onSave({ 
      name, 
      description, 
      status, 
      start_date: startDate || null, 
      end_date: endDate || null 
    });
  };
  
  const statusOptions = ["Não Iniciado", "Em Andamento", "Concluído", "Em Espera", "Cancelado"];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="projectName">Nome do Projeto</Label>
        <Input id="projectName" value={name} onChange={(e) => setName(e.target.value)} placeholder="Ex: Implantação Sistema XPTO" required />
      </div>
      <div>
        <Label htmlFor="projectDescription">Descrição</Label>
        <Textarea id="projectDescription" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Detalhes sobre o projeto..." />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="projectStatus">Status</Label>
          <select id="projectStatus" value={status} onChange={(e) => setStatus(e.target.value)} className="w-full mt-1 block py-2 px-3 border border-input bg-background rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm">
            {statusOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        </div>
         <div>
          <Label htmlFor="projectStartDate">Data de Início</Label>
          <Input id="projectStartDate" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        </div>
      </div>
       <div>
          <Label htmlFor="projectEndDate">Data de Término</Label>
          <Input id="projectEndDate" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        </div>
      <DialogFooter>
        <Button type="button" variant="outline" onClick={onClose}>Cancelar</Button>
        <Button type="submit">{project ? 'Salvar Alterações' : 'Criar Projeto'}</Button>
      </DialogFooter>
    </form>
  );
};

export default ProjectForm;
