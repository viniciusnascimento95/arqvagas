import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';

import { AuthProvider } from "../constants/AuthContext";
import '../global.css';
export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <>
    <AuthProvider>
      <GluestackUIProvider mode="light">
        <ThemeProvider value={DefaultTheme}>
          <StatusBar style="auto" />
          <Stack screenOptions={{ animation: 'fade', headerShown: false }} />
        </ThemeProvider>
      </GluestackUIProvider>
    </AuthProvider>
  </>
}
