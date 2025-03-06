import { Button, ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { api } from "@/services/api";
import { router } from "expo-router";
import { useLocalSearchParams, usePathname } from "expo-router/build/hooks";
import { BriefcaseIcon, CalendarIcon, CheckCircleIcon, ChevronLeftIcon, ClockIcon, InfoIcon, MapPinIcon, PenToolIcon, StarIcon } from "lucide-react-native";
import { useEffect, useState } from "react";
import { Modal, Pressable, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export interface CompanyInfo {
  industry: string;
  name: string;
}

export interface JobListing {
  id: number;
  jobTitle: string;
  jobDescription: string;
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
  toolsAndSoftware: string[];
}

export default function OportunityDetailPage() {
  const { id } = useLocalSearchParams()
  const pathName = usePathname();
console.log('=>pathName --->', pathName);
  const [oportunity, setOportunity] = useState<JobListing>({} as JobListing);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    api.get(`oportunity/${id}`).then(response => {
      setOportunity(response.data)
    })
  }, [id])

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

            <VStack space="sm">
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

            <VStack space="sm">
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
            </VStack>

            <VStack space="sm">
              <HStack space="sm" className="items-center">
                <Icon as={PenToolIcon} size="md" className="text-primary-500" />
                <Heading size="sm">Ferramentas e Softwares</Heading>
              </HStack>
              <HStack space="sm" className="flex-wrap">
                {oportunity.toolsAndSoftware?.map((tool, index) => (
                  <Text key={index} className="bg-primary-50 px-4 py-2 rounded-full text-sm text-primary-700">{tool}</Text>
                ))}
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

        <Button
          variant="outline"
          className="mt-4 bg-green-500 text-white"
     
          onPress={() => setModalVisible(true)} >
          <ButtonText className="text-gray-900">Se inscrever</ButtonText>
        </Button>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <VStack className="flex-1 justify-end">
            <VStack className="bg-white p-6 rounded-t-3xl">
              <Heading className="mb-4">Inscrição para a vaga</Heading>
              <Text className="mb-4">Tem certeza que deseja se inscrever para esta vaga?</Text>
              <HStack space="md">
                <Button variant="outline" onPress={() => setModalVisible(false)} className="flex-1">
                  Cancelar
                </Button>
                <Button onPress={() => {
                  // Adicione aqui a lógica para se inscrever
                  setModalVisible(false)
                }} className="flex-1">
                  Confirmar
                </Button>
              </HStack>
            </VStack>
          </VStack>
        </Modal>
      </VStack>
    </SafeAreaView>
  )
}