import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";

import { api } from "@/services/api";
import { router, usePathname } from "expo-router";
import { BriefcaseIcon, ClockIcon, ExternalLinkIcon, FilterIcon, HomeIcon, MapPinIcon, SearchXIcon, UserIcon } from "lucide-react-native";
import { useCallback, useEffect, useState } from "react";
import { FlatList, Pressable, RefreshControl, TextInput } from "react-native";

import { useAuth } from "@/constants/AuthContext";
import { Buffer } from 'buffer';
import { SafeAreaView } from "react-native-safe-area-context";

interface CompanyInfo {
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

interface JobListing {
  id: number;
  jobTitle: string;
  jobDescription: string;
  managedJob: string;
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

export default function OportunityScreen() {
  const [oportunities, setOportunities] = useState<JobListing[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [refreshing, setRefreshing] = useState(false)
  const [loading, setLoading] = useState(true)
  const { token } = useAuth()
  //@ts-ignore
  const decodeToken = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString())

  const pathname = usePathname();

  const fetchOportunities = async () => {
    try {
      setLoading(true)
      const response = await api.get('oportunity')
      setOportunities(response.data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOportunities()
  }, [])

  const onRefresh = useCallback(async () => {
    setRefreshing(true)
    await fetchOportunities()
    setRefreshing(false)
  }, [])

  const filteredOportunities = oportunities.filter(oportunity =>
    oportunity.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
    oportunity.companyInfo.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const hasUserApplied = useCallback((oportunity: JobListing) => {
    return oportunity.Application?.some(
      application => application.userId === decodeToken.sub
    );
  }, [decodeToken.sub]);

  return (
    <SafeAreaView className="h-full w-full bg-background-50">
      <VStack className="flex-1">
        <VStack className="px-4 py-6 bg-primary-500 rounded-b-3xl shadow-lg">
          <Heading className="text-white text-2xl mb-4">Descubra Oportunidades</Heading>
          <HStack className="bg-white rounded-full px-4 py-2 items-center" space="sm">
            <Icon as={SearchXIcon} size="sm" className="text-gray-400" />
            <TextInput
              placeholder="Buscar vagas ou empresas..."
              className="flex-1 text-base"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            <Pressable onPress={() => {}}>
              <Icon as={FilterIcon} size="sm" className="text-primary-500" />
            </Pressable>
          </HStack>
        </VStack>

        <FlatList
          data={filteredOportunities}
          keyExtractor={(item) => item.id.toString()}
          className="px-4 pt-4"
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <VStack className="h-3" />}
          contentContainerStyle={{ flexGrow: 1 }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          renderItem={({ item }) => (
            <Pressable
              onPress={() => router.push(`/oportunity/detail/${item.id}`)}
              className="active:opacity-90 transform active:scale-98"
            >
              <VStack className="bg-white p-5 rounded-2xl shadow-md border border-gray-100">
                {hasUserApplied(item) && (
                  <HStack className="items-center justify-center mb-3 bg-blue-50 py-2 rounded-xl">
                    <Icon as={BriefcaseIcon} size="sm" className="text-blue-700 mr-2" />
                    <Text className="text-sm text-blue-700 font-medium">Candidatura enviada</Text>
                  </HStack>
                )}

                {item.managedJob === 'Sim' && (
                  <HStack className="items-center justify-center mb-3 bg-orange-50 py-2 rounded-xl">
                    <Icon as={ExternalLinkIcon} size="sm" className="text-orange-700 mr-2" />
                    <Text className="text-sm text-orange-700 font-medium">Vaga Externa</Text>
                  </HStack>
                )}
                
                <HStack className="items-center justify-between mb-4">
                  <VStack>
                    <Text className="text-xl font-bold text-primary-500">{item.jobTitle}</Text>
                    <Text className="text-sm text-gray-600">{item.companyInfo.name}</Text>
                  </VStack>
                  {item.isAvailable && (
                    <Text className="text-sm bg-green-50 text-green-700 px-4 py-2 rounded-full font-medium">
                      {item.availablePositions} vagas
                    </Text>
                  )}
                </HStack>

                <Text className="text-base text-gray-600 mb-4 leading-relaxed" numberOfLines={2}>
                  {item.jobDescription}
                </Text>

                <VStack space="sm" className="mb-4">
                  <HStack className="items-center" space="sm">
                    <Icon as={MapPinIcon} size="sm" className="text-primary-500" />
                    <Text className="text-sm text-gray-700">{item.location}</Text>
                  </HStack>

                  <HStack className="items-center justify-between">
                    <HStack className="items-center" space="sm">
                      <Icon as={BriefcaseIcon} size="sm" className="text-primary-500" />
                      <Text className="text-sm text-gray-700">{item.contractType}</Text>
                    </HStack>

                    <HStack className="items-center" space="sm">
                      <Icon as={ClockIcon} size="sm" className="text-primary-500" />
                      <Text className="text-sm text-gray-700">{item.workSchedule}</Text>
                    </HStack>
                  </HStack>
                </VStack>

                <VStack space="sm">
                  <HStack className="flex-wrap" space="sm">
                    {item.toolsAndSoftware.slice(0, 3).map((tool, index) => (
                      <HStack key={index} className="bg-primary-50 px-3 py-2 rounded-full items-center" space="xs">
                        <Text className="text-sm text-primary-700 font-medium">{tool.tool}</Text>
                        <Text className="text-xs text-primary-600">•</Text>
                        <Text className="text-sm text-primary-700">{tool.level}</Text>
                      </HStack>
                    ))}
                  </HStack>
                </VStack>
              </VStack>
            </Pressable>
          )}
          ListEmptyComponent={
            <VStack className="flex-1 justify-center items-center py-20" space="md">
              <Icon as={SearchXIcon} size="xl" className="text-gray-400" />
              <Text className="text-gray-500 text-lg text-center">
                {loading ? "Carregando oportunidades..." : "Nenhuma oportunidade encontrada."}
              </Text>
            </VStack>
          }
        />

        <HStack className="bg-white py-4 px-6 border-t border-gray-100 justify-around w-full shadow-lg">
          <Pressable onPress={() => router.push('/home')}
            className={`items-center ${pathname === "/home" ? "opacity-100" : "opacity-60"}`}
          >
            <Icon as={HomeIcon} size="md" className="text-gray-500 mb-1" />
            <Text className="text-xs text-gray-600 font-medium">Início</Text>
          </Pressable>

          <Pressable onPress={() => router.push('/oportunity')}
            className={`items-center ${pathname === "/oportunity" ? "opacity-100" : "opacity-60"}`}
          >
            <Icon as={BriefcaseIcon} size="md" className="text-primary-500 mb-1" />
            <Text className="text-xs text-primary-500 font-medium">Vagas</Text>
          </Pressable>

          <Pressable onPress={() => router.push('/profile')}
            className={`items-center ${pathname === "/profile" ? "opacity-100" : "opacity-60"}`}
          >
            <Icon as={UserIcon} size="md" className="text-gray-500 mb-1" />
            <Text className="text-xs text-gray-600 font-medium">Perfil</Text>
          </Pressable>
        </HStack>
      </VStack>
    </SafeAreaView>
  )
}