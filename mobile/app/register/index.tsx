import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";
import { api } from "@/services/api";
import { Ionicons } from '@expo/vector-icons';
import { router } from "expo-router";
import React, { useState } from "react";
import { Button, Image, StyleSheet, TextInput } from "react-native";
const RegisterScreen: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setLoading(true);

    api.post("/auth/register", { name, email, phone: phone.replace(/[-()]/g, ''), password }).then((response) => {
      console.log(response.status);

      if (response.status === 201) {
        router.push('/')
        alert('Usuário criado com sucesso!');
      }
    }).catch((error) => {
      console.log(error);
    });
    setLoading(false);
  };

  return (
    <View
      style={styles.container}
    >
      <Image
        source={{ uri: 'https://media.licdn.com/dms/image/v2/C4D0BAQFcOVH6msKdBQ/company-logo_200_200/company-logo_200_200/0/1630472256574/arq_vagas_brasil_logo?e=1749686400&v=beta&t=p32DxvVK3sLmHhV7yVDmJ3JEATWudc5i-2FCH7m8X6M' }}
        style={styles.logo}
        resizeMode="contain"
      />
      <Heading className="my-5">Criar Conta</Heading>
      <View style={styles.inputContainer}>
        <Ionicons name="person-outline" size={20} color="#666" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Nome"
          value={name}
          onChangeText={setName}
          autoCapitalize="words"
        />
      </View>
      <View style={styles.inputContainer}>
        <Ionicons name="mail-outline" size={20} color="#666" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>
      <View style={styles.inputContainer}>
        <Ionicons name="call-outline" size={20} color="#666" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Celular"
          value={phone}
          onChangeText={(value) => {
            const cleaned = value.replace(/\D/g, '')
            let formatted = cleaned
            if (cleaned.length <= 11) {
              if (cleaned.length > 2) formatted = `(${cleaned.slice(0, 2)})${cleaned.slice(2)}`
              if (cleaned.length > 7) formatted = `(${cleaned.slice(0, 2)})${cleaned.slice(2, 7)}-${cleaned.slice(7)}`
              setPhone(formatted)
            }
          }}
          keyboardType="phone-pad"
          maxLength={14}
        />        </View>
      <View style={styles.inputContainer}>
        <Ionicons name="lock-closed-outline" size={20} color="#666" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button title={loading ? "Criando..." : "Criar Conta"} onPress={handleRegister} disabled={loading} />
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20, padding: 10 }}>
        <Text style={{ fontSize: 16, color: '#666' }}>Já tem uma conta? </Text>
        <Text 
          onPress={() => router.push('/')} 
          style={{ 
            fontSize: 16, 
            color: '#0066CC', 
            fontWeight: '600',
            padding: 8,
            marginLeft: 4
          }}
        >
          Fazer login
        </Text>
      </View>
    </View>
  );
};
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
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
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
    height: 45,
    fontSize: 16,
  },
  buttonContainer: {
    width: '100%',
    marginTop: 10,
  },
  loginText: {
    marginTop: 25,
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
  },
  loginLink: {
    color: '#007AFF',
    fontWeight: 'bold',
  }
});

export default RegisterScreen;