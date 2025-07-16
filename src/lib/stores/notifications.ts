import { writable, derived, type Writable, type Readable } from 'svelte/store';
import type { Notification } from '$lib/types/api';
import { NotificationService } from '$lib/api/services';

// Интерфейс для состояния уведомлений
interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  isLoading: boolean;
  error: string | null;
}

// Создаем store для уведомлений
export const notifications = writable<NotificationState>({
  notifications: [],
  unreadCount: 0,
  isLoading: false,
  error: null
});

// Функции для работы с уведомлениями
export const notificationActions = {
  // Загрузка уведомлений
  loadNotifications: async (): Promise<void> => {
    notifications.update(state => ({ ...state, isLoading: true, error: null }));
    
    try {
      const notificationsList = await NotificationService.getNotifications();
      
      notifications.update(state => ({
        ...state,
        notifications: notificationsList,
        unreadCount: notificationsList.filter(n => !n.read).length,
        isLoading: false,
        error: null
      }));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Ошибка загрузки уведомлений';
      notifications.update(state => ({ 
        ...state, 
        isLoading: false, 
        error: errorMessage 
      }));
    }
  },

  // Отметить уведомление как прочитанное
  markAsRead: async (id: string): Promise<void> => {
    try {
      await NotificationService.markAsRead(id);
      
      notifications.update(state => ({
        ...state,
        notifications: state.notifications.map(notification =>
          notification.id === id ? { ...notification, read: true } : notification
        ),
        unreadCount: Math.max(0, state.unreadCount - 1)
      }));
    } catch (error) {
    }
  },

  // Отметить все уведомления как прочитанные
  markAllAsRead: async (): Promise<void> => {
    try {
      await NotificationService.markAllAsRead();
      
      notifications.update(state => ({
        ...state,
        notifications: state.notifications.map(notification => ({
          ...notification,
          read: true
        })),
        unreadCount: 0
      }));
    } catch (error) {
    }
  },

  // Удалить уведомление
  deleteNotification: async (id: string): Promise<void> => {
    try {
      await NotificationService.deleteNotification(id);
      
      notifications.update(state => {
        const notification = state.notifications.find(n => n.id === id);
        const wasUnread = notification && !notification.read;
        
        return {
          ...state,
          notifications: state.notifications.filter(n => n.id !== id),
          unreadCount: wasUnread ? Math.max(0, state.unreadCount - 1) : state.unreadCount
        };
      });
    } catch (error) {
    }
  },

  // Добавить локальное уведомление (для временных уведомлений)
  addLocalNotification: (notification: Omit<Notification, 'id' | 'userId' | 'createdAt'>): void => {
    const newNotification: Notification = {
      ...notification,
      id: `local_${Date.now()}`,
      userId: 'local',
      createdAt: new Date().toISOString()
    };
    
    notifications.update(state => ({
      ...state,
      notifications: [newNotification, ...state.notifications],
      unreadCount: notification.read ? state.unreadCount : state.unreadCount + 1
    }));
  },

  // Очистить ошибку
  clearError: (): void => {
    notifications.update(state => ({ ...state, error: null }));
  }
};

// Вычисляемые значения
export const allNotifications: Readable<Notification[]> = derived(
  notifications, 
  ($notifications) => $notifications.notifications
);

export const unreadNotifications: Readable<Notification[]> = derived(
  allNotifications, 
  ($notifications) => $notifications.filter(n => !n.read)
);

export const readNotifications: Readable<Notification[]> = derived(
  allNotifications, 
  ($notifications) => $notifications.filter(n => n.read)
);

export const unreadCount: Readable<number> = derived(
  notifications, 
  ($notifications) => $notifications.unreadCount
);

export const isLoading: Readable<boolean> = derived(
  notifications, 
  ($notifications) => $notifications.isLoading
);

export const error: Readable<string | null> = derived(
  notifications, 
  ($notifications) => $notifications.error
);

// Утилиты для работы с уведомлениями
export const notificationUtils = {
  // Группировка уведомлений по типу
  groupByType: (notifications: Notification[]) => {
    return notifications.reduce((groups, notification) => {
      const type = notification.type;
      if (!groups[type]) {
        groups[type] = [];
      }
      groups[type].push(notification);
      return groups;
    }, {} as Record<string, Notification[]>);
  },

  // Группировка уведомлений по дате
  groupByDate: (notifications: Notification[]) => {
    return notifications.reduce((groups, notification) => {
      const date = new Date(notification.createdAt).toDateString();
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(notification);
      return groups;
    }, {} as Record<string, Notification[]>);
  },

  // Форматирование даты уведомления
  formatDate: (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 1) {
      return 'Только что';
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)} ч. назад`;
    } else if (diffInHours < 48) {
      return 'Вчера';
    } else {
      return date.toLocaleDateString('ru-RU');
    }
  }
}; 