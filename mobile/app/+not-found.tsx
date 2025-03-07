import { Link, Stack } from "expo-router";
import { StyleSheet } from "react-native";

import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <View style={styles.container}>
        <Text style={styles.title}>Pagina não encontrada</Text>

        <Link href="/" style={styles.link}>
          <Text style={styles.linkText}>Fique tranquilo vamos voltar para home</Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: "#2e78b7",
  },
});
