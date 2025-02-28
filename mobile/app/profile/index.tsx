import { router } from "expo-router";
import { ChevronRight, Settings, User } from "lucide-react-native";
import { useEffect, useState } from "react";
import { Pressable, SafeAreaView } from "react-native";
import { Avatar, AvatarFallbackText, AvatarImage } from "../../components/ui/avatar";
import { Button, ButtonText } from "../../components/ui/button";
import { Divider } from "../../components/ui/divider";
import { Heading } from "../../components/ui/heading";
import { HStack } from "../../components/ui/hstack";
import { Icon } from "../../components/ui/icon";
import { Text } from "../../components/ui/text";
import { VStack } from "../../components/ui/vstack";
import { useAuth } from "../../constants/AuthContext";

import { api } from "../../services/api";

type UserProfile = {
  id: number
  email: string
  name: string
  phone: string | null
  school: string | null
  init_date_school: string | null
  end_date_school: string | null
  // software_skills: string[]
  // personal_skills: string[]
  portfolio_url: string | null
  password: string
  createdAt: string
}
export default function MobileProfileScreen() {
  const { signOut, user } = useAuth()

  const [profile, setProfile] = useState<UserProfile | null>(null)

  useEffect(() => {
    api.get(`/user/showUserByEmail/${user?.email}`).then(response => {
      setProfile(response.data)
    }).catch(error => {
      console.log(JSON.stringify(error, null, 3))
    })
  }, [])

  return (
    <SafeAreaView className="h-full w-full">
      <VStack className="px-5 py-4 flex-1" space="lg">
        <Button
          action="secondary"
          variant="outline"
          onPress={() => {
            router.navigate('/home')
          }}
        >
          <ButtonText>Voltar</ButtonText>
        </Button>
        <Heading className="mb-1">Perfil</Heading>
        <HStack className="justify-between items-center">
          <HStack space="md">
            <Avatar className="bg-primary-500">
              <AvatarFallbackText>{user?.name}</AvatarFallbackText>
              <AvatarImage
                source={{
                  uri: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
                }}
              />
            </Avatar>
            <VStack>
              <Text>{user?.name}</Text>
              <Text className="text-gray-500">{user?.email}</Text>
            </VStack>
          </HStack>
          <Pressable>
            <Icon as={ChevronRight} />
          </Pressable>
        </HStack>
        <Divider className="my-2" />
        <VStack space="lg">
          <HStack className="justify-between">
            <HStack space="md">
              <Icon as={User} />
              <Text>Informações pessoais</Text>
            </HStack>
            <Pressable onPress={() => { router.navigate('/profile/editProfile') }}>
              <Icon as={ChevronRight} />
            </Pressable>
          </HStack>

          <HStack className="justify-between">
            <HStack space="md">
              <Icon as={Settings} />
              {/* <Text>Soft skill cadastradas {profile?.software_skills.concat()}</Text> */}
            </HStack>
            <HStack space="md">
              <Icon as={Settings} />
              {/* <Text>Hard skill cadastradas {profile?.personal_skills.concat()}</Text> */}
            </HStack>

          </HStack>
          <HStack className="justify-between">
            <HStack space="md">
              <Icon as={Settings} />
              <Text>Conta</Text>
            </HStack>
            <Pressable>
              <Icon as={ChevronRight} />
            </Pressable>
          </HStack>
        </VStack>
        <Divider className="my-2" />
        <HStack>
          <VStack>
            <Text>{JSON.stringify(user)}</Text>
            <Text className="text-gray-500">{user?.email}</Text>
          </VStack>
        </HStack>

        <Text>{JSON.stringify(profile)}</Text>

        <Button
          action="secondary"
          variant="outline"
          onPress={() => {
            signOut().then(() => {
              router.navigate('/')
            })
          }}
        >
          <ButtonText>Sair</ButtonText>
        </Button>
      </VStack>

    </SafeAreaView>
  );
}

