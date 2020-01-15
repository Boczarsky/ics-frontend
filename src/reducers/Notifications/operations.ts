import { addNotification, removeNotification } from "./actions";
import randomKey from "../../utils/randomKey";

export const pushNotification = (message: string, type: string, time: number) => (dispatch: Function, getState: Function) => {
  const uniqueId = randomKey();
  dispatch(addNotification(uniqueId, message, type, time));
  setTimeout(() => {
    dispatch(removeNotification(uniqueId));
  }, time + 500);
};