import { useIdleTimer } from 'react-idle-timer';
import { showToast } from './ToastUtil';
import { useNavigate } from 'react-router-dom';

const SessionUtil = ({ timeoutInMinutes })  => {
  const navigate = useNavigate();

  const handleOnIdle = () => {
    console.log('User was idle');
    localStorage.clear();
    showToast('Session Timed Out Due To Inactivity !', false, 2000, false);
    setTimeout(() => {
      navigate('/login');
    }, 2000);
  };

  // Set up idle timer
  useIdleTimer({
    timeout: 1000 * 60 * timeoutInMinutes,
    onIdle: handleOnIdle,
    debounce: 500,
    events: ['mousemove', 'keydown', 'wheel'],
  });
  return null;
}

export default SessionUtil;
