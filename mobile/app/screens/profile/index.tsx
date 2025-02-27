import { Avatar, AvatarFallbackText, AvatarImage } from "@/components/ui/avatar";
import { Button, ButtonText } from "@/components/ui/button";
import { Divider } from "@/components/ui/divider";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { useAuth } from "@/constants/AuthContext";
import { NavigationProps, RoutesNames } from "@/constants/RoutesNames";
import { useNavigation } from "expo-router";
import { ChevronRight, Settings, User } from "lucide-react-native";
import { Pressable, SafeAreaView } from "react-native";

export default function MobileProfileScreen() {
  const { signOut } = useAuth()
  const navigation = useNavigation<NavigationProps>();
  return (
    <SafeAreaView className="h-full w-full">
      <VStack className="px-5 py-4 flex-1" space="lg">
        <Heading className="mb-1">Perfil</Heading>
        <ProfileCard />
        <Divider className="my-2" />
        <PersonalInfoSection />
        <Divider className="my-2" />

        <Button
          action="secondary"
          variant="outline"
          onPress={() => {
            signOut()
            navigation.navigate(RoutesNames.LOGIN)
          }}
        >
          <ButtonText>Sair</ButtonText>
        </Button>
      </VStack>

    </SafeAreaView>
  );
}

const PersonalInfoSection = () => {
  return (
    <VStack space="lg">
      <HStack className="justify-between">
        <HStack space="md">
          <Icon as={User} />
          <Text>Informações pessoais</Text>
        </HStack>
        <Pressable>
          <Icon as={ChevronRight} />
        </Pressable>
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
  );
};

const ProfileCard = () => {
  const { user } = useAuth()
  return (
    <HStack className="justify-between items-center">
      <HStack space="md">
        <Avatar className="bg-primary-500">
          <AvatarFallbackText>{user?.name} outro nome</AvatarFallbackText>
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
  );
};
