import { api } from "@/services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React, { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { useAuth } from "../constants/AuthContext";
import '../global.css';


export default function LoginScreen() {
  const { setToken, setUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

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

    // await signIn(email, password).then(() => {
    //   router.navigate('/home')
    // }).catch((error) => {
    //   console.log(error);
    // });
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title={loading ? "Entrando..." : "Entrar"} onPress={() => handleLogin(email, password)
      } disabled={loading} />

      <Text style={{ marginTop: 20, textAlign: 'center' }}>
        Ainda não tem conta?{' '}
        <Text style={{ color: '#007AFF' }} onPress={() => router.navigate('/register')}>
          Criar conta
        </Text>
      </Text>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 40,
    borderBottomWidth: 1,
    marginBottom: 10,
  },
});


