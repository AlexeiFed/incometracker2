export interface Client {
  id: string;
  name: string;
  createdAt: string;
  archived?: boolean;
}

export interface Income {
  id: string;
  amount: number;
  clientName: string;
  comment?: string;
  date: string;
}

