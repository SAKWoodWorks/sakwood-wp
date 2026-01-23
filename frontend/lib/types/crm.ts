// Customer Profile Types
export interface CRMCustomer {
  id: number;
  wpUserId: number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  lineId?: string;
  company?: string;
  taxId?: string;
  customerType: 'retail' | 'wholesale' | 'vip';
  source?: string;
  status: 'active' | 'inactive' | 'blocked';
  totalOrders: number;
  totalSpent: number;
  lastOrderDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CRMStats {
  totalInteractions: number;
  recentInteractions: number;
  pendingTasks: number;
  completedTasks: number;
}

// Interaction Types
export type InteractionType = 'call' | 'email' | 'line' | 'visit' | 'note';
export type InteractionDirection = 'inbound' | 'outbound';

export interface Interaction {
  id: number;
  type: InteractionType;
  subject?: string;
  message?: string;
  direction: InteractionDirection;
  duration?: number;
  createdBy?: number;
  createdAt: string;
}

export interface InteractionListResponse {
  interactions: Interaction[];
  pagination: {
    total: number;
    perPage: number;
    currentPage: number;
    totalPages: number;
  };
}

export interface InteractionSummary {
  summary: {
    call: number;
    email: number;
    line: number;
    visit: number;
    note: number;
  };
  recent: Array<{
    id: number;
    type: InteractionType;
    subject?: string;
    createdAt: string;
  }>;
}

// Task Types
export type TaskType = 'follow_up' | 'payment_reminder' | 'quote' | 'meeting' | 'other';
export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';
export type TaskStatus = 'pending' | 'in_progress' | 'completed' | 'cancelled';

export interface Task {
  id: number;
  title: string;
  description?: string;
  type: TaskType;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate?: string;
  assignedTo?: number;
  completedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface TaskListResponse {
  tasks: Task[];
  pagination: {
    total: number;
    perPage: number;
    currentPage: number;
    totalPages: number;
  };
}

export interface TaskSummary {
  summary: {
    pending: number;
    in_progress: number;
    completed: number;
    cancelled: number;
  };
  overdue: number;
  upcoming: Array<{
    id: number;
    title: string;
    type: TaskType;
    priority: TaskPriority;
    dueDate: string;
  }>;
}
