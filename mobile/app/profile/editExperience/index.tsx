import { Input, InputField } from "@/components/ui/input";
import { Select, SelectBackdrop, SelectContent, SelectDragIndicator, SelectDragIndicatorWrapper, SelectIcon, SelectInput, SelectItem, SelectPortal, SelectTrigger } from "@/components/ui/select";
import { Textarea, TextareaInput } from "@/components/ui/textarea";
import { api } from "@/services/api";
import { router } from "expo-router";
import { Formik } from 'formik';
import { BriefcaseIcon, Building2Icon, CalendarIcon, ChevronDownIcon, ChevronLeftIcon, GraduationCapIcon, PenTool, PlusCircleIcon, SchoolIcon, TrashIcon, UserIcon } from "lucide-react-native";
import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Pressable, SafeAreaView, ScrollView } from "react-native";
import * as Yup from "yup";
import { Button, ButtonText } from "../../../components/ui/button";
import { Divider } from "../../../components/ui/divider";
import { HStack } from "../../../components/ui/hstack";
import { Icon } from "../../../components/ui/icon";
import { Text } from "../../../components/ui/text";
import { VStack } from "../../../components/ui/vstack";
import { useAuth } from "../../../constants/AuthContext";

interface Experience {
  company: string;
  position: string;
  period: string;
  description: string;
}

interface Education {
  institution: string;
  course: string;
  period: string;
  description: string;
}

interface Tool {
  name: string;
  experienceLevel: string;
  description: string;
}


interface UserProfile {
  id: number
  email: string
  name: string
  phone: string | null
  portfolio_url: string | null
  street: string | null
  city: string | null
  state: string | null
  zipcode: string | null
}

export default function ExperienceScreen() {
  const { user } = useAuth();
  const scrollRef = useRef<ScrollView>(null);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<UserProfile | null>(null)

  useEffect(() => {

    if (user?.email) {
      api.get(`/user/showUserByEmail/${user.email}`).then(response => {
        setProfile(response.data)
        const userData = response.data;
        setExperiences(userData.experiences || []);
        setEducation(userData.education || []);
        setTools(userData.tools || []);
      }).catch(error => {
        console.log('Error loading user data:', error);
      }).finally(() => {
        setLoading(false);
      });
    }
  }, [user]);

  const experienceSchema = Yup.object().shape({
    experiences: Yup.array().of(
      Yup.object().shape({
        company: Yup.string().required("Empresa é obrigatória"),
        position: Yup.string().required("Cargo é obrigatório"),
        period: Yup.string().required("Período é obrigatório"),
        description: Yup.string().required("Descrição é obrigatória"),
      })
    ),
    education: Yup.array().of(
      Yup.object().shape({
        institution: Yup.string().required("Instituição é obrigatória"),
        course: Yup.string().required("Curso é obrigatório"),
        period: Yup.string().required("Período é obrigatório"),
        description: Yup.string().required("Descrição é obrigatória"),
      })
    ),
    tools: Yup.array().of(
      Yup.object().shape({
        name: Yup.string().required("Nome da ferramenta é obrigatório"),
        experienceLevel: Yup.string().required("Nível de experiência é obrigatório"),
        description: Yup.string().nullable(),
      })
    ),
  });

  if (loading) {
    return (
      <SafeAreaView className="h-full w-full bg-background-0 items-center justify-center">
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="h-full w-full bg-background-0">
      <VStack className="flex-1">
        {/* Header */}
        <HStack
          className="py-4 px-4 border-b border-border-50 bg-background-0 items-center"
          space="md"
        >
          <Pressable
            onPress={() => router.back()}
            className="p-2 rounded-full bg-gray-50"
          >
            <Icon as={ChevronLeftIcon} className="text-gray-600" />
          </Pressable>
          <Text className="text-xl font-semibold">Experiências e Formação</Text>
        </HStack>


        <Formik
          initialValues={{
            experiences: experiences,
            education: education,
            tools: tools
          }}
          validationSchema={experienceSchema}
          enableReinitialize
          onSubmit={async (values, { setSubmitting }) => {
            try {
              const response = await api.put(`/user/${profile?.id}/updateProfessional`, {
                experiences: values.experiences,
                education: values.education,
                tools: values.tools
              });

              if (response.status === 200) {
                alert('Dados salvos com sucesso!');
                router.back();
              }
            } catch (error) {
              console.error('Error saving data:', error);
              alert('Erro ao salvar os dados. Tente novamente.');
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ values, handleSubmit, setFieldValue, isSubmitting }) => (
            <VStack space="xl" className="py-4">
              <ScrollView
                ref={scrollRef}
                contentContainerStyle={{ flexGrow: 1, paddingBottom: 150, gap: 6 }}
                keyboardShouldPersistTaps="handled"
                automaticallyAdjustKeyboardInsets
                className="px-4"
              >
                {/* Experiences Section */}
                <VStack space="md" className="bg-white p-4 rounded-xl shadow-sm">
                  <HStack className="justify-between items-center">
                    <HStack space="sm" className="items-center">
                      <Icon as={BriefcaseIcon} size="md" className="text-primary-500" />
                      <Text className="font-bold text-lg">Experiências Profissionais</Text>
                    </HStack>
                    <Pressable
                      onPress={() => {
                        setFieldValue('experiences', [
                          ...values.experiences,
                          { company: '', position: '', period: '', description: '' }
                        ]);
                      }}
                      className="bg-primary-50 p-2 rounded-full"
                    >
                      <Icon as={PlusCircleIcon} size="sm" className="text-primary-500" />
                    </Pressable>
                  </HStack>

                  {values.experiences.map((exp, index) => (
                    <VStack key={index} space="sm" className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                      <HStack className="justify-between items-center">
                        <HStack space="sm" className="items-center">
                          <Icon as={UserIcon} size="sm" className="text-gray-500" />
                          <Text className="font-bold text-gray-700">Experiência {index + 1}</Text>
                        </HStack>
                        <Pressable
                          onPress={() => {
                            const newExperiences = values.experiences.filter((_, i) => i !== index);
                            setFieldValue('experiences', newExperiences);
                          }}
                          className="bg-red-50 p-2 rounded-full"
                        >
                          <Icon as={TrashIcon} size="sm" className="text-red-500" />
                        </Pressable>
                      </HStack>

                      <Divider className="my-2" />

                      <VStack space="sm">
                        <HStack space="sm" className="items-center">
                          <Icon as={Building2Icon} size="sm" className="text-gray-500" />
                          <Text className="text-sm text-gray-600">Empresa</Text>
                        </HStack>
                        <Input>
                          <InputField
                            placeholder="Nome da empresa"
                            value={exp.company}
                            onChangeText={(value) => {
                              const newExperiences = [...values.experiences];
                              newExperiences[index].company = value;
                              setFieldValue('experiences', newExperiences);
                            }}
                          />
                        </Input>
                      </VStack>

                      <VStack space="sm">
                        <HStack space="sm" className="items-center">
                          <Icon as={BriefcaseIcon} size="sm" className="text-gray-500" />
                          <Text className="text-sm text-gray-600">Cargo</Text>
                        </HStack>
                        <Input>
                          <InputField
                            placeholder="Seu cargo na empresa"
                            value={exp.position}
                            onChangeText={(value) => {
                              const newExperiences = [...values.experiences];
                              newExperiences[index].position = value;
                              setFieldValue('experiences', newExperiences);
                            }}
                          />
                        </Input>
                      </VStack>

                      <VStack space="sm">
                        <HStack space="sm" className="items-center">
                          <Icon as={CalendarIcon} size="sm" className="text-gray-500" />
                          <Text className="text-sm text-gray-600">Período</Text>
                        </HStack>
                        <Input>
                          <InputField
                            placeholder="Ex: Jan 2020 - Atual"
                            value={exp.period}
                            onChangeText={(value) => {
                              const newExperiences = [...values.experiences];
                              newExperiences[index].period = value;
                              setFieldValue('experiences', newExperiences);
                            }}
                          />
                        </Input>
                      </VStack>

                      <VStack space="sm">
                        <HStack space="sm" className="items-center">
                          <Icon as={PenTool} size="sm" className="text-gray-500" />
                          <Text className="text-sm text-gray-600">Descrição</Text>
                        </HStack>
                        <Textarea>
                          <TextareaInput
                            placeholder="Descreva suas principais atividades e conquistas"
                            value={exp.description}
                            onChangeText={(value) => {
                              const newExperiences = [...values.experiences];
                              newExperiences[index].description = value;
                              setFieldValue('experiences', newExperiences);
                            }}
                          />
                        </Textarea>
                      </VStack>
                    </VStack>
                  ))}
                </VStack>

                {/* Education Section */}
                <VStack space="md" className="bg-white p-4 rounded-xl shadow-sm">
                  <HStack className="justify-between items-center">
                    <HStack space="sm" className="items-center">
                      <Icon as={GraduationCapIcon} size="md" className="text-primary-500" />
                      <Text className="font-bold text-lg">Formação Acadêmica</Text>
                    </HStack>
                    <Pressable
                      onPress={() => {
                        setFieldValue('education', [
                          ...values.education,
                          { institution: '', course: '', period: '', description: '' }
                        ]);
                      }}
                      className="bg-primary-50 p-2 rounded-full"
                    >
                      <Icon as={PlusCircleIcon} size="sm" className="text-primary-500" />
                    </Pressable>
                  </HStack>

                  {values.education.map((edu, index) => (
                    <VStack key={index} space="sm" className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                      <HStack className="justify-between items-center">
                        <HStack space="sm" className="items-center">
                          <Icon as={SchoolIcon} size="sm" className="text-gray-500" />
                          <Text className="font-bold text-gray-700">Formação {index + 1}</Text>
                        </HStack>
                        <Pressable
                          onPress={() => {
                            const newEducation = values.education.filter((_, i) => i !== index);
                            setFieldValue('education', newEducation);
                          }}
                          className="bg-red-50 p-2 rounded-full"
                        >
                          <Icon as={TrashIcon} size="sm" className="text-red-500" />
                        </Pressable>
                      </HStack>

                      <Divider className="my-2" />

                      <VStack space="sm">
                        <HStack space="sm" className="items-center">
                          <Icon as={Building2Icon} size="sm" className="text-gray-500" />
                          <Text className="text-sm text-gray-600">Instituição</Text>
                        </HStack>
                        <Input>
                          <InputField
                            placeholder="Nome da instituição"
                            value={edu.institution}
                            onChangeText={(value) => {
                              const newEducation = [...values.education];
                              newEducation[index].institution = value;
                              setFieldValue('education', newEducation);
                            }}
                          />
                        </Input>
                      </VStack>

                      <VStack space="sm">
                        <HStack space="sm" className="items-center">
                          <Icon as={GraduationCapIcon} size="sm" className="text-gray-500" />
                          <Text className="text-sm text-gray-600">Curso</Text>
                        </HStack>
                        <Input>
                          <InputField
                            placeholder="Nome do curso"
                            value={edu.course}
                            onChangeText={(value) => {
                              const newEducation = [...values.education];
                              newEducation[index].course = value;
                              setFieldValue('education', newEducation);
                            }}
                          />
                        </Input>
                      </VStack>

                      <VStack space="sm">
                        <HStack space="sm" className="items-center">
                          <Icon as={CalendarIcon} size="sm" className="text-gray-500" />
                          <Text className="text-sm text-gray-600">Período</Text>
                        </HStack>
                        <Input>
                          <InputField
                            placeholder="Ex: 2018 - 2022"
                            value={edu.period}
                            onChangeText={(value) => {
                              const newEducation = [...values.education];
                              newEducation[index].period = value;
                              setFieldValue('education', newEducation);
                            }}
                          />
                        </Input>
                      </VStack>

                      <VStack space="sm">
                        <HStack space="sm" className="items-center">
                          <Icon as={PenTool} size="sm" className="text-gray-500" />
                          <Text className="text-sm text-gray-600">Descrição</Text>
                        </HStack>
                        <Textarea>
                          <TextareaInput
                            placeholder="Descreva o curso e suas principais atividades"
                            value={edu.description}
                            onChangeText={(value) => {
                              const newEducation = [...values.education];
                              newEducation[index].description = value;
                              setFieldValue('education', newEducation);
                            }}
                          />
                        </Textarea>
                      </VStack>
                    </VStack>
                  ))}
                </VStack>

                {/* Tools Section */}
                <VStack space="md" className="bg-white p-4 rounded-xl shadow-sm">
                  <HStack className="justify-between items-center">
                    <HStack space="sm" className="items-center">
                      <Icon as={PenTool} size="md" className="text-primary-500" />
                      <Text className="font-bold text-lg">Ferramentas e Tecnologias</Text>
                    </HStack>
                    <Pressable
                      onPress={() => {
                        setFieldValue('tools', [
                          ...values.tools,
                          { name: '', experienceLevel: 'basico', description: '' }
                        ]);
                      }}
                      className="bg-primary-50 p-2 rounded-full"
                    >
                      <Icon as={PlusCircleIcon} size="sm" className="text-primary-500" />
                    </Pressable>
                  </HStack>

                  {values.tools?.map((tool, index) => (
                    <VStack key={index} space="sm" className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                      <HStack className="justify-between items-center">
                        <HStack space="sm" className="items-center">
                          <Icon as={PenTool} size="sm" className="text-gray-500" />
                          <Text className="font-bold text-gray-700">Ferramenta {index + 1}</Text>
                        </HStack>
                        <Pressable
                          onPress={() => {
                            const newTools = values.tools.filter((_, i) => i !== index);
                            setFieldValue('tools', newTools);
                          }}
                          className="bg-red-50 p-2 rounded-full"
                        >
                          <Icon as={TrashIcon} size="sm" className="text-red-500" />
                        </Pressable>
                      </HStack>

                      <Divider className="my-2" />

                      <VStack space="sm">
                        <HStack space="sm" className="items-center">
                          <Icon as={PenTool} size="sm" className="text-gray-500" />
                          <Text className="text-sm text-gray-600">Nome da Ferramenta</Text>
                        </HStack>
                        <Input>
                          <InputField
                            placeholder="Nome da ferramenta ou tecnologia"
                            value={tool.name}
                            onChangeText={(value) => {
                              const newTools = [...values.tools];
                              newTools[index].name = value;
                              setFieldValue('tools', newTools);
                            }}
                          />
                        </Input>
                      </VStack>

                      {tool.experienceLevel && (
                        <VStack space="sm">
                          <HStack space="sm" className="items-center">
                            <Icon as={UserIcon} size="sm" className="text-gray-500" />
                            <Text className="text-sm text-gray-600">Nível de Experiência</Text>
                          </HStack>
                          <Select
                            selectedValue={tool.experienceLevel}
                            onValueChange={(value: string) => {
                              const newTools = [...values.tools];
                              newTools[index].experienceLevel = value;
                              setFieldValue('tools', newTools);
                            }}
                          >
                            <SelectTrigger variant="outline" size="md">
                              <SelectInput placeholder="Selecione o nível de experiência" />
                              <SelectIcon className="mr-3" as={ChevronDownIcon} />
                            </SelectTrigger>

                            <SelectPortal>
                              <SelectBackdrop />
                              <SelectContent>
                                <SelectDragIndicatorWrapper>
                                  <SelectDragIndicator />
                                </SelectDragIndicatorWrapper>

                                <SelectItem label="Básico" value="basico" />
                                <SelectItem label="Intermediário" value="intermediario" />
                                <SelectItem label="Avançado" value="avancado" />
                              </SelectContent>
                            </SelectPortal>
                          </Select>
                        </VStack>
                      )}
                    </VStack>
                  ))}
                </VStack>

                {/* Fixed Save Button */}
                <VStack className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
                  <Button
                    variant="solid"
                    className="bg-primary-500"
                    onPress={() => handleSubmit()}
                    disabled={isSubmitting}
                  >
                    <ButtonText className="text-white font-semibold">
                      {isSubmitting ? 'Salvando...' : 'Salvar Alterações'}
                    </ButtonText>
                  </Button>
                </VStack>
              </ScrollView>
            </VStack>
          )}
        </Formik>

      </VStack>
    </SafeAreaView>
  );
}