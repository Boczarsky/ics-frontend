import { OPEN_MODAL, CLOSE_MODAL } from './action-types';
export const openModal = (modalName: string, modalData: any = true) => ({type: OPEN_MODAL, payload: {modalName, modalData}});
export const closeModal = (modalName: string) => ({type: CLOSE_MODAL, payload: modalName});