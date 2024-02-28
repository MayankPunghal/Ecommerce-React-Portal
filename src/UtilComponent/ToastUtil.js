// ToastUtils.js
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const showToast = (message, isSuccess = true) => {
  const toastOptions = {
    position: 'top-left',
    autoClose: isSuccess ? 1000 : 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    style: { width: '400%' },
  };

  if (isSuccess) {
    toast.success(message, toastOptions);
  } else {
    toast.error(message, toastOptions);
  }
};

const ToastUtils = () => {
  // This component doesn't render anything, it just provides the utility function
  return null;
};

export { showToast, ToastUtils };
