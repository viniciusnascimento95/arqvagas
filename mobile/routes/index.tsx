import HomeScreen from "@/app/screens/home";
import LoginScreen from "@/app/screens/login";
import RegisterScreen from "@/app/screens/register";
import { useAuth } from "@/constants/AuthContext";
import { RoutesNames } from "@/constants/RoutesNames";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";


const Stack = createNativeStackNavigator();

const Routes: React.FC = () => {
  const { token } = useAuth();
  console.log('=>token --->', token);

  return (
    <Stack.Navigator initialRouteName={RoutesNames.LOGIN} screenOptions={{ headerShown: false }}>
      {token ? (
        <Stack.Screen name={RoutesNames.HOME} component={HomeScreen} />
      ) : (
        <Stack.Screen name={RoutesNames.LOGIN} component={LoginScreen} />
      )}
      <Stack.Screen name="init" component={HomeScreen} />
      <Stack.Screen name={RoutesNames.REGISTER} component={RegisterScreen} />

      {/* RegisterScreen */}
    </Stack.Navigator>
  );
};

export default Routes;
