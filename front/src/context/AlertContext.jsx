import { createContext, useState } from 'react';

export const AlertContext = createContext();

export function AlertProvider({ children }) {
  const [alertDuration, setAlertDuration] = useState(4);
  const [alertMessage, setAlertMessage] = useState('')
  const [alertState, setAlertState] = useState('closed');
  const [alertStyle, setAlertStyle] = useState('error-alert');
  
  const _alert = {
    show: (message, style = alertStyle, duration = alertDuration) => {
      setAlertDuration(duration);
      setAlertMessage(message);
      setAlertStyle(style);

      if(alertState != 'active'){
        setAlertState('active');
      }
      if(alertState == 'active'){
        setAlertState('new');
      }
    },
    close: () => setAlertState('closed'),
    reload: () => setAlertState('active'),
    state: alertState,
    duration: alertDuration,
    message: alertMessage,
    style: alertStyle,
    styles: {
      error: 'error-alert',
      warning: 'warning-alert',
      success: 'success-alert',
      information: 'information-alert',
    } 
  }

  return (
    <AlertContext.Provider value={{ _alert }}>
      {children}
    </AlertContext.Provider>
  );
}