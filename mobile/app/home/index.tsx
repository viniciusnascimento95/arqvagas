import { useAuth } from "@/constants/AuthContext";
import { Box } from "../../components/ui/box";
import { Button } from "../../components/ui/button";
import { Grid, GridItem } from "../../components/ui/grid";
import { Heading } from "../../components/ui/heading";
import { HStack } from "../../components/ui/hstack";
import { Icon } from "../../components/ui/icon";
import { Pressable } from "../../components/ui/pressable";
import { Text } from "../../components/ui/text";
import { VStack } from "../../components/ui/vstack";

import { isWeb } from "@gluestack-ui/nativewind-utils/IsWeb";
import { router } from "expo-router";
import {
  ChevronLeftIcon,
  Home,
  MessageCircle,
  Plus,
  SlidersHorizontal,
  User,
} from "lucide-react-native";
import { useState } from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export default function DashboardScreen() {
  const { signOut, user } = useAuth()
  const [activeTab, setActiveTab] = useState("Home");

  const [modalVisible, setModalVisible] = useState(false);
  const [actionsheetVisible, setActionsheetVisible] = useState(false);


  const bottomTabs = [
    {
      icon: Home,
      label: "Home",
    },
    {
      icon: SlidersHorizontal,
      label: "Filter",
    },
    {
      icon: Plus,
      label: "Listing",
    },
    {
      icon: MessageCircle,
      label: "Inbox",
      disabled: true,
    },
    {
      icon: User,
      label: "Profile",
    },
  ];

  return (
    <SafeAreaView className="h-full w-full">
      <VStack className="h-full w-full bg-background-0">
        <Box className="md:hidden">
          <HStack
            className="py-6 px-4 border-b border-border-50 bg-background-0 items-center"
            space="md"
          >
            <Pressable
              onPress={() => {
                router.back();
              }}
            >
              <Icon as={ChevronLeftIcon} />
            </Pressable>
            <Text className="text-xl">Dashboard</Text>
          </HStack>
        </Box>
        <VStack className="h-full w-full">
          <HStack className="h-full w-full">
            <VStack className="w-full">
              <Box className="flex-1 mb-20">
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{
                    paddingBottom: isWeb ? 0 : 100,
                    flexGrow: 1,
                  }}
                  className="flex-1 mb-20 md:mb-2"
                >
                  <VStack className="p-4 pb-0 md:px-10 md:pt-6  w-full" space="2xl">
                    <Heading size="2xl" className="font-roboto">
                      Welcome ao arquivagas {user?.name}
                    </Heading>

                    <Grid
                      className="gap-5"
                      _extra={{
                        className: "grid-cols-8",
                      }}
                    >
                      <GridItem
                        className="bg-background-50 p-6 rounded-md"
                        _extra={{
                          className: "col-span-3",
                        }}
                      />
                      <GridItem
                        className="bg-background-50 p-6 rounded-md"
                        _extra={{
                          className: "col-span-5",
                        }}
                      />
                      <GridItem
                        className="bg-background-50 p-6 rounded-md"
                        _extra={{
                          className: "col-span-6",
                        }}
                      />
                      <GridItem
                        className="bg-background-50 p-6 rounded-md"
                        _extra={{
                          className: "col-span-4",
                        }}
                      />
                      <GridItem
                        className="bg-background-50 p-6 rounded-md"
                        _extra={{
                          className: "col-span-4",
                        }}
                      />
                    </Grid>

                    <Box className="bg-background-50 p-4 rounded-md">
                      <Text className="text-center font-medium">
                        To view analytics you need client ID. Add it to your settings and
                        you’re good to go.
                      </Text>

                      <Button
                        onPress={() => { signOut() }}
                      >
                        <Text className="text-center text-indigo-400 font-medium">Sair da conta</Text>
                      </Button>

                      <Button onPress={() => router.push('/profile')}>
                        <Text className="text-center text-indigo-400 font-medium">Perfil da conta</Text>
                      </Button>
                    </Box>

                    <Button
                      variant="outline"
                      onPress={() => router.push('/profile/editProfile')}>
                      <Text className="text-center text-indigo-400 font-medium">Editar conta</Text>
                    </Button>
                  </VStack>
                </ScrollView>
                {/* Button footer */}
                <Box className="h-[72px] items-center w-full flex md:hidden border-t border-outline-100">
                  <HStack className=" bottom-0 justify-between w-full py-3 px-6 mb- md:hidden">
                    {bottomTabs.map((tab: any) => {
                      return (
                        <Pressable
                          key={tab.label}
                          onPress={() => {
                            if (tab.label !== "Listing" && tab.label !== "Filter") {
                              setActiveTab(tab.label);
                            }
                            if (tab.label === "Listing") {
                              setModalVisible(true);
                            }
                            if (tab.label === "Filter") {
                              setActionsheetVisible(true);
                            }
                          }}
                          disabled={tab.disabled}
                          //@ts-ignore
                          opacity={tab.disabled ? 0.5 : 1}
                        >
                          <VStack className="items-center">
                            <Icon
                              as={tab.icon}
                              size="md"
                              className={`${activeTab === tab.label
                                ? "text-typography-900"
                                : "text-typography-400"
                                }`}
                            />
                            <Text
                              size="xs"
                              className={`${activeTab === tab.label
                                ? "text-typography-900"
                                : "text-typography-400"
                                }`}
                            >
                              {tab.label}
                            </Text>
                          </VStack>
                        </Pressable>
                      );
                    })}
                  </HStack>
                </Box>
              </Box>
            </VStack>
          </HStack>
        </VStack>
      </VStack>
    </SafeAreaView >
  );
};