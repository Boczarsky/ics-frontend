import { OPEN_MODAL, CLOSE_MODAL } from './action-types';
export const openModal = (modalName: string) => ({type: OPEN_MODAL, payload: modalName});
export const closeModal = (modalName: string) => ({type: CLOSE_MODAL, payload: modalName});