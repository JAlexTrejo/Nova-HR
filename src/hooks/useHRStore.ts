
import { create } from 'zustand';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'employee' | 'supervisor' | 'admin';
  department: string;
  position: string;
  avatar?: string;
  startDate: string;
}

export interface TimeEntry {
  id: string;
  userId: string;
  date: string;
  clockIn?: string;
  lunchOut?: string;
  lunchIn?: string;
  clockOut?: string;
  location?: string;
  totalHours?: number;
}

export interface LeaveRequest {
  id: string;
  userId: string;
  type: 'vacation' | 'sick' | 'personal';
  startDate: string;
  endDate: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  assignedTo: string;
  assignedBy: string;
  dueDate: string;
  status: 'pending' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
}

export interface Holiday {
  id: string;
  name: string;
  date: string;
  isRecurring: boolean;
}

interface HRStore {
  // Current user
  currentUser: User | null;
  
  // Data
  users: User[];
  timeEntries: TimeEntry[];
  leaveRequests: LeaveRequest[];
  tasks: Task[];
  holidays: Holiday[];
  
  // Actions
  setCurrentUser: (user: User) => void;
  addTimeEntry: (entry: Omit<TimeEntry, 'id'>) => void;
  updateTimeEntry: (id: string, updates: Partial<TimeEntry>) => void;
  addLeaveRequest: (request: Omit<LeaveRequest, 'id' | 'createdAt'>) => void;
  updateLeaveRequest: (id: string, status: LeaveRequest['status']) => void;
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  addHoliday: (holiday: Omit<Holiday, 'id'>) => void;
}

export const useHRStore = create<HRStore>((set, get) => ({
  currentUser: {
    id: '1',
    name: 'María García',
    email: 'maria.garcia@company.com',
    role: 'employee',
    department: 'Marketing',
    position: 'Marketing Specialist',
    startDate: '2023-03-15'
  },
  
  users: [
    {
      id: '1',
      name: 'María García',
      email: 'maria.garcia@company.com',
      role: 'employee',
      department: 'Marketing',
      position: 'Marketing Specialist',
      startDate: '2023-03-15'
    },
    {
      id: '2',
      name: 'Carlos López',
      email: 'carlos.lopez@company.com',
      role: 'supervisor',
      department: 'IT',
      position: 'Tech Lead',
      startDate: '2022-01-10'
    },
    {
      id: '3',
      name: 'Ana Rodríguez',
      email: 'ana.rodriguez@company.com',
      role: 'admin',
      department: 'HR',
      position: 'HR Manager',
      startDate: '2021-06-01'
    }
  ],
  
  timeEntries: [
    {
      id: '1',
      userId: '1',
      date: new Date().toISOString().split('T')[0],
      clockIn: '09:00',
      location: 'Oficina Central'
    }
  ],
  
  leaveRequests: [
    {
      id: '1',
      userId: '1',
      type: 'vacation',
      startDate: '2024-07-15',
      endDate: '2024-07-19',
      reason: 'Vacaciones familiares',
      status: 'pending',
      createdAt: '2024-06-08'
    }
  ],
  
  tasks: [
    {
      id: '1',
      title: 'Revisar campaña Q2',
      description: 'Análisis de métricas de la campaña del segundo trimestre',
      assignedTo: '1',
      assignedBy: '2',
      dueDate: '2024-06-15',
      status: 'pending',
      priority: 'high',
      createdAt: '2024-06-08'
    },
    {
      id: '2',
      title: 'Actualizar documentación',
      description: 'Actualizar la documentación del proceso de onboarding',
      assignedTo: '1',
      assignedBy: '3',
      dueDate: '2024-06-20',
      status: 'in-progress',
      priority: 'medium',
      createdAt: '2024-06-05'
    }
  ],
  
  holidays: [
    {
      id: '1',
      name: 'Día de la Independencia',
      date: '2024-07-04',
      isRecurring: true
    },
    {
      id: '2',
      name: 'Navidad',
      date: '2024-12-25',
      isRecurring: true
    }
  ],
  
  setCurrentUser: (user) => set({ currentUser: user }),
  
  addTimeEntry: (entry) => set((state) => ({
    timeEntries: [...state.timeEntries, { ...entry, id: Date.now().toString() }]
  })),
  
  updateTimeEntry: (id, updates) => set((state) => ({
    timeEntries: state.timeEntries.map((entry) =>
      entry.id === id ? { ...entry, ...updates } : entry
    )
  })),
  
  addLeaveRequest: (request) => set((state) => ({
    leaveRequests: [...state.leaveRequests, {
      ...request,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    }]
  })),
  
  updateLeaveRequest: (id, status) => set((state) => ({
    leaveRequests: state.leaveRequests.map((request) =>
      request.id === id ? { ...request, status } : request
    )
  })),
  
  addTask: (task) => set((state) => ({
    tasks: [...state.tasks, {
      ...task,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    }]
  })),
  
  updateTask: (id, updates) => set((state) => ({
    tasks: state.tasks.map((task) =>
      task.id === id ? { ...task, ...updates } : task
    )
  })),
  
  addHoliday: (holiday) => set((state) => ({
    holidays: [...state.holidays, { ...holiday, id: Date.now().toString() }]
  }))
}));
