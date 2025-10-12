import { createContext, useState } from 'react';
import { apiUrl, headers } from '../global';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const checkAuth = async () => {
    const url = apiUrl + '/auth';
    const token = localStorage.getItem('token') || '';

    try {
      const isAuth = await fetch(url, {
        method: 'GET',
        headers: {
          ...headers,
          'Authorization': `Bearer ${token}`
        }
      });

      return isAuth.json();
    }
    catch (err) {
      return { success: false }
    }
  }

  const [alertDuration, setAlertDuration] = useState(4);
  const [alertMessage, setAlertMessage] = useState('')
  const [alertEnabled, setAlertEnabled] = useState(false);
  const [alertStyle, setAlertStyle] = useState('error');
  const _alert = {
    show: (message, duration = alertDuration, style = alertStyle) => {
      setAlertDuration(duration);
      setAlertMessage(message);
      setAlertStyle(alertStyle);
      setAlertEnabled(true);
    },
    duration: alertDuration,
    message: alertMessage,
    state: alertEnabled,
    style: alertStyle
  }

  return (
    <AuthContext.Provider value={{ checkAuth, _alert }}>
      {children}
    </AuthContext.Provider>
  );
}