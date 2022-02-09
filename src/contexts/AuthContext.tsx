import React, { createContext, useContext, useEffect, useState } from 'react';
import { api } from '../services/api';

interface UserDataProps {
  email: string;
  name: string;
  avatar: string;
}

type AuthContextData = {
  userLogin: (username: string) => Promise<void>;
  isAuthenticated: boolean;
  isLoading: boolean;
  userData: UserDataProps;
};

export const AuthContext = createContext({} as AuthContextData);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState<UserDataProps>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (window.localStorage.getItem('userData')) {
      setUserData(JSON.parse(sessionStorage.getItem('userData')));
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  async function userLogin(username: string) {
    setIsLoading(true);
    try {
      const response = await api.get(
        `https://api.github.com/users/${username}`,
      );
      const data = response.data;
      const dataUser = {
        name: data.name,
        email: data.email,
        avatar: data.avatar_url,
      };
      setUserData(dataUser);
      setIsAuthenticated(true);
      window.localStorage.setItem('userData', JSON.stringify(dataUser));
    } catch (error) {
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AuthContext.Provider
      value={{ userLogin, isAuthenticated, isLoading, userData }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
