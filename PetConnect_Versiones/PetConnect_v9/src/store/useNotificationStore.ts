import { create } from 'zustand';

export interface Notification {
  id: string;
  message: string;
  type: 'alert' | 'info' | 'success';
  read: boolean;
  timestamp: Date;
}

interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (message: string, type?: 'alert' | 'info' | 'success') => void;
  markAllRead: () => void;
  clearAll: () => void;
}

export const useNotificationStore = create<NotificationState>()((set) => ({
  notifications: [
    {
      id: '1',
      message: '¡Alerta! Alguien ha escaneado el collar de Rex. Ubicación recibida.',
      type: 'alert',
      read: false,
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
    },
    {
      id: '2',
      message: 'Tu pedido de 2 collares NFC está en camino.',
      type: 'info',
      read: false,
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
    },
    {
      id: '3',
      message: 'Bienvenido a PetConnect. ¡Tu cuenta ha sido creada con éxito!',
      type: 'success',
      read: true,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    },
  ],
  unreadCount: 2,

  addNotification: (message, type = 'info') => {
    const notification: Notification = {
      id: Date.now().toString(),
      message,
      type,
      read: false,
      timestamp: new Date(),
    };
    set((state) => ({
      notifications: [notification, ...state.notifications],
      unreadCount: state.unreadCount + 1,
    }));
  },

  markAllRead: () => {
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, read: true })),
      unreadCount: 0,
    }));
  },

  clearAll: () => set({ notifications: [], unreadCount: 0 }),
}));
