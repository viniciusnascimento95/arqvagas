import { NativeStackNavigationProp } from "@react-navigation/native-stack";

// Define o tipo de navegação baseado no RootParamList
export type NavigationProps = NativeStackNavigationProp<ReactNavigation.RootParamList>;

export const RoutesNames = {
  HOME: "Home",
  LOGIN: "Login",
  REGISTER: "Register",
  PROFILE: "Profile",
} as const;