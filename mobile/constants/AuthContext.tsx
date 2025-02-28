

import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { api } from "../services/api";

interface User {
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
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

  const signIn = async (email: string, password: string) => {
    api.post("/auth/login", { email, password }).then((response) => {
      const { access_token, name, email } = response.data;
      setToken(access_token);
      const userData = { name, email };
      setUser(userData);
      AsyncStorage.setItem("@token", access_token);
      AsyncStorage.setItem("@user", JSON.stringify(userData));
    }).catch((error) => {
      if (error.response.status === 401) {
        alert("Credenciais inválidas");
      } else {
        console.error("Erro ao fazer login:", error);
      }
    })
  };

  const signOut = async () => {
    await AsyncStorage.removeItem("@token");
    await AsyncStorage.removeItem("@user");
    setToken(null);
    setUser(null);
    router.navigate('/')
  };

  return (
    <AuthContext.Provider value={{ user, token, signIn, signOut }}>
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
