import React, { createContext, useCallback, useEffect, useState } from 'react';

interface AuthContextProps {
  auth: boolean;
  setAuth: (value: boolean) => void;
  remember: boolean;
  setRemember: (value: boolean) => void;
}

const AuthContext = createContext<AuthContextProps>({ 
  auth: false, 
  setAuth: () => {},
  remember: false,
  setRemember: () => {} 
});

export const AuthProvider: React.FC = ({ children }) => {
  const [auth, setAuth] = useState(false);
  const [remember, setRemember] = useState(false);

  const handleAuth = useCallback((value: boolean) => {
    setAuth(value);
  }, []);

  const handleRemember = useCallback((value: boolean) => {
    setRemember(value);
  }, []);

  useEffect(() => {
    const rememberStorage = localStorage.getItem('remember');

    if (rememberStorage) {
      setRemember(true);
      setAuth(true);
    }

    const token = sessionStorage.getItem('token');

    if (token) {
      setAuth(true);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ 
      auth, 
      setAuth: handleAuth,
      remember,
      setRemember: handleRemember 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;