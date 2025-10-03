export enum OrderStatus {
  Quote = 'عرض سعر',
  Pending = 'قيد الانتظار',
  PrePress = 'تحضير الطباعة',
  Printing = 'قيد الطباعة',
  Finishing = 'التشطيب',
  Completed = 'مكتمل',
  Delivered = 'تم التسليم'
}

export interface Client {
  id: string;
  name: string;
  company: string;
  phone: string;
  email: string;
}

export interface Order {
  id: string;
  jobTitle: string;
  clientId: string;
  status: OrderStatus;
  quantity: number;
  paperType: string;
  dimensions: string;
  colors: string;
  finishing: string;
  price: number;
  dueDate: string;
  createdAt: string;
}

export interface Worker {
  id: string;
  name: string;
  role: string;
  salary: number;
  hireDate: string;
}

export enum TransactionType {
  Income = 'دخل',
  Expense = 'مصروف'
}

export interface Transaction {
  id: string;
  orderId?: string; 
  type: TransactionType;
  description: string;
  amount: number;
  date: string;
}
