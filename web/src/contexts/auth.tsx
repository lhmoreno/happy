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

const rememberStorage = localStorage.getItem('remember');
const tokenSession = sessionStorage.getItem('token');
const tokenLocal = localStorage.getItem('token');
let rememberInitial = false;
let authInitial = false;

if (rememberStorage) {
  rememberInitial = true;
}

if (tokenLocal || tokenSession) {
  authInitial = true;
}

export const AuthProvider: React.FC = ({ children }) => {
  const [auth, setAuth] = useState(authInitial);
  const [remember, setRemember] = useState(rememberInitial);

  const handleAuth = useCallback((value: boolean) => {
    setAuth(value);
  }, []);

  const handleRemember = useCallback((value: boolean) => {
    setRemember(value);
  }, []);

  useEffect(() => {
    
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