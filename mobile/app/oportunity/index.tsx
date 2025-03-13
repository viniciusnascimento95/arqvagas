import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";

import { api } from "@/services/api";
import { router, usePathname } from "expo-router";
import { BriefcaseIcon, BuildingIcon, ChevronLeftIcon, ClockIcon, HomeIcon, MapPinIcon, SearchXIcon, UserIcon } from "lucide-react-native";
import { useEffect, useState } from "react";
import { FlatList, Pressable } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

interface CompanyInfo {
  industry: string;
  name: string;
}

interface JobListing {
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

export default function OportunityScreen() {
  const [oportunities, setOportunities] = useState<JobListing[]>([]);

  const pathname = usePathname();
  useEffect(() => {
    api.get('oportunity').then(response => {
      setOportunities(response.data)
    })
  }, [])

  return (
    <SafeAreaView className="h-full w-full bg-background-0">
      <VStack className="py-4 flex-1" space="lg">
        <HStack
          className="py-4 px-6 border-b border-border-50 bg-background-0 items-center"
          space="md"
        >
          <Pressable onPress={() => router.back()}>
            <Icon as={ChevronLeftIcon} />
          </Pressable>
          <Text className="text-xl">Voltar</Text>
        </HStack>
        <HStack className="justify-center">
          <Heading className="mb-1">Oportunidades</Heading>
        </HStack>

        <FlatList
          data={oportunities}
          keyExtractor={(item) => item.id.toString()}
          className="px-4"
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <VStack className="h-2" />}
          contentContainerStyle={{ flexGrow: 1 }}
          renderItem={({ item }) => (
            <Pressable 
              onPress={() => router.push(`/oportunity/detail/${item.id}`)}
              className="active:opacity-80"
            >
              <VStack className="bg-white p-5 rounded-xl shadow-md border border-gray-100">
                <HStack className="items-center justify-between mb-3">
                  <Text className="text-xl font-bold text-primary-500">{item.jobTitle}</Text>
                  {item.isAvailable && (
                    <Text className="text-sm bg-green-50 text-green-700 px-3 py-1 rounded-full font-medium">
                      {item.availablePositions} vagas
                    </Text>
                  )}
                </HStack>

                <HStack className="items-center mb-3" space="sm">
                  <Icon as={BuildingIcon} size="md" className="text-primary-500" />
                  <Text className="text-base text-gray-800 font-semibold">{item.companyInfo.name}</Text>
                </HStack>

                <Text className="text-base text-gray-600 mb-4 leading-relaxed" numberOfLines={3}>
                  {item.jobDescription}
                </Text>

                <VStack space="sm" className="mb-4">
                  <HStack className="items-center" space="sm">
                    <Icon as={MapPinIcon} size="sm" className="text-gray-500" />
                    <Text className="text-sm text-gray-700">{item.location}</Text>
                  </HStack>

                  <HStack className="items-center" space="sm">
                    <Icon as={BriefcaseIcon} size="sm" className="text-gray-500" />
                    <Text className="text-sm text-gray-700">{item.contractType}</Text>
                  </HStack>

                  <HStack className="items-center" space="sm">
                    <Icon as={ClockIcon} size="sm" className="text-gray-500" />
                    <Text className="text-sm text-gray-700">{item.workSchedule}</Text>
                  </HStack>
                </VStack>

                <VStack space="sm">
                  <Text className="text-sm font-semibold text-gray-700 mb-1">Ferramentas:</Text>
                  <HStack className="flex-wrap" space="sm">
                    {item.toolsAndSoftware.slice(0, 3).map((tool, index) => (
                      <Text key={index} className="text-sm bg-primary-50 text-primary-700 px-3 py-1 rounded-full">
                        {tool}
                      </Text>
                    ))}
                  </HStack>
                </VStack>

                <VStack className="mt-3" space="sm">
                  <Text className="text-sm font-semibold text-gray-700 mb-1">Benefícios:</Text>
                  <HStack className="flex-wrap" space="sm">
                    {item.benefits.slice(0, 3).map((benefit, index) => (
                      <Text key={index} className="text-sm bg-blue-50 text-blue-700 px-3 py-1 rounded-full">
                        {benefit}
                      </Text>
                    ))}
                  </HStack>
                </VStack>
              </VStack>
            </Pressable>
          )}
          ListEmptyComponent={
            <VStack className="flex-1 justify-center items-center" space="md">
              <Icon as={SearchXIcon} size="xl" className="text-gray-400" />
              <Text className="text-gray-500 text-lg">Nenhuma oportunidade encontrada.</Text>
            </VStack>
          }
        />
        <VStack className="flex-2 justify-end">
          <HStack className="bg-white p-4 border-t border-gray-200 justify-around w-full shadow-lg">
            <Pressable onPress={() => router.push('/home')}
              className={pathname === "/home" ? "opacity-100" : "opacity-60"}
            >
              <VStack className="items-center">
                <Icon as={HomeIcon} size="md" className="text-gray-500" />
                <Text className="text-xs text-gray-600 font-medium">Início</Text>
              </VStack>
            </Pressable>

            <Pressable onPress={() => router.push('/oportunity')}
              className={pathname === "/oportunity" ? "opacity-100" : "opacity-60"}
            >
              <VStack className="items-center">
                <Icon as={BriefcaseIcon} size="md" className="text-primary-500" />
                <Text className="text-xs text-primary-500 font-medium">Vagas</Text>
              </VStack>
            </Pressable>

            <Pressable onPress={() => router.push('/profile')}
              className={pathname === "/profile" ? "opacity-100" : "opacity-60"}
            >
              <VStack className="items-center">
                <Icon as={UserIcon} size="md" className="text-gray-500" />
                <Text className="text-xs text-gray-600 font-medium">Perfil</Text>
              </VStack>
            </Pressable>
          </HStack>
        </VStack>
      </VStack>
    </SafeAreaView>
  )
}