import { initToolbar } from '@stagewise/toolbar';
import type { HandleClientError } from '@sveltejs/kit';

export function init() {
  if (import.meta.env.DEV) {
    initToolbar({
      plugins: [],
    });
  }
}

// Обработчик ошибок на клиенте
export const handleError: HandleClientError = ({ error, event: _event, status: _status, message: _message }) => {
  console.error('Client error:', error);
  
  // В production версии можно добавить отправку ошибок в систему мониторинга
  // logErrorToService(error, event, status, message);
  
  return {
    message: 'Произошла неожиданная ошибка. Пожалуйста, попробуйте еще раз.'
  };
};
