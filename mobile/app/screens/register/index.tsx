import { RoutesNames } from "@/constants/RoutesNames";
import { api } from "@/services/api";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

// Define o tipo de navegação baseado no RootParamList
type NavigationProps = NativeStackNavigationProp<ReactNavigation.RootParamList>;

const RegisterScreen: React.FC = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation<NavigationProps>();

  const handleRegister = async () => {
    setLoading(true);
    // Implementar lógica de registro

    api.post("/auth/register", { name, email, phone, password }).then((response) => {
      console.log(response.status);

      if(response.status === 201) {
        navigation.navigate('Login');

        alert('Usuário criado com sucesso!');
      }
    }).catch((error) => {
      console.log(error);
    });
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Criar Conta</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={name}
        onChangeText={setName}
        autoCapitalize="words"
      />
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
        placeholder="Celular"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title={loading ? "Criando..." : "Criar Conta"} onPress={handleRegister} disabled={loading} />

      <Text style={{ marginTop: 20, textAlign: 'center' }}>
        Já tem uma conta?{' '}
        <Text style={{ color: '#007AFF' }} onPress={() => navigation.navigate(RoutesNames.LOGIN)}>
          Fazer login
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

export default RegisterScreen;