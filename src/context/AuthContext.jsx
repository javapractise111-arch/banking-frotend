import { createContext, useContext, useMemo, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('banking_user');
    return stored ? JSON.parse(stored) : null;
  });

  const [token, setToken] = useState(() => localStorage.getItem('banking_token') || null);

  useEffect(() => {
    if (user) {
      localStorage.setItem('banking_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('banking_user');
    }
  }, [user]);

  useEffect(() => {
    if (token) {
      localStorage.setItem('banking_token', token);
    } else {
      localStorage.removeItem('banking_token');
    }
  }, [token]);

  const login = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  const value = useMemo(() => ({ user, token, login, logout }), [user, token]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
