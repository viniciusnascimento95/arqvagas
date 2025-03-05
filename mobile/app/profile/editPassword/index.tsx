import { Input, InputField } from "@/components/ui/input";
import { Avatar, AvatarFallbackText, AvatarImage } from "../../../components/ui/avatar";
import { Button, ButtonText } from "../../../components/ui/button";
import { Divider } from "../../../components/ui/divider";
import { Heading } from "../../../components/ui/heading";
import { HStack } from "../../../components/ui/hstack";
import { Icon } from "../../../components/ui/icon";
import { Text } from "../../../components/ui/text";
import { VStack } from "../../../components/ui/vstack";
import { useAuth } from "../../../constants/AuthContext";

import { api } from "@/services/api";
import { router } from "expo-router";
import { Formik } from "formik";
import { ChevronLeftIcon } from "lucide-react-native";
import { useEffect, useState } from "react";
import { Pressable, SafeAreaView, View } from "react-native";
import * as yup from "yup";


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

export default function EditPasswordScreen() {
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
        <Heading className="mb-1">Editar Senha </Heading>
        <Formik
          enableReinitialize
          validationSchema={yup.object().shape({
            password: yup.string().required('Senha atual é obrigatória'),
            newPassword: yup
              .string()
              .min(8, 'A nova senha deve ter no mínimo 8 caracteres')
              .required('Nova senha é obrigatória'),
            confirmPassword: yup
              .string()
              .oneOf([yup.ref('newPassword')], 'As senhas não conferem')
              .required('Confirmação de senha é obrigatória'),
          })}
          initialValues={{
            password: '',
            newPassword: '',
            confirmPassword: '',
          }}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            api.put(`/auth/${profile?.id}/change-password`, {
              newPassword: values.newPassword,
            }).then(response => {
              if (response.status === 200) {
                alert('Senha atualizado com sucesso!')
                router.push('/home')
              }
              setSubmitting(false);
              resetForm();
            })
          }}

        >
          {({ values, isValid, handleChange, handleBlur, handleSubmit, isSubmitting, errors }) => (
            <View className="flex-1">
              <HStack className="justify-between items-center mb-4">
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
              </HStack>
              <Divider />
              <VStack space="md">
                <Text className="font-bold">Senha atual</Text>
                <Input>
                  <InputField
                    value={values.password}
                    type="password"
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                    placeholder="Digite sua senha atual"
                  />
                </Input>
                {errors.password && (
                  <Text className="text-red-500">{errors.password}</Text>
                )}

                <HStack className="justify-between gap-4">
                  <VStack className="flex-1">
                    <Text className="font-bold">Nova senha</Text>
                    <Input>
                      <InputField
                        value={values.newPassword}
                        type="password"
                        onChangeText={handleChange("newPassword")}
                        onBlur={handleBlur("newPassword")}
                        placeholder="Digite sua nova senha"
                      />
                    </Input>
                    {errors.newPassword && (
                      <Text className="text-red-500">{errors.newPassword}</Text>
                    )}
                  </VStack>
                  <VStack className="flex-1">
                    <Text className="font-bold">Confirmação de senha</Text>
                    <Input>
                      <InputField
                        value={values.confirmPassword}
                        type="password"
                        onChangeText={handleChange("confirmPassword")}
                        onBlur={handleBlur("confirmPassword")}
                        placeholder="Digite sua nova senha"
                      />
                    </Input>
                    {errors.confirmPassword && (
                      <Text className="text-red-500">{errors.confirmPassword}</Text>
                    )}
                  </VStack>
                </HStack>
              </VStack>

              <VStack className="flex-1">
                {isValid && values.password != '' && <VStack className="flex-1 justify-end mt-10" space="lg">
                  <Button
                    action="secondary"
                    variant="outline"
                    disabled={isSubmitting}
                    onPress={() => handleSubmit()}
                  >
                    <ButtonText>Salvar Alterações</ButtonText>
                  </Button>
                </VStack>}
              </VStack>
            </View>
          )}
        </Formik>
      </VStack>
    </SafeAreaView >
  );
}