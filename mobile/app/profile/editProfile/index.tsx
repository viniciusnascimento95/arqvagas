import { Input, InputField } from "@/components/ui/input";
import { api } from "@/services/api";
import { router } from "expo-router";
import { Formik } from 'formik';
import { BriefcaseIcon, ChevronLeftIcon, GraduationCapIcon, MailIcon, PhoneIcon, UserIcon } from "lucide-react-native";
import { Avatar, AvatarFallbackText, AvatarImage } from "../../../components/ui/avatar";
import { Button, ButtonText } from "../../../components/ui/button";
import { Divider } from "../../../components/ui/divider";
import { Heading } from "../../../components/ui/heading";
import { HStack } from "../../../components/ui/hstack";
import { Icon } from "../../../components/ui/icon";
import { Text } from "../../../components/ui/text";
import { VStack } from "../../../components/ui/vstack";
import { useAuth } from "../../../constants/AuthContext";

import { Textarea, TextareaInput } from "@/components/ui/textarea";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useRef, useState } from "react";
import { Pressable, SafeAreaView, ScrollView, View } from "react-native";
import * as Yup from "yup";
interface UserProfile {
  id: number
  email: string
  name: string
  phone: string | null
  school: string | null
  experience: string | null
  // init_date_school: string | null
  // end_date_school: string | null
  portfolio_url: string | null
}

export default function EditProfileScreen() {
  const { user, setUser } = useAuth()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const scrollRef = useRef<ScrollView>(null);

  const userProfileSchema = Yup.object().shape({
    email: Yup.string()
      .email("E-mail inválido")
      .required("E-mail é obrigatório"),
    name: Yup.string()
      .min(3, "O nome deve ter pelo menos 3 caracteres")
      .required("Nome é obrigatório"),
    phone: Yup.string()
      .nullable()
      .matches(/^\(\d{2}\)\d{5}-\d{4}$/, "Número de telefone inválido"),
    school: Yup.string().nullable(),
    experience: Yup.string().nullable(),

    // init_date_school: Yup.date()
    //   .nullable()
    //   .typeError("Data inválida"),
    // end_date_school: Yup.date()
    //   .nullable()
    //   .typeError("Data inválida")
    //   .min(
    //     Yup.ref("init_date_school"),
    //     "Data de término deve ser depois da data de início"
    //   ),
    portfolio_url: Yup.string().nullable(),
   
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
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}
          ref={scrollRef}
          keyboardShouldPersistTaps="handled"
          // KeyboardAvoidingView
          automaticallyAdjustKeyboardInsets
        >
          <Formik
            initialValues={{
              name: profile?.name || '',
              email: profile?.email || '',
              phone: profile?.phone || '',
              school: profile?.school || '',
              experience: profile?.experience || '',
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
                    <Avatar className="bg-primary-500 w-16 h-16">
                      <AvatarFallbackText>{profile?.name}</AvatarFallbackText>
                      <AvatarImage
                        source={{
                          uri: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
                        }}
                      />
                    </Avatar>
                    <VStack className="justify-center">
                      <Text className="text-lg font-bold">{values?.name}</Text>
                      <Text className="text-gray-500">{values.email}
                      </Text>
                    </VStack>
                  </HStack>
                </HStack>

                <Divider className="my-4" />

                <VStack space="md" className="bg-white p-4 rounded-lg shadow-sm">
                  <HStack space="sm" className="items-center">
                    <Icon as={UserIcon} size="sm" className="text-primary-500" />
                    <Text className="font-bold">Nome </Text>
                  </HStack>
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

                  <HStack space="sm" className="items-center mt-2">
                    <Icon as={MailIcon} size="sm" className="text-primary-500" />
                    <Text className="font-bold">Email</Text>
                  </HStack>
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

                  <HStack space="sm" className="items-center mt-2">
                    <Icon as={PhoneIcon} size="sm" className="text-primary-500" />
                    <Text className="font-bold">Celular </Text>
                  </HStack>
                  <Input>
                    <InputField
                      type="text"
                      variant="rounded"
                      value={values.phone}
                      placeholder="(XX)XXXXX-XXXX"
                      onChangeText={(value) => {
                        const cleaned = value.replace(/\D/g, '')
                        let formatted = cleaned
                        if (cleaned.length <= 11) {
                          if (cleaned.length > 2) formatted = `(${cleaned.slice(0, 2)})${cleaned.slice(2)}`
                          if (cleaned.length > 7) formatted = `(${cleaned.slice(0, 2)})${cleaned.slice(2, 7)}-${cleaned.slice(7)}`
                          setFieldValue('phone', formatted)
                        }
                      }}
                      onBlur={handleBlur('phone')}
                    />
                  </Input>
                  {errors.phone && <Text className="text-red-500">{errors.phone}</Text>}

                  <HStack space="sm" className="items-center mt-2">
                    <Icon as={GraduationCapIcon} size="sm" className="text-primary-500" />
                    <Text className="font-bold">Formação Acadêmica</Text>
                  </HStack>
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

                  <HStack space="sm" className="items-center mt-2">
                    <Icon as={BriefcaseIcon} size="sm" className="text-primary-500" />
                    <Text className="font-bold">Experiência Profissional</Text>
                  </HStack>
                  <Textarea>
                    <TextareaInput
                    placeholder="Descreva sua experiência"
                    value={values.experience}
                    onChangeText={handleChange("experience")}
                    onBlur={handleBlur('experience')}
                    onFocus={() => {
                      setTimeout(() => {
                        scrollRef.current?.scrollToEnd({ animated: true });
                      }, 300); // Pequeno delay para garantir que o teclado seja aberto antes do scroll
                    }}
                    />
                  </Textarea>
                  {errors.experience && <Text className="text-red-500">{errors.experience}</Text>}

                  <HStack space="sm" className="items-center">
                    <Icon as={UserIcon} size="sm" className="text-primary-500" />
                    <Text className="font-bold">URL do curriculo e/ou portfólio </Text>
                  </HStack>
                  <Input>
                    <InputField
                      type="text"
                      placeholder="URL do curriculo e/ou portfólio"
                      value={values.portfolio_url}
                      onChangeText={handleChange("portfolio_url")}
                      onBlur={handleBlur('portfolio_url')}
                    />
                  </Input>
                  {errors.portfolio_url && <Text className="text-red-500">{errors.portfolio_url}</Text>}

                </VStack>

                <VStack className="flex-1">
                  {isValid && <VStack className="flex-1 justify-end" space="lg">
                    <Button
                      variant="solid"
                      className="mt-8 bg-primary-500"
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
        </ScrollView>
      </VStack>
    </SafeAreaView>
  );
}