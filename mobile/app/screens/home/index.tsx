import { useAuth } from "@/constants/AuthContext";
import { RoutesNames } from "@/constants/RoutesNames";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { Button, ScrollView, StyleSheet, Text } from "react-native";

// Define o tipo de navegação baseado no RootParamList
type NavigationProps = NativeStackNavigationProp<ReactNavigation.RootParamList>;

const HomeScreen: React.FC = () => {
  const { signOut, user, token } = useAuth();

  const navigation = useNavigation<NavigationProps>();

  function handleLogout() {
    signOut();
    navigation.navigate(RoutesNames.LOGIN)
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Bem-vindo, {user?.name}!</Text>
      <Text style={styles.token}>Seu Token JWT:</Text>
      <Text style={styles.tokenText}>{token} {user?.email} </Text>
      <Button title="Sair" onPress={handleLogout} />
    </ScrollView>
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
  token: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: "bold",
  },
  tokenText: {
    fontSize: 12,
    marginBottom: 20,
    color: "gray",
  },
});

export default HomeScreen;
