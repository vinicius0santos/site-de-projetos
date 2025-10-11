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

  return (
    <AuthContext.Provider value={{ checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
}