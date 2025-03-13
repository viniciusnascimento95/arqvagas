import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";
import { api } from "@/services/api";
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import { Image, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { useAuth } from "../constants/AuthContext";
import '../global.css';

export default function LoginScreen() {
  const { setToken, setUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (email: string, password: string) => {
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
      }
    })
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://media.licdn.com/dms/image/v2/C4D0BAQFcOVH6msKdBQ/company-logo_200_200/company-logo_200_200/0/1630472256574/arq_vagas_brasil_logo?e=1749686400&v=beta&t=p32DxvVK3sLmHhV7yVDmJ3JEATWudc5i-2FCH7m8X6M' }}
        style={styles.logo}
        resizeMode="contain"
      />
      <Heading className="my-5">Bem-vindo!</Heading>

      <View style={styles.inputContainer}>
        <Ionicons name="mail-outline" size={24} color="#666" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor="#666"
        />
      </View>

      <View style={styles.inputContainer}>
        <Ionicons name="lock-closed-outline" size={24} color="#666" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          placeholderTextColor="#666"
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
          <Ionicons name={showPassword ? "eye-outline" : "eye-off-outline"} size={24} color="#666" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[styles.loginButton, loading && styles.loginButtonDisabled]}
        onPress={() => handleLogin(email, password)}
        disabled={loading}
      >
        <Text style={styles.loginButtonText}>
          Entrar
        </Text>
      </TouchableOpacity>

      <View style={styles.registerContainer}>
        <Text style={styles.registerText}>
          Ainda não tem conta?
        </Text>
      </View>

      <Link href="/register" push  style={styles.registerLink} className="mt-5">
        <Text style={styles.registerLink}>Criar conta</Text>
      </Link>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: '#fff',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 30,
    fontWeight: 'bold',
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 16,
    color: '#333',
  },
  eyeIcon: {
    padding: 5,
  },
  loginButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#007AFF',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  loginButtonDisabled: {
    backgroundColor: '#ccc',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  registerContainer: {
    marginTop: 30,
  },
  registerText: {
    fontSize: 16,
    color: '#666',
  },
  registerLink: {
    color: '#007AFF',
    fontWeight: 'bold',
  },
});
