import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";

import { api } from "@/services/api";
import { router, usePathname } from "expo-router";
import { BriefcaseIcon, BuildingIcon, ChevronLeftIcon, ClockIcon, HomeIcon, MapPinIcon, UserIcon } from "lucide-react-native";
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
        <HStack className="ms-4 justify-center">
          <Heading className="mb-1">Oportunidades</Heading>
        </HStack>

        <FlatList
          data={oportunities}
          keyExtractor={(item) => item.id.toString()}
          className="px-2"
          ItemSeparatorComponent={() => <VStack className="h-px bg-border-50 my-1" />}
          contentContainerStyle={{ flexGrow: 1 }}
          renderItem={({ item }) => (
            <Pressable onPress={() => router.push(`/oportunity/detail/${item.id}`)}>
              <VStack className="bg-background-50 p-4 rounded-md mb-4 shadow-sm">
                <HStack className="items-center justify-between mb-2">
                  <Text className="text-lg font-bold text-primary-500">{item.jobTitle}</Text>
                  {item.isAvailable && (
                    <Text className="text-sm bg-green-100 text-green-700 px-2 py-1 rounded">
                      {item.availablePositions} vagas
                    </Text>
                  )}
                </HStack>

                <HStack className="items-center mb-2" space="sm">
                  <Icon as={BuildingIcon} size="md" className="text-gray-500" />
                  <Text className="text-sm text-gray-700 font-medium">{item.companyInfo.name}</Text>
                </HStack>

                <Text className="text-sm text-gray-600 mb-3" numberOfLines={2}>
                  {item.jobDescription}
                </Text>

                <HStack className="flex-wrap" space="md">
                  <HStack className="items-center" space="xs">
                    <Icon as={MapPinIcon} size="md" className="text-gray-500" />
                    <Text className="text-xs text-gray-600">{item.location}</Text>
                  </HStack>

                  <HStack className="items-center" space="xs">
                    <Icon as={BriefcaseIcon} size="md" className="text-gray-500" />
                    <Text className="text-xs text-gray-600">{item.contractType}</Text>
                  </HStack>

                  <HStack className="items-center" space="xs">
                    <Icon as={ClockIcon} size="md" className="text-gray-500" />
                    <Text className="text-xs text-gray-600">{item.workSchedule}</Text>
                  </HStack>
                </HStack>

                <HStack className="mt-3 flex-wrap" space="sm">
                  {item.toolsAndSoftware.slice(0, 3).map((tool, index) => (
                    <Text key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                      {tool}
                    </Text>
                  ))}
                </HStack>
                <HStack className="mt-3 flex-wrap" space="sm">
                  {item.benefits.slice(0, 3).map((tool, index) => (
                    <Text key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                      {tool}
                    </Text>
                  ))}
                </HStack>
              </VStack>
            </Pressable>
          )}

        />
        <VStack className="flex-2 justify-end">
          <HStack className="bg-white p-4 border-t border-gray-200 justify-around w-full">
            <Pressable onPress={() => router.push('/home')}
              className={pathname === "/home" ? "opacity-100" : "opacity-60"}
            >
              <VStack className="items-center">
                <Icon as={HomeIcon} size="md" className="text-gray-500" />
                <Text className="text-xs text-gray-600">Início</Text>
              </VStack>
            </Pressable>

            <Pressable onPress={() => router.push('/oportunity')}
              className={pathname === "/oportunity" ? "opacity-100" : "opacity-60"}
            >
              <VStack className="items-center">
                <Icon as={BriefcaseIcon} size="md" className="text-primary-500" />
                <Text className="text-xs text-primary-500">Vagas</Text>
              </VStack>
            </Pressable>

            <Pressable onPress={() => router.push('/profile')}
              className={pathname === "/profile" ? "opacity-100" : "opacity-60"}
            >
              <VStack className="items-center">
                <Icon as={UserIcon} size="md" className="text-gray-500" />
                <Text className="text-xs text-gray-600">Perfil</Text>
              </VStack>
            </Pressable>
          </HStack>
        </VStack>
      </VStack>
    </SafeAreaView>
  )
}