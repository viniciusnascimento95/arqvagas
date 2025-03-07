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

import { Input, InputField } from "@/components/ui/input";
import { router } from "expo-router";
import { ChevronLeftIcon } from "lucide-react-native";
import { useEffect, useState } from "react";
import { Pressable, SafeAreaView, TextInput, View } from "react-native";
import * as Yup from "yup";

import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePickerModal from "react-native-modal-datetime-picker";

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
  const { user, setUser } = useAuth()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [isDatePickerVisibleInit, setDatePickerVisibilityInit] = useState(false)
  const [isDatePickerVisibleEnd, setDatePickerVisibilityEnd] = useState(false)

  const userProfileSchema = Yup.object().shape({

    email: Yup.string()
      .email("E-mail inválido")
      .required("E-mail é obrigatório"),
    name: Yup.string()
      .min(3, "O nome deve ter pelo menos 3 caracteres")
      .required("Nome é obrigatório"),
    phone: Yup.string()
      .nullable()
      .matches(/^\(\d{2}\)\d{5}-\d{4}$/, "Número de telefone inválido"), // Formato: (XX)XXXXX-XXXX
    school: Yup.string().nullable(),
    init_date_school: Yup.date()
      .nullable()
      .typeError("Data inválida"),
    end_date_school: Yup.date()
      .nullable()
      .typeError("Data inválida")
      .min(
        Yup.ref("init_date_school"),
        "Data de término deve ser depois da data de início"
      ),
    portfolio_url: Yup.string()
      .nullable()
      .url("URL inválida"), // Garante que seja uma URL válida
  });

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
            name: profile?.name || '',
            email: profile?.email || '',
            phone: profile?.phone || '',
            school: profile?.school || '',
            init_date_school: profile?.init_date_school || '',
            end_date_school: profile?.end_date_school || '',
            portfolio_url: profile?.portfolio_url || '',
          }}
          validationSchema={userProfileSchema}
          enableReinitialize
          onSubmit={(values, { setSubmitting, resetForm }) => {
            api.patch(`/user/${profile?.id}`, values).then(response => {
              if (response.status === 200) {
                AsyncStorage.removeItem("@user");
                alert('Perfil atualizado com sucesso!')
                router.push('/home')
                setUser(values)
                AsyncStorage.setItem("@user", JSON.stringify(values));
              }
              setSubmitting(false);
              resetForm({});
            })
          }}
        >
          {({ values, isValid, handleChange, handleBlur, handleSubmit, isSubmitting, setFieldValue, errors }) => (
            <View className="flex-1">
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
                <Text className="font-bold">Nome </Text>
                <Input>
                  <InputField
                    type="text"
                    placeholder="Nome"
                    value={values.name}
                    onChangeText={handleChange("name")}
                    onBlur={handleBlur('name')}
                  />
                </Input>
                {errors.name && <Text className="text-red-500">{errors.name}</Text>}

                <Text className="font-bold">Email</Text>
                <Input>
                  <InputField
                    type="text"
                    variant="rounded"
                    value={values.email}
                    placeholder="Email"
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur('email')}
                  />
                </Input>
                {errors.email && <Text className="text-red-500">{errors.email}</Text>}

                <Text className="font-bold">Celular </Text>
                <Input>
                  <InputField
                    type="text"
                    variant="rounded"
                    value={values.phone}
                    placeholder="Telefone/Celular"
                    onChangeText={(value) => {
                      const cleaned = value.replace(/\D/g, '')
                      let formatted = cleaned
                      if (cleaned.length <= 11) {
                        if (cleaned.length > 2) formatted = `(${cleaned.slice(0, 2)})${cleaned.slice(2)}`
                        if (cleaned.length > 7) formatted = `(${cleaned.slice(0, 2)})${cleaned.slice(2, 7)}-${cleaned.slice(7)}`
                        setFieldValue('phone', formatted)
                      }
                    }}
                    // onChangeText={handleChange("phone")}
                    onBlur={handleBlur('phone')}
                  />
                </Input>

                {errors.phone && <Text className="text-red-500">{errors.phone}</Text>}

                <Text className="font-bold">Graduação</Text>
                <Input>
                  <InputField
                    type="text"
                    variant="rounded"
                    placeholder="Graduação"
                    value={values.school}
                    onChangeText={handleChange("school")}
                    onBlur={handleBlur('school')}
                  />
                </Input>
                {errors.school && <Text className="text-red-500">{errors.school}</Text>}


                <HStack className="justify-between gap-4">
                  <VStack className="flex-1">
                    <Text className="font-bold">Data de Início</Text>
                    <TextInput
                      className="border p-2 rounded-md border-border-50"
                      onChangeText={handleChange("init_date_school")}
                      onBlur={handleBlur('init_date_school')}
                      value={values.init_date_school ? new Date(values.init_date_school).toLocaleDateString('pt-BR') : ''}
                      onPress={() => setDatePickerVisibilityInit(true)}
                      editable={false}
                    />

                    <DateTimePickerModal
                      isVisible={isDatePickerVisibleInit}
                      mode="date"
                      locale="pt-BR"
                      confirmTextIOS="Confirmar"
                      cancelTextIOS="Cancelar"
                      onConfirm={(value) => {
                        setFieldValue('init_date_school', value)
                        setDatePickerVisibilityInit(false)
                      }}
                      onCancel={() => setDatePickerVisibilityInit(false)}
                    />
                    {errors.init_date_school && <Text className="text-red-500">{errors.init_date_school}</Text>}

                  </VStack>
                  <VStack className="flex-1">
                    <Text className="font-bold">Data de Término</Text>
                    <DateTimePickerModal
                      isVisible={isDatePickerVisibleEnd}
                      mode="date"
                      locale="pt-BR"
                      confirmTextIOS="Confirmar"
                      cancelTextIOS="Cancelar"
                      onConfirm={(value) => {
                        setFieldValue('end_date_school', value)
                        setDatePickerVisibilityEnd(false)
                      }}
                      onCancel={() => setDatePickerVisibilityEnd(false)}
                    />
                    <TextInput
                      className="border p-2 rounded-md border-border-50"
                      onChangeText={handleChange("end_date_school")}
                      onBlur={handleBlur('end_date_school')}
                      onPress={() => setDatePickerVisibilityEnd(true)}
                      editable={false}
                      value={values.end_date_school ? new Date(values.end_date_school).toLocaleDateString('pt-BR') : ''}
                    />

                    {errors.end_date_school && <Text className="text-red-500">{errors.end_date_school}</Text>}
                  </VStack>
                </HStack>

                <Text className="font-bold">URL do Portfólio</Text>
                <TextInput
                  className="border p-2 rounded-md border-border-50"
                  onChangeText={handleChange("portfolio_url")}
                  onBlur={handleBlur('portfolio_url')}
                  value={values.portfolio_url}
                />
                {errors.portfolio_url && <Text className="text-red-500">{errors.portfolio_url}</Text>}

              </VStack>
              <VStack className="flex-1">
                {isValid && <VStack className="flex-1 justify-end" space="lg">
                  <Button
                    variant="outline"
                    className="mt-5"
                    onPress={() => handleSubmit()}
                    disabled={isSubmitting}
                  >
                    <ButtonText>Salvar Alterações</ButtonText>
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