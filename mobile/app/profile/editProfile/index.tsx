

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

import { ErrorMessage, Formik } from 'formik';

import { InputField } from "@/components/ui/input";
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
          {({ errors, touched, values, handleChange, handleBlur }) => (
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
                    <Text>{values?.name}</Text>
                    <Text className="text-gray-500">{values.email}</Text>
                  </VStack>
                </HStack>
              </HStack>

              <Divider />

              <VStack space="md">
                <Text className="font-bold">Nome</Text>

                <Text className="text-typography-500">Nome</Text>
                <InputField
                  type="text"
                  placeholder="Nome"
                  onChangeText={handleChange("name")}
                  onBlur={handleBlur('name')}

                // value={values.name}
                // onChangeText={(text) => setInputValue(text)}
                />
                <ErrorMessage name="name" component="div" className="text-red-500" />

                <Text className="font-bold">Email</Text>

                <InputField
                  className="border p-2 rounded-md border-border-50"
                  type="text"
                  placeholder="Email"
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur('email')}
                />
                <ErrorMessage name="email" component="div" className="text-red-500" />

                <InputField
                  className="border p-2 rounded-md border-border-50"
                  type="text"
                  placeholder="Telefone/Celular"
                  onChangeText={handleChange("phone")}
                  onBlur={handleBlur('phone')}
                />

                <ErrorMessage name="phone" component="div" className="text-red-500" />


                <Text className="font-bold">Escola</Text>
                <InputField
                  className="border p-2 rounded-md border-border-50"
                  type="text"
                  placeholder="Graduação"
                  onChangeText={handleChange("school")}
                  onBlur={handleBlur('school')}
                />

                <ErrorMessage name="school" component="div" className="text-red-500" />


                <HStack className="justify-between gap-4">
                  <VStack className="flex-1">
                    <Text className="font-bold">Data de Início na Escola</Text>
                    <TextInput
                      className="border p-2 rounded-md border-border-50"
                      onChangeText={handleChange("init_date_school")}
                      onBlur={handleBlur('init_date_school')}

                    />
                    <ErrorMessage name="init_date_school" component="div" className="text-red-500" />
                  </VStack>
                  <VStack className="flex-1">
                    <Text className="font-bold">Data de Término na Escola</Text>
                    <TextInput
                      className="border p-2 rounded-md border-border-50"
                      onChangeText={handleChange("end_date_school")}
                      onBlur={handleBlur('end_date_school')}
                    />
                    <ErrorMessage name="end_date_school" component="div" className="text-red-500" />
                  </VStack>
                </HStack>

                <Text className="font-bold">URL do Portfólio</Text>
                <TextInput
                  className="border p-2 rounded-md border-border-50"
                  onChangeText={handleChange("portfolio_url")}
                  onBlur={handleBlur('portfolio_url')}
                />
                <ErrorMessage name="portfolio_url" component="div" className="text-red-500" />
              </VStack>
            </View>
          )}
        </Formik>
      </VStack>

      <VStack className="px-5 py-4 flex-1" space="lg">
        <Button
          // variant="outline"
          className="mt-4"
        // onPress={handleUpdate}
        >
          <ButtonText>Salvar Alterações</ButtonText>
        </Button>
      </VStack>
    </SafeAreaView>
  );
}