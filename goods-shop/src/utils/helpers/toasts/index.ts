import { toast } from 'react-toastify';

export const errorToast = (message: string, hideProgressBar = false) =>
  toast.error(`${message}`, {
    position: 'bottom-right',
    autoClose: 5000,
    hideProgressBar: hideProgressBar,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
  });

export const successToast = (message: string, hideProgressBar = false) =>
  toast.success(`${message}`, {
    position: 'bottom-right',
    autoClose: 5000,
    hideProgressBar: hideProgressBar,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
  });

export const infoToast = (message: string, hideProgressBar = false) =>
  toast.info(`${message}`, {
    position: 'bottom-right',
    autoClose: 5000,
    hideProgressBar: hideProgressBar,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
  });
