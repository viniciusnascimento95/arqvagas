import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";
import { api } from "@/services/api";
import { Ionicons } from '@expo/vector-icons';
import { router } from "expo-router";
import React, { useState } from "react";
import { ActivityIndicator, Image, StyleSheet, TextInput, TouchableOpacity } from "react-native";

const RegisterScreen: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name || !email || !phone || !password) {
      alert('Por favor, preencha todos os campos');
      return;
    }

    setLoading(true);
    try {
      const response = await api.post("/auth/register", { 
        name, 
        email, 
        phone: phone.replace(/[-()]/g, ''), 
        password 
      });

      if (response.status === 201) {
        alert('Usuário criado com sucesso!');
        router.push('/');
      }
    } catch (error) {
      console.log(error);
      alert('Erro ao criar usuário. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Image
          source={{ uri: 'https://media.licdn.com/dms/image/v2/C4D0BAQFcOVH6msKdBQ/company-logo_200_200/company-logo_200_200/0/1630472256574/arq_vagas_brasil_logo?e=1749686400&v=beta&t=p32DxvVK3sLmHhV7yVDmJ3JEATWudc5i-2FCH7m8X6M' }}
          style={styles.logo}
          resizeMode="contain"
        />
        <Heading className="my-5">Criar Conta</Heading>

        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Ionicons name="person-outline" size={20} color="#666" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Nome"
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
              placeholderTextColor="#999"
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
              placeholderTextColor="#999"
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
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={20} color="#666" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Senha"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              placeholderTextColor="#999"
            />
          </View>

          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleRegister}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Criar Conta</Text>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Já tem uma conta? </Text>
          <TouchableOpacity onPress={() => router.push('/')}>
            <Text style={styles.loginLink}>Fazer login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  formContainer: {
    width: '100%',
    maxWidth: 400,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    marginBottom: 16,
    paddingHorizontal: 12,
    backgroundColor: '#f8f8f8',
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: '#333',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#0066CC',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonDisabled: {
    backgroundColor: '#99C4FF',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  loginContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
  },
  loginText: {
    fontSize: 16,
    color: '#666',
  },
  loginLink: {
    fontSize: 16,
    color: '#0066CC',
    fontWeight: '600',
    padding: 8,
  }
});

export default RegisterScreen;