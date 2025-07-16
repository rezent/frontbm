import { writable } from 'svelte/store';

export const callbackModalOpen = writable(false);

export const modalActions = {
  openCallbackModal: () => {
    callbackModalOpen.set(true);
  },
  
  closeCallbackModal: () => {
    callbackModalOpen.set(false);
  }
}; 