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
import { ChevronLeftIcon, EyeIcon, EyeOffIcon } from "lucide-react-native";
import { useEffect, useState } from "react";
import { ActivityIndicator, Pressable, SafeAreaView, View } from "react-native";
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
  const [loading, setLoading] = useState(false)
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  useEffect(() => {
    setLoading(true)
    api.get(`/user/showUserByEmail/${user?.email}`).then(response => {
      setProfile(response.data)
    }).catch(error => {
      // toast.show({
      //   title: "Erro",
      //   description: "Não foi possível carregar seus dados",
      //   type: "error"
      // })
      console.log(JSON.stringify(error, null, 3))
    }).finally(() => {
      setLoading(false)
    })
  }, [user])

  if (loading) {
    return (
      <SafeAreaView className="h-full w-full bg-background-0 items-center justify-center">
        <ActivityIndicator size="large" />
      </SafeAreaView>
    )
  }

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
              .matches(/[0-9]/, 'A senha deve conter pelo menos um número')
              // .matches(/[a-z]/, 'A senha deve conter pelo menos uma letra minúscula')
              // .matches(/[A-Z]/, 'A senha deve conter pelo menos uma letra maiúscula')
              // .matches(/[!@#$%^&*]/, 'A senha deve conter pelo menos um caractere especial')
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
            setLoading(true)
            api.put(`/auth/${profile?.id}/change-password`, {
              currentPassword: values.password,
              newPassword: values.newPassword,
            }).then(response => {
              if (response.status === 200) {
                // toast.show({
                //   title: "Sucesso",
                //   description: "Senha atualizada com sucesso!",
                //   type: "success"
                // })
                router.push('/home')
              }
            }).catch(error => {
              console.log('=>error --->', error);
              // toast.show({
              //   title: "Erro",
              //   description: error.response?.data?.message || "Erro ao atualizar senha",
              //   type: "error"
              // })
            }).finally(() => {
              setLoading(false)
              setSubmitting(false)
              resetForm()
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
              <VStack space="md" className="mt-6">
                <Text className="font-bold">Senha atual</Text>
                <Input>
                  <InputField
                    value={values.password}
                    type={showCurrentPassword ? "text" : "password"}
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                    placeholder="Digite sua senha atual"
                  />
                  <Pressable onPress={() => setShowCurrentPassword(!showCurrentPassword)} className="px-3">
                    <Icon as={showCurrentPassword ? EyeOffIcon : EyeIcon} size="md" />
                  </Pressable>
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
                        type={showNewPassword ? "text" : "password"}
                        onChangeText={handleChange("newPassword")}
                        onBlur={handleBlur("newPassword")}
                        placeholder="Digite sua nova senha"
                      />
                      <Pressable onPress={() => setShowNewPassword(!showNewPassword)} className="px-3">
                        <Icon as={showNewPassword ? EyeOffIcon : EyeIcon} size="md" />
                      </Pressable>
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
                        type={showConfirmPassword ? "text" : "password"}
                        onChangeText={handleChange("confirmPassword")}
                        onBlur={handleBlur("confirmPassword")}
                        placeholder="Confirme sua nova senha"
                      />
                      <Pressable onPress={() => setShowConfirmPassword(!showConfirmPassword)} className="px-3">
                        <Icon as={showConfirmPassword ? EyeOffIcon : EyeIcon} size="md" />
                      </Pressable>
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
                    action="primary"
                    disabled={isSubmitting || loading}
                    onPress={() => handleSubmit()}
                  >
                    {loading || isSubmitting ? (
                      <ActivityIndicator color="white" />
                    ) : (
                      <ButtonText>Salvar Alterações</ButtonText>
                    )}
                  </Button>
                </VStack>}
              </VStack>
            </View>
          )}
        </Formik>
      </VStack>
    </SafeAreaView>
  );
}