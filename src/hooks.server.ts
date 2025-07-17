import type { Handle, HandleServerError } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
  return await resolve(event);
};

// Обработчик ошибок на сервере
export const handleError: HandleServerError = ({ error, event: _event, status: _status, message: _message }) => {
  console.error('Server error:', error);
  
  // В production версии можно добавить отправку ошибок в систему мониторинга
  // logErrorToService(error, event, status, message);
  
  return {
    message: 'Произошла ошибка сервера. Пожалуйста, попробуйте позже.',
    errorId: crypto.randomUUID()
  };
};
