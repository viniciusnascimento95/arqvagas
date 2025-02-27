import { useAuth } from "@/constants/AuthContext";
import { NavigationProps, RoutesNames } from "@/constants/RoutesNames";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";



const LoginScreen: React.FC = () => {
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation<NavigationProps>();

  const handleLogin = async () => {
    setLoading(true);
    await signIn(email, password).then(() => {
      navigation.navigate(RoutesNames.HOME);
    });
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
      <Button title={loading ? "Entrando..." : "Entrar"} onPress={handleLogin} disabled={loading} />

      <Text style={{ marginTop: 20, textAlign: 'center' }}>
        Ainda não tem conta?{' '}
        <Text style={{ color: '#007AFF' }} onPress={() => navigation.navigate('Register')}>
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

export default LoginScreen;
