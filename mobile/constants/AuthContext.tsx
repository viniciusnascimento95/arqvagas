

import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";

interface User {
  name: string | null;
  email: string | null;
  phone?: string | null
  school?: string | null
  init_date_school?: string | null
  end_date_school?: string | null
  portfolio_url?: string | null
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  // signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // Carregar o token salvo ao iniciar o app
  useEffect(() => {
    const loadStorageData = async () => {
      const storedToken = await AsyncStorage.getItem("@token");
      const storedUser = await AsyncStorage.getItem("@user");

      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      }
    };

    loadStorageData();
  }, []);

  const signOut = async () => {
    await AsyncStorage.removeItem("@token");
    await AsyncStorage.removeItem("@user");
    setToken(null);
    setUser(null);
    router.push('/')
  };

  return (
    <AuthContext.Provider value={{ user, token, signOut, setUser, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};
