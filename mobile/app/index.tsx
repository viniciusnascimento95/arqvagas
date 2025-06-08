import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";
import { api } from "@/services/api";
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import { ActivityIndicator, Image, KeyboardAvoidingView, Platform, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { useAuth } from "../constants/AuthContext";
import '../global.css';

export default function LoginScreen() {
  const { setToken, setUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (email: string, password: string) => {
    if (!email || !password) {
      alert("Por favor, preencha todos os campos");
      return;
    }
    
    setLoading(true);

    api.post("/auth/login", { email, password }).then((response) => {
      if (response.status === 201) {
        const { access_token, name, email } = response.data;
        setToken(access_token);
        const userData = { name, email };
        setUser(userData);
        AsyncStorage.setItem("@token", access_token);
        AsyncStorage.setItem("@user", JSON.stringify(userData));
        router.navigate('/home')
      }
    }).catch((error) => {
      if (error.response.status === 401) {
        alert("Credenciais inválidas");
        setPassword("");
      } else {
        console.error("Erro ao fazer login:", error);
        alert("Ocorreu um erro ao fazer login. Tente novamente.");
      }
    })
    setLoading(false);
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.contentContainer}>
        <Image
          source={{ uri: 'https://media.licdn.com/dms/image/v2/C4D0BAQFcOVH6msKdBQ/company-logo_200_200/company-logo_200_200/0/1630472256574/arq_vagas_brasil_logo?e=1749686400&v=beta&t=p32DxvVK3sLmHhV7yVDmJ3JEATWudc5i-2FCH7m8X6M' }}
          style={styles.logo}
          resizeMode="contain"
        />
        
        <View style={styles.headerContainer}>
          <Heading className="text-3xl font-bold text-gray-800">Bem-vindo!</Heading>
          <Text style={styles.subtitle}>Entre com suas credenciais para continuar</Text>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Ionicons name="mail-outline" size={24} color="#6B7280" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor="#9CA3AF"
            />
          </View>

          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={24} color="#6B7280" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Senha"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              placeholderTextColor="#9CA3AF"
            />
            <TouchableOpacity 
              onPress={() => setShowPassword(!showPassword)} 
              style={styles.eyeIcon}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Ionicons 
                name={showPassword ? "eye-outline" : "eye-off-outline"} 
                size={24} 
                color="#6B7280" 
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[styles.loginButton, loading && styles.loginButtonDisabled]}
            onPress={() => handleLogin(email, password)}
            disabled={loading}
            activeOpacity={0.8}
          >
            {loading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.loginButtonText}>
                Entrar
              </Text>
            )}
          </TouchableOpacity>

          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>
              Ainda não tem conta?
            </Text>
            <Link href="/register" push style={styles.registerLink}>
              <Text style={styles.registerLinkText}>Criar conta</Text>
            </Link>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 16,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    marginTop: 8,
  },
  formContainer: {
    width: '100%',
    maxWidth: 400,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 56,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    marginBottom: 16,
    paddingHorizontal: 16,
    backgroundColor: '#F9FAFB',
  },
  icon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 16,
    color: '#1F2937',
  },
  eyeIcon: {
    padding: 4,
  },
  loginButton: {
    width: '100%',
    height: 56,
    backgroundColor: '#2563EB',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
    shadowColor: '#2563EB',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  loginButtonDisabled: {
    backgroundColor: '#93C5FD',
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
    gap: 8,
  },
  registerText: {
    fontSize: 16,
    color: '#6B7280',
  },
  registerLink: {
    marginLeft: 4,
  },
  registerLinkText: {
    color: '#2563EB',
    fontSize: 16,
    fontWeight: '600',
  },
});
