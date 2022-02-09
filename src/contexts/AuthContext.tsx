import React, { createContext, useContext, useEffect, useState } from 'react';
import { api } from '../services/api';
import Cookies from 'js-cookie';
import { AxiosResponse } from 'axios';

interface UserDataProps {
  email: string;
  name: string;
  avatar: string;
}

type AuthContextData = {
  userLogin: (username: string) => Promise<AxiosResponse>;
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
    if (Cookies.get('userData')) {
      setUserData(JSON.parse(Cookies.get('userData')));
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  async function userLogin(username: string) {
    let responseData = null;
    setIsLoading(true);
    try {
      const response = await api.get(
        `https://api.github.com/users/${username}`,
        {
          headers: {
            Authorization: `token ${process.env.NEXT_PUBLIC_GIT_TOKEN}`,
          },
        },
      );
      responseData = response;
      const data = response.data;
      const dataUser = {
        name: data.name,
        email: data.email,
        avatar: data.avatar_url,
      };
      setUserData(dataUser);
      setIsAuthenticated(true);
      Cookies.set('userData', JSON.stringify(dataUser));
    } catch (error) {
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }

    return responseData;
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
