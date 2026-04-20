export type BudgetStatus = 'Rascunho' | 'Enviado' | 'Aprovado' | 'Recusado';

export interface ServiceItem {
  id: string;
  description: string;
  value: number;
  quantity: number;
}

export interface Budget {
  id: string;
  title: string;
  client: string;
  status: BudgetStatus;
  items: ServiceItem[];
  total: number;
  discountPercentage?: number;
  createdAt: string;
}