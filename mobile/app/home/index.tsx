import { useAuth } from "@/constants/AuthContext";
import { Box } from "../../components/ui/box";
import { Button } from "../../components/ui/button";
import { Heading } from "../../components/ui/heading";
import { HStack } from "../../components/ui/hstack";
import { Icon } from "../../components/ui/icon";
import { Pressable } from "../../components/ui/pressable";
import { Text } from "../../components/ui/text";
import { VStack } from "../../components/ui/vstack";

import { router, usePathname } from "expo-router";
import {
  BookOpenIcon,
  BriefcaseIcon,
  CalendarIcon,
  ChevronLeftIcon,
  ClockIcon,
  GraduationCapIcon,
  HomeIcon,
  StarIcon,
  TrophyIcon,
  UserIcon
} from "lucide-react-native";
import { Linking } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export default function DashboardScreen() {
  const { signOut, user } = useAuth()
  const pathname = usePathname();

  return (
    <SafeAreaView className="h-full w-full">
      <VStack className="h-full w-full bg-background-0 flex-1">
        <Box className="md:hidden">
          <HStack
            className="py-6 px-4 border-b border-border-50 bg-background-0 items-center"
            space="md"
          >
            <Pressable
              onPress={() => {
                router.back();
              }}
            >
              <Icon as={ChevronLeftIcon} />
            </Pressable>
            <Text className="text-xl">Dashboard</Text>
          </HStack>
        </Box>
        <VStack className="h-full w-full">
          <HStack className="h-full w-full">
            <VStack className="w-full">
              <Box className="flex-1">
                <VStack className="p-4 pb-2 md:px-10 md:pt-6 w-full" space="2xl">
                  <Heading size="lg" className="font-roboto">
                    Bem-vindo ao ArquiVagas, {user?.name}!
                  </Heading>

                  <HStack className="justify-between flex-wrap gap-4">
                    <Pressable
                      onPress={() => router.push('/profile')}
                      className="bg-slate-200 p-6 rounded-xl flex-1 min-w-[150px] shadow-sm"
                    >
                      <VStack space="md" className="items-center">
                        <Icon as={UserIcon} size="xl" className="text-primary-500" />
                        <Text className="text-center font-medium">Meu Perfil</Text>
                      </VStack>
                    </Pressable>

                    <Pressable
                      onPress={() => router.push('/oportunity')}
                      className="bg-gray-200 p-6 rounded-xl flex-1 min-w-[150px] shadow-sm"
                    >
                      <VStack space="md" className="items-center">
                        <Icon as={BriefcaseIcon} size="xl" className="text-primary-500" />
                        <Text className="text-center font-medium">Ver Vagas</Text>
                      </VStack>
                    </Pressable>

                    <Pressable
                      onPress={() => Linking.openURL('https://mentoria-curriculo.com')}
                      className="bg-red-100 p-6 rounded-xl flex-1 min-w-[150px] shadow-sm"
                    >
                      <VStack space="md" className="items-center">
                        <Icon as={BookOpenIcon} size="xl" className="text-primary-500" />
                        <Text className="text-center font-medium">Dicas para Currículo</Text>
                      </VStack>
                    </Pressable>

                    <Pressable
                      onPress={() => Linking.openURL('https://mentoria.com')}
                      className="bg-blue-100 p-6 rounded-xl flex-1 min-w-[150px] shadow-sm"
                    >
                      <VStack space="md" className="items-center">
                        <Icon as={GraduationCapIcon} size="xl" className="text-primary-500" />
                        <Text className="text-center font-medium">Mentorias</Text>
                      </VStack>
                    </Pressable>

                    <Pressable
                      onPress={() => Linking.openURL('https://portfolio-sucesso.com')}
                      className="bg-green-100 p-6 rounded-xl flex-1 min-w-[150px] shadow-sm"
                    >
                      <VStack space="md" className="items-center">
                        <Icon as={TrophyIcon} size="xl" className="text-primary-500" />
                        <Text className="text-center font-medium">Portfólios de Sucesso</Text>
                      </VStack>
                    </Pressable>

                    <Pressable
                      onPress={() => Linking.openURL('https://eventos-workshops.com')}
                      className="bg-yellow-100 p-6 rounded-xl flex-1 min-w-[150px] shadow-sm"
                    >
                      <VStack space="md" className="items-center">
                        <Icon as={CalendarIcon} size="xl" className="text-primary-500" />
                        <Text className="text-center font-medium">Eventos e Workshops</Text>
                      </VStack>
                    </Pressable>

                    <Pressable
                      onPress={() => Linking.openURL('https://agendar-consultoria.com')}
                      className="bg-purple-100 p-6 rounded-xl flex-1 min-w-[150px] shadow-sm"
                    >
                      <VStack space="md" className="items-center">
                        <Icon as={ClockIcon} size="xl" className="text-primary-500" />
                        <Text className="text-center font-medium">Agendar Consultoria</Text>
                      </VStack>
                    </Pressable>
                  </HStack>

                  <VStack space="md" className="my-4">
                    <Box className="bg-background-50 p-6 rounded-xl shadow-sm">
                      <VStack space="lg">
                        <HStack space="sm" className="items-center">
                          <Icon as={StarIcon} className="text-primary-500" />
                          <Text className="text-lg font-medium">Ações Rápidas</Text>
                        </HStack>

                        <Button
                          variant="outline"
                          className="bg-white"
                          onPress={() => router.push('/profile/editProfile')}
                        >
                          <Text className="text-primary-500 font-medium">Editar Perfil</Text>
                        </Button>

                        <Button
                          variant="outline"
                          className="bg-white"
                          onPress={() => signOut()}
                        >
                          <Text className="text-red-500 font-medium">Sair da Conta</Text>
                        </Button>
                      </VStack>
                    </Box>
                  </VStack>
                </VStack>
              </Box>
            </VStack>
          </HStack>
        </VStack>
      </VStack>

      <VStack className="flex-1 justify-end">
        <HStack className="bg-white p-4 border-t border-gray-200 justify-around w-full shadow-lg">
          <Pressable
            onPress={() => router.push('/home')}
            className={pathname === "/home" ? "opacity-100" : "opacity-60"}
          >
            <VStack className="items-center">
              <Icon as={HomeIcon} size="md" className="text-primary-500" />
              <Text className="text-xs text-primary-500 font-medium">Início</Text>
            </VStack>
          </Pressable>

          <Pressable
            onPress={() => router.push('/oportunity')}
            className={pathname === "/oportunity" ? "opacity-100" : "opacity-60"}
          >
            <VStack className="items-center">
              <Icon as={BriefcaseIcon} size="md" className="text-primary-500" />
              <Text className="text-xs text-primary-500 font-medium">Vagas</Text>
            </VStack>
          </Pressable>

          <Pressable
            onPress={() => router.push('/profile')}
            className={pathname === "/profile" ? "opacity-100" : "opacity-60"}
          >
            <VStack className="items-center">
              <Icon as={UserIcon} size="md" className="text-primary-500" />
              <Text className="text-xs text-primary-500 font-medium">Perfil</Text>
            </VStack>
          </Pressable>
        </HStack>
      </VStack>
    </SafeAreaView>
  );
};