import { writable } from 'svelte/store';

export const callbackModalStore = writable({
  isOpen: false,
});

export const modalActions = {
  openCallbackModal: () => {
    callbackModalStore.update(state => ({ ...state, isOpen: true }));
  },
  
  closeCallbackModal: () => {
    callbackModalStore.update(state => ({ ...state, isOpen: false }));
  },
}; 