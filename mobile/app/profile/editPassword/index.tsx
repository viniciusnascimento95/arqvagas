
import { api } from "@/services/api";
import { Avatar, AvatarFallbackText, AvatarImage } from "../../../components/ui/avatar";
import { Button, ButtonText } from "../../../components/ui/button";
import { Divider } from "../../../components/ui/divider";
import { Heading } from "../../../components/ui/heading";
import { HStack } from "../../../components/ui/hstack";
import { Icon } from "../../../components/ui/icon";
import { Text } from "../../../components/ui/text";
import { VStack } from "../../../components/ui/vstack";
import { useAuth } from "../../../constants/AuthContext";

import { router } from "expo-router";
import { ChevronLeftIcon } from "lucide-react-native";
import { useEffect, useState } from "react";
import { Pressable, SafeAreaView, ScrollView, TextInput } from "react-native";

type UserProfile = {
  id: number
  email: string
  name: string
  phone: string | null
  school: string | null
  init_date_school: string | null
  end_date_school: string | null
  software_skills: string[]
  personal_skills: string[]
  portfolio_url: string | null
  password: string
  createdAt: string
}

export default function EditPasswordScreen() {
  const { user } = useAuth()

  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [formData, setFormData] = useState({
    name: 'fa sdfas dfa s',
    email: '',
    phone: '',
    school: '',
    init_date_school: '',
    end_date_school: '',
    portfolio_url: '',
    software_skills: '',
    personal_skills: ''
  });

  useEffect(() => {
    api.get(`/user/showUserByEmail/${user?.email}`).then(response => {
      setProfile(response.data)
      
      setFormData({
        name: 'fasdfasdf',
        email: response.data.email || '',
        phone: response.data.phone || '',
        school: response.data.school || '',
        init_date_school: response.data.init_date_school || '',
        end_date_school: response.data.end_date_school || '',
        portfolio_url: response.data.portfolio_url || '',
        software_skills: response.data.software_skills.join(', ') || '',
        personal_skills: response.data.personal_skills.join(', ') || ''
      })
    }).catch(error => {
      console.log(JSON.stringify(error, null, 3))
    })
  }, [user])

  const handleUpdate = async () => {

    console.log('=>handleUpdate --->', formData);
    try {
      const updatedData = {
        ...formData,
        software_skills: formData.software_skills.split(',').map(skill => skill.trim()),
        personal_skills: formData.personal_skills.split(',').map(skill => skill.trim())
      }
      await api.put(`/user/${profile?.id}`, updatedData)
      router.back()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <SafeAreaView className="h-full w-full bg-background-0">
      <ScrollView>
        <VStack className="px-5 py-4 flex-1" space="lg">
          <HStack
            className="py-6 px-4 border-b border-border-50 bg-background-0 items-center"
            space="md"
          >
            <Pressable onPress={() => router.back()}>
              <Icon as={ChevronLeftIcon} />
            </Pressable>
            <Text className="text-xl">Voltar</Text>
          </HStack>

          <Heading className="mb-1">Editar senha </Heading>

          <HStack className="justify-between items-center mb-4">
            <HStack space="md">
              <Avatar className="bg-primary-500">
                <AvatarFallbackText>{formData.name}</AvatarFallbackText>
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
          </HStack>

          <Divider />

          <VStack space="md">
            <Text className="font-bold">Senha atual</Text>
            <TextInput
              className="border p-2 rounded-md border-border-50"
              value={formData.name}
              onChangeText={(text) => setFormData({ ...formData, name: text })}
            />

            <HStack className="justify-between gap-4">
              <VStack className="flex-1">
                <Text className="font-bold">Nova senha</Text>
                <TextInput
                  className="border p-2 rounded-md border-border-50"
                  value={formData.init_date_school}
                  onChangeText={(text) => setFormData({ ...formData, init_date_school: text })}
                />
              </VStack>
              <VStack className="flex-1">
                <Text className="font-bold">Confirmação de senha</Text>
                <TextInput
                  className="border p-2 rounded-md border-border-50"
                  value={formData.end_date_school}
                  onChangeText={(text) => setFormData({ ...formData, end_date_school: text })}
                />
              </VStack>
            </HStack>
          </VStack>
        </VStack>



      </ScrollView>
      <VStack className="flex-1 justify-end mb-10 mx-5" space="md">
        <Button
          action="secondary"
          variant="outline"
          onPress={handleUpdate}
        >
          <ButtonText>Salvar Alterações</ButtonText>
        </Button>
      </VStack>
    </SafeAreaView>
  );
}