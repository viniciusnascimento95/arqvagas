import { Input, InputField } from "@/components/ui/input";
import { Select, SelectBackdrop, SelectContent, SelectDragIndicator, SelectDragIndicatorWrapper, SelectIcon, SelectInput, SelectItem, SelectPortal, SelectTrigger } from "@/components/ui/select";
import { Textarea, TextareaInput } from "@/components/ui/textarea";
import { router } from "expo-router";
import { Formik } from 'formik';
import { BriefcaseIcon, ChevronDownIcon, ChevronLeftIcon, GraduationCapIcon, PenTool, PlusCircleIcon, TrashIcon } from "lucide-react-native";
import { useRef, useState } from "react";
import { Pressable, SafeAreaView, ScrollView } from "react-native";
import * as Yup from "yup";
import { Button, ButtonText } from "../../../components/ui/button";
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

export default function ExperienceScreen() {
  const { user } = useAuth();
  const scrollRef = useRef<ScrollView>(null);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [tools, setTools] = useState<Tool[]>([]);

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
        description: Yup.string().required("Descrição é obrigatória"),
      })
    ),
  });

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
          <Text className="text-xl">Experiências e Formação</Text>
        </HStack>

        <ScrollView
          ref={scrollRef}
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          automaticallyAdjustKeyboardInsets
        >
          <Formik
            initialValues={{
              experiences: experiences,
              education: education,
              tools: tools
            }}
            validationSchema={experienceSchema}
            onSubmit={(values) => {
              // Implementar salvamento
              console.log(values);
            }}
          >
            {({ values, handleChange, handleSubmit, setFieldValue }) => (
              <VStack space="xl">
                <VStack space="md" className="bg-white p-4 rounded-lg shadow-sm">
                  <HStack className="justify-between items-center">
                    <HStack space="sm" className="items-center">
                      <Icon as={BriefcaseIcon} size="sm" className="text-primary-500" />
                      <Text className="font-bold">Experiências Profissionais</Text>
                    </HStack>
                    <Pressable
                      onPress={() => {
                        setFieldValue('experiences', [
                          ...values.experiences,
                          { company: '', position: '', period: '', description: '' }
                        ]);
                      }}
                    >
                      <Icon as={PlusCircleIcon} size="sm" className="text-primary-500" />
                    </Pressable>
                  </HStack>

                  {values.experiences.map((exp, index) => (
                    <VStack key={index} space="sm" className="bg-gray-50 p-4 rounded-lg">
                      <HStack className="justify-between">
                        <Text className="font-bold">Experiência {index + 1}</Text>
                        <Pressable
                          onPress={() => {
                            const newExperiences = values.experiences.filter((_, i) => i !== index);
                            setFieldValue('experiences', newExperiences);
                          }}
                        >
                          <Icon as={TrashIcon} size="sm" className="text-red-500" />
                        </Pressable>
                      </HStack>

                      <Input>
                        <InputField
                          placeholder="Empresa"
                          value={exp.company}
                          onChangeText={(value) => {
                            const newExperiences = [...values.experiences];
                            newExperiences[index].company = value;
                            setFieldValue('experiences', newExperiences);
                          }}
                        />
                      </Input>

                      <Input>
                        <InputField
                          placeholder="Cargo"
                          value={exp.position}
                          onChangeText={(value) => {
                            const newExperiences = [...values.experiences];
                            newExperiences[index].position = value;
                            setFieldValue('experiences', newExperiences);
                          }}
                        />
                      </Input>

                      <Input>
                        <InputField
                          placeholder="Período (ex: Jan 2020 - Atual)"
                          value={exp.period}
                          onChangeText={(value) => {
                            const newExperiences = [...values.experiences];
                            newExperiences[index].period = value;
                            setFieldValue('experiences', newExperiences);
                          }}
                        />
                      </Input>

                      <Textarea>
                        <TextareaInput
                          placeholder="Descrição das atividades"
                          value={exp.description}
                          onChangeText={(value) => {
                            const newExperiences = [...values.experiences];
                            newExperiences[index].description = value;
                            setFieldValue('experiences', newExperiences);
                          }}
                        />
                      </Textarea>
                    </VStack>
                  ))}
                </VStack>

                <VStack space="md" className="bg-white p-4 rounded-lg shadow-sm">
                  <HStack className="justify-between items-center">
                    <HStack space="sm" className="items-center">
                      <Icon as={GraduationCapIcon} size="sm" className="text-primary-500" />
                      <Text className="font-bold">Formação Acadêmica</Text>
                    </HStack>
                    <Pressable
                      onPress={() => {
                        setFieldValue('education', [
                          ...values.education,
                          { institution: '', course: '', period: '', description: '' }
                        ]);
                      }}
                    >
                      <Icon as={PlusCircleIcon} size="sm" className="text-primary-500" />
                    </Pressable>
                  </HStack>

                  {values.education.map((edu, index) => (
                    <VStack key={index} space="sm" className="bg-gray-50 p-4 rounded-lg">
                      <HStack className="justify-between">
                        <Text className="font-bold">Formação {index + 1}</Text>
                        <Pressable
                          onPress={() => {
                            const newEducation = values.education.filter((_, i) => i !== index);
                            setFieldValue('education', newEducation);
                          }}
                        >
                          <Icon as={TrashIcon} size="sm" className="text-red-500" />
                        </Pressable>
                      </HStack>

                      <Input>
                        <InputField
                          placeholder="Instituição"
                          value={edu.institution}
                          onChangeText={(value) => {
                            const newEducation = [...values.education];
                            newEducation[index].institution = value;
                            setFieldValue('education', newEducation);
                          }}
                        />
                      </Input>

                      <Input>
                        <InputField
                          placeholder="Curso"
                          value={edu.course}
                          onChangeText={(value) => {
                            const newEducation = [...values.education];
                            newEducation[index].course = value;
                            setFieldValue('education', newEducation);
                          }}
                        />
                      </Input>

                      <Input>
                        <InputField
                          placeholder="Período (ex: 2018 - 2022)"
                          value={edu.period}
                          onChangeText={(value) => {
                            const newEducation = [...values.education];
                            newEducation[index].period = value;
                            setFieldValue('education', newEducation);
                          }}
                        />
                      </Input>

                      <Textarea>
                        <TextareaInput
                          placeholder="Descrição do curso"
                          value={edu.description}
                          onChangeText={(value) => {
                            const newEducation = [...values.education];
                            newEducation[index].description = value;
                            setFieldValue('education', newEducation);
                          }}
                        />
                      </Textarea>
                    </VStack>
                  ))}
                </VStack>

                <VStack space="md" className="bg-white p-4 rounded-lg shadow-sm">
                  <HStack className="justify-between items-center">
                    <HStack space="sm" className="items-center">
                      <Icon as={PenTool} size="sm" className="text-primary-500" />
                      <Text className="font-bold">Ferramentas e Tecnologias</Text>
                    </HStack>
                    <Pressable
                      onPress={() => {
                        setFieldValue('tools', [
                          ...values.tools,
                          { name: '', experienceLevel: 'basico', description: '' }
                        ]);
                      }}
                    >
                      <Icon as={PlusCircleIcon} size="sm" className="text-primary-500" />
                    </Pressable>
                  </HStack>

                  {values.tools?.map((tool, index) => (
                    <VStack key={index} space="sm" className="bg-gray-50 p-4 rounded-lg">
                      <HStack className="justify-between">
                        <Text className="font-bold">Ferramenta {index + 1}</Text>
                        <Pressable
                          onPress={() => {
                            const newTools = values.tools.filter((_, i) => i !== index);
                            setFieldValue('tools', newTools);
                          }}
                        >
                          <Icon as={TrashIcon} size="sm" className="text-red-500" />
                        </Pressable>
                      </HStack>

                      <Input>
                        <InputField
                          placeholder="Nome da ferramenta"
                          value={tool.name}
                          onChangeText={(value) => {
                            const newTools = [...values.tools];
                            newTools[index].name = value;
                            setFieldValue('tools', newTools);
                          }}
                        />
                      </Input>

                      <Select
                        value={tool.experienceLevel}
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
                  ))}
                </VStack>

                <Button
                  variant="solid"
                  className="mt-8 bg-primary-500"
                  onPress={() => handleSubmit()}
                >
                  <ButtonText>Salvar</ButtonText>
                </Button>
              </VStack>
            )}
          </Formik>
        </ScrollView>
      </VStack>
    </SafeAreaView>
  );
}