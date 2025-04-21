import { Button, ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { Textarea, TextareaInput } from "@/components/ui/textarea";
import { VStack } from "@/components/ui/vstack";
import { useAuth } from "@/constants/AuthContext";
import { api } from "@/services/api";
import { router } from "expo-router";
import { useLocalSearchParams } from "expo-router/build/hooks";
import * as WebBrowser from 'expo-web-browser';
import { Formik } from "formik";
import { BriefcaseIcon, CalendarIcon, CheckCircleIcon, ChevronLeftIcon, ClockIcon, InfoIcon, MapPinIcon, PenToolIcon, StarIcon, XIcon } from "lucide-react-native";
import { useEffect, useState } from "react";
import { Modal, Platform, Pressable, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
export interface CompanyInfo {
  industry: string;
  name: string;
}

interface ApplicationInfo {
  userId: number
}

interface ToolsAndSoftware {
  tool: string;
  level: string;
}

export interface JobListing {
  id: number;
  jobTitle: string;
  jobDescription: string;
  managedJob: string;
  externalUrl: string;
  location: string;
  experienceLevel: string;
  contractType: string;
  workSchedule: string;
  isAvailable: boolean;
  availablePositions: number;
  applicationDeadline: string;
  expectedStartDate: string;
  publicationDate: string;
  createdAt: string;
  updatedAt: string;
  companyInfo: CompanyInfo;
  mainResponsibilities: string[];
  requirements: string[];
  benefits: string[];
  toolsAndSoftware: ToolsAndSoftware[];
  Application: ApplicationInfo[];
}

import { Buffer } from 'buffer';

export default function OportunityDetailPage() {
  const { id } = useLocalSearchParams()
  const { token } = useAuth()

  //@ts-ignore
  const decodeToken = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString())
  const [oportunity, setOportunity] = useState<JobListing>({} as JobListing);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    api.get(`oportunity/${id}`).then(response => {
      setOportunity(response.data)
    })
  }, [id])

  const hasUserApplied = () => {
    return oportunity.Application?.some(
      application => application.userId === decodeToken.sub
    );
  };

  const handleOpenURL = async (url: string) => {
    await WebBrowser.openBrowserAsync(url);
  };

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
        <Heading className="mb-1">{oportunity.jobTitle}</Heading>
        <ScrollView showsVerticalScrollIndicator={false} className="flex-1 px-5 py-4">
          <VStack space="xl">
            <HStack space="md" className="justify-center items-center bg-gray-50 p-4 rounded-xl">
              <VStack className="items-center">
                <Text className="text-xl font-bold">{oportunity.companyInfo?.name}</Text>
                <HStack space="sm" className="items-center mt-2">
                  <Icon as={MapPinIcon} size="md" className="text-gray-500" />
                  <Text className="text-sm text-gray-500">{oportunity.location}</Text>
                </HStack>
              </VStack>
            </HStack>

            <VStack space="md">
              <HStack space="sm" className="items-center">
                <Icon as={BriefcaseIcon} size="md" className="text-primary-500" />
                <Heading size="sm">Detalhes da Vaga</Heading>
              </HStack>
              <HStack space="md" className="flex-wrap">
                <Text className="bg-primary-50 px-4 py-2 rounded-full text-primary-700">{oportunity.contractType}</Text>
                <Text className="bg-primary-50 px-4 py-2 rounded-full text-primary-700">{oportunity.workSchedule}</Text>
                <Text className="bg-primary-50 px-4 py-2 rounded-full text-primary-700">{oportunity.experienceLevel}</Text>
              </HStack>
            </VStack>

            {oportunity.mainResponsibilities && <VStack space="sm">
              <HStack space="sm" className="items-center">
                <Icon as={StarIcon} size="md" className="text-primary-500" />
                <Heading size="sm">Principais Responsabilidades</Heading>
              </HStack>
              {oportunity.mainResponsibilities?.map((responsibility, index) => (
                <HStack key={index} space="sm" className="items-start">
                  <Icon as={CheckCircleIcon} size="md" className="text-primary-500 mt-1" />
                  <Text className="text-sm flex-1">{responsibility}</Text>
                </HStack>
              ))}
            </VStack>
            }

            {oportunity.requirements &&
              <VStack space="sm">
                <HStack space="sm" className="items-center">
                  <Icon as={CheckCircleIcon} size="md" className="text-primary-500" />
                  <Heading size="sm">Requisitos</Heading>
                </HStack>
                {oportunity.requirements?.map((requirement, index) => (
                  <HStack key={index} space="sm" className="items-start">
                    <Icon as={CheckCircleIcon} size="md" className="text-primary-500 mt-1" />
                    <Text className="text-sm flex-1">{requirement}</Text>
                  </HStack>
                ))}
              </VStack>
            }

            {oportunity.benefits && <VStack space="sm">
              <HStack space="sm" className="items-center">
                <Icon as={StarIcon} size="md" className="text-primary-500" />
                <Heading size="sm">Benefícios</Heading>
              </HStack>
              {oportunity.benefits?.map((benefit, index) => (
                <HStack key={index} space="sm" className="items-start">
                  <Icon as={CheckCircleIcon} size="md" className="text-primary-500 mt-1" />
                  <Text className="text-sm flex-1">{benefit}</Text>
                </HStack>
              ))}
            </VStack>}

            {oportunity.toolsAndSoftware && <VStack space="sm">
              <HStack space="sm" className="items-center">
                <Icon as={PenToolIcon} size="md" className="text-primary-500" />
                <Heading size="sm">Ferramentas e Experiência:</Heading>
              </HStack>
              <HStack className="flex-wrap" space="sm">
                {oportunity.toolsAndSoftware?.map((tool, index) => (
                  <HStack key={index} className="bg-primary-50 px-3 py-1 rounded-full items-center" space="xs">
                    <Text className="text-sm text-primary-700 font-medium">{tool.tool}</Text>
                    <Text className="text-xs text-primary-600">•</Text>
                    <Text className="text-sm text-primary-700">{tool.level}</Text>
                  </HStack>
                ))}
              </HStack>
            </VStack>}

            <VStack space="sm">
              <HStack space="sm" className="items-center">
                <Icon as={PenToolIcon} size="md" className="text-primary-500" />
                <Heading size="sm">Descrição</Heading>
              </HStack>
              <HStack space="sm" className="flex-wrap">
                <Text className="text-sm flex-1">{oportunity.jobDescription}</Text>
              </HStack>
            </VStack>

            <VStack space="sm" className="bg-gray-50 p-4 rounded-xl">
              <HStack space="sm" className="items-center">
                <Icon as={InfoIcon} size="md" className="text-primary-500" />
                <Heading size="sm">Informações Adicionais</Heading>
              </HStack>
              <HStack space="sm" className="items-center">
                <Icon as={BriefcaseIcon} size="md" className="text-gray-500" />
                <Text className="text-sm">Vagas disponíveis: {oportunity.availablePositions}</Text>
              </HStack>
              <HStack space="sm" className="items-center">
                <Icon as={CalendarIcon} size="md" className="text-gray-500" />
                <Text className="text-sm">Data limite: {new Date(oportunity.applicationDeadline).toLocaleDateString()}</Text>
              </HStack>
              <HStack space="sm" className="items-center">
                <Icon as={ClockIcon} size="md" className="text-gray-500" />
                <Text className="text-sm">Início previsto: {new Date(oportunity.expectedStartDate).toLocaleDateString()}</Text>
              </HStack>
              <HStack space="sm" className="items-center">
                <Icon as={CalendarIcon} size="md" className="text-gray-500" />
                <Text className="text-sm">Publicado em: {new Date(oportunity.publicationDate).toLocaleDateString()}</Text>
              </HStack>
            </VStack>
          </VStack>
        </ScrollView>

        {oportunity.managedJob == "Não" ? (
          <Button
            variant="outline"
            className="mt-4 bg-blue-500 text-white"
            onPress={() => handleOpenURL(oportunity.externalUrl)} >
            <ButtonText className="text-white">Ir para vaga externa</ButtonText>
          </Button>
        ) : (
          hasUserApplied() ? (
            <Button
              variant="outline"
              className="mt-4 bg-red-500 text-white"
              onPress={() => setModalVisible(true)} >
              <ButtonText className="text-gray-900">Desinscrever</ButtonText>
            </Button>
          ) : (
            <Button
              variant="outline"
              className="mt-4 bg-green-500 text-white"
              onPress={() => setModalVisible(true)} >
              <ButtonText className="text-gray-900">Se inscrever</ButtonText>
            </Button>
          )
        )}

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <Pressable
            onPress={() => setModalVisible(false)}
            className="flex-1 bg-black/50"
          >
            <VStack className="flex-1 justify-end">
              <Pressable onPress={(e) => e.stopPropagation()}>
                <VStack className="bg-white p-6 rounded-t-3xl shadow-lg" style={{ paddingBottom: Platform.OS === 'android' ? 70 : 36 }}>
                  <HStack className="justify-between items-center mb-4">
                    {hasUserApplied() ? <Heading size="lg">Desiscrever para a vaga</Heading> : <Heading size="lg">Inscrição para a vaga</Heading>}
                    <Pressable onPress={() => setModalVisible(false)}>
                      <Icon as={XIcon} size="md" className="text-gray-500" />
                    </Pressable>
                  </HStack>
                  {hasUserApplied() ? (
                    <Text className="mb-6 text-gray-600">Tem certeza que deseja se desinscrever para esta vaga? Após confirmar, sua candidatura será cancelada.</Text>
                  ) : (
                    <Text className="mb-6 text-gray-600">Tem certeza que deseja se inscrever para esta vaga? Após confirmar, sua candidatura será enviada para análise.</Text>
                  )}

                  <Formik
                    initialValues={{
                      userId: decodeToken.sub,
                      oportunityId: oportunity.id,
                      comments: '',
                    }}
                    enableReinitialize
                    onSubmit={async (values) => {
                      if (hasUserApplied()) {
                        await api.post('/oportunity/unapply', {
                          userId: String(values.userId),
                          oportunityId: String(values.oportunityId),
                        }).then((response) => {
                          if (response.status === 201) {
                            setModalVisible(false);

                            alert('Sua inscrição foi cancelada com sucesso!');
                            router.push('/home');
                          }
                        })
                      } else {
                        await api.post('/oportunity/apply', {
                          userId: String(values.userId),
                          oportunityId: String(values.oportunityId),
                          comment: values.comments
                        }).then((response) => {
                          if (response.status === 201) {
                            setModalVisible(false);

                            alert('Inscrição realizada com sucesso!');
                            router.push('/home');
                          }
                        }).catch((error) => {
                          console.log('error', JSON.stringify(error));
                        });
                      }
                    }}
                  >
                    {({ values, handleChange, handleBlur, handleSubmit, }) => (
                      <View>
                        {!hasUserApplied() && <HStack space="md" className="justify-center my-6">
                          <Textarea
                            size="md"
                            isReadOnly={false}
                            isInvalid={false}
                            isDisabled={false}
                            className="w-full"
                          >
                            <TextareaInput
                              value={values.comments}
                              type="text"
                              onChangeText={handleChange("comments")}
                              onBlur={handleBlur("comments")}
                              placeholder="Informações complementares (opcional)" />
                          </Textarea>
                        </HStack>}


                        <HStack space="md" className="mb-4">
                          <Button
                            variant="outline"
                            className="flex-1 border border-gray-300"
                            onPress={() => setModalVisible(false)}>
                            <ButtonText className="text-gray-700">Cancelar</ButtonText>
                          </Button>
                          {hasUserApplied() ? (
                            <Button
                              className="flex-1 bg-red-500 text-white"
                              onPress={() => {
                                setModalVisible(false)
                                handleSubmit()
                              }}>
                              <ButtonText className="text-white">Desinscrever</ButtonText>
                            </Button>
                          ) : (
                            <Button
                              className="flex-1 bg-green-500"
                              onPress={() => {
                                setModalVisible(false)
                                handleSubmit()
                              }}>
                              <ButtonText className="text-white">Confirmar Inscrição</ButtonText>
                            </Button>
                          )}
                        </HStack>
                      </View>
                    )}
                  </Formik>
                </VStack>
              </Pressable>
            </VStack>
          </Pressable>
        </Modal>
      </VStack>
    </SafeAreaView>
  )
}