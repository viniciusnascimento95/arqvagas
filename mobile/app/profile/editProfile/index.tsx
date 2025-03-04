

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

import { Formik } from 'formik';

import { router } from "expo-router";
import { ChevronLeftIcon } from "lucide-react-native";
import { useEffect, useState } from "react";
import { Pressable, SafeAreaView, TextInput, View } from "react-native";

type UserProfile = {
  id: number
  email: string
  name: string
  phone: string | null
  school: string | null
  init_date_school: string | null
  end_date_school: string | null
  portfolio_url: string | null
}

export default function EditProfileScreen() {
  const { user } = useAuth()

  const [profile, setProfile] = useState<UserProfile | null>(null)

  useEffect(() => {
    api.get(`/user/showUserByEmail/${user?.email}`).then(response => {
      setProfile(response.data)


    }).catch(error => {
      console.log(JSON.stringify(error, null, 3))
    })
  }, [user])


  return (
    <SafeAreaView className="h-full w-full bg-background-0">

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

        <Heading className="mb-1">Editar Perfil </Heading>

        <Formik
          initialValues={{
            name: profile?.name,
            email: profile?.email,
            phone: profile?.phone,
            school: profile?.school,
            init_date_school: profile?.init_date_school,
            end_date_school: profile?.end_date_school,
            portfolio_url: profile?.portfolio_url,
          }}
          enableReinitialize
          onSubmit={values => {
            // same shape as initial values
            console.log(values);
          }}
        >
          {({ errors, touched, values, handleChange }) => (
            <View>

              <HStack className="justify-between items-center mb-4">
                <HStack space="md">
                  <Avatar className="bg-primary-500">
                    <AvatarFallbackText>{profile?.name}</AvatarFallbackText>
                    <AvatarImage
                      source={{
                        uri: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
                      }}
                    />
                  </Avatar>
                  <VStack>
                    <Text>{user?.name}</Text>
                    <Text className="text-gray-500">{values.name}</Text>
                  </VStack>
                </HStack>
              </HStack>

              <Divider />

              <VStack space="md">
                <Text className="font-bold">Nome</Text>
                {/* <InputField

                  className="border p-2 rounded-md border-border-50"
                  onChange={handleChange}
                // value={formData.name}
                // onChangeText={(text) => setFormData({ ...formData, name: text })}
                /> */}

                <Text className="font-bold">Email</Text>
                <TextInput
                  disableFullscreenUI
                  className="border p-2 rounded-md border-border-50"
                // value={formData.email}
                // onChangeText={(text) => setFormData({ ...formData, email: text })}
                />

                <Text className="font-bold">Telefone</Text>
                <TextInput
                  className="border p-2 rounded-md border-border-50"
                // value={formData.phone}
                // onChangeText={(text) => setFormData({ ...formData, phone: text })}
                />

                <Text className="font-bold">Escola</Text>
                <TextInput
                  className="border p-2 rounded-md border-border-50"
                // value={formData.school}
                // onChangeText={(text) => setFormData({ ...formData, school: text })}
                />

                <HStack className="justify-between gap-4">
                  <VStack className="flex-1">
                    <Text className="font-bold">Data de Início na Escola</Text>
                    <TextInput
                      className="border p-2 rounded-md border-border-50"
                    // value={formData.init_date_school}
                    // onChangeText={(text) => setFormData({ ...formData, init_date_school: text })}
                    />
                  </VStack>
                  <VStack className="flex-1">
                    <Text className="font-bold">Data de Término na Escola</Text>
                    <TextInput
                      className="border p-2 rounded-md border-border-50"
                    // value={formData.end_date_school}
                    // onChangeText={(text) => setFormData({ ...formData, end_date_school: text })}
                    />
                  </VStack>
                </HStack>

                <Text className="font-bold">URL do Portfólio</Text>
                <TextInput
                  className="border p-2 rounded-md border-border-50"
                // value={formData.portfolio_url}
                // onChangeText={(text) => setFormData({ ...formData, portfolio_url: text })}
                />
              </VStack>
            </View>
          )}
        </Formik>
      </VStack>

      <VStack className="px-5 py-4 flex-1" space="lg">
        <Button
          variant="outline"
          className="mt-4"
        // onPress={handleUpdate}
        >
          <ButtonText>Salvar Alterações</ButtonText>
        </Button>
      </VStack>
    </SafeAreaView>
  );
}