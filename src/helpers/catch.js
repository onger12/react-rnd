import { handleToastError } from "./handleToast";

export const ctc = (error, msg, toastRef) => {
  const err = `${msg}${msg?.trim()?.endsWith('.') ? '' : '.'} ${error}`;
  console.error(err);
  handleToastError({ detail : err, ref : toastRef });
}