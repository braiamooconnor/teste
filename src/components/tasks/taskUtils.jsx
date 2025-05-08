
import React from 'react';
import { CheckCircle, Signal as RadioButton } from 'lucide-react';

export const taskStatusOptions = [
  { value: 'A Fazer', label: 'A Fazer', icon: <RadioButton className="mr-2 h-4 w-4 text-gray-500" /> },
  { value: 'Em Andamento', label: 'Em Andamento', icon: <RadioButton className="mr-2 h-4 w-4 text-yellow-500" /> },
  { value: 'Em Revisão', label: 'Em Revisão', icon: <RadioButton className="mr-2 h-4 w-4 text-blue-500" /> },
  { value: 'Concluído', label: 'Concluído', icon: <CheckCircle className="mr-2 h-4 w-4 text-green-500" /> },
];

export const taskPriorityOptions = [
  { value: 'Baixa', label: 'Baixa' },
  { value: 'Média', label: 'Média' },
  { value: 'Alta', label: 'Alta' },
  { value: 'Urgente', label: 'Urgente' },
];
