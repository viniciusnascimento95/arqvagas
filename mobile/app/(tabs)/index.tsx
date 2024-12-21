import { Badge, BadgeIcon, BadgeText } from '@/components/ui/badge';
import { Box } from '@/components/ui/box';
import { Button, ButtonText } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Divider } from '@/components/ui/divider';
import { Heading } from '@/components/ui/heading';
import { HStack } from '@/components/ui/hstack';
import { CheckIcon, CloseIcon, GlobeIcon, Icon } from '@/components/ui/icon';
import { Modal, ModalBackdrop, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader } from '@/components/ui/modal';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { FlashList } from '@shopify/flash-list';

import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useState } from 'react';


type Job = {
  id: number;
  jobTitle: string;
  contractType: string;
  requirements: string[];
  jobDescription: string;
  experienceLevel: string;
  benefits: string[];
  location: string;
  workSchedule: string;
  availablePositions: number;
  expectedStartDate: string;
  companyInfo: {
    name: string;
    industry: string;
    teamSize: string;
  };
  mainResponsibilities: string[];
  toolsAndSoftware: string[];
  publicationDate: string;
  applicationDeadline: string;
  isAvailable: boolean;
  createdAt: string;
  updatedAt: string;
};



export default function HomeScreen() {

  const [showModal, setShowModal] = useState(false);

  const [selectedItem, setSelectedItem] = useState<Job | null>(null);
  function formatDateToBrazilian(dateString: string) {
    // Converte a string para um objeto Date
    const date = new Date(dateString);

    // Verifica se a data é válida
    if (isNaN(date.getTime())) {
      throw new Error("Data inválida.");
    }

    // Formata a data para o padrão brasileiro
    return format(date, "dd/MM/yyyy", { locale: ptBR });
  }


  const jobs = [
    {
      id: 1,
      jobTitle: "Software Engineer Tester",
      contractType: "CLT",
      requirements: ["JavaScript", "React", "Node.js", "SQL", "HTML", "CSS"],
      jobDescription: "Desenvolver e manter aplicações web.",
      experienceLevel: "Senior",
      benefits: ["Plano de saúde", "Vale alimentação"],
      location: "São Paulo - SP",
      workSchedule: "Segunda a Sexta, das 9h às 18h",
      availablePositions: 5,
      expectedStartDate: "2024-12-01T00:00:00.000Z",
      companyInfo: {
        name: "Tech Company",
        industry: "Technology",
        teamSize: "50-100",
      },
      mainResponsibilities: [
        "Desenvolver funcionalidades",
        "Participar de reuniões",
      ],
      toolsAndSoftware: ["VSCode", "Git"],
      publicationDate: "2024-11-01T00:00:00.000Z",
      applicationDeadline: "2024-11-30T23:59:59.000Z",
      isAvailable: true,
      createdAt: "2024-11-26T00:10:11.560Z",
      updatedAt: "2024-11-26T00:10:11.560Z",
    },
    {
      id: 2,
      jobTitle: "Frontend Developer",
      contractType: "PJ",
      requirements: ["React", "TypeScript", "Redux"],
      jobDescription: "Criar interfaces de usuário modernas e responsivas.",
      experienceLevel: "Pleno",
      benefits: ["Acesso a cursos online", "Day-off no aniversário"],
      location: "Remoto",
      workSchedule: "Flexível",
      availablePositions: 3,
      expectedStartDate: "2024-12-15T00:00:00.000Z",
      companyInfo: {
        name: "Frontend Experts",
        industry: "Software Development",
        teamSize: "10-20",
      },
      mainResponsibilities: [
        "Implementar designs baseados em Figma",
        "Garantir a acessibilidade das páginas",
      ],
      toolsAndSoftware: ["Figma", "Jira"],
      publicationDate: "2024-11-10T00:00:00.000Z",
      applicationDeadline: "2024-12-10T23:59:59.000Z",
      isAvailable: true,
      createdAt: "2024-11-26T00:15:11.560Z",
      updatedAt: "2024-11-26T00:15:11.560Z",
    },
    {
      id: 3,
      jobTitle: "Backend Engineer",
      contractType: "CLT",
      requirements: ["Node.js", "Express", "MongoDB"],
      jobDescription: "Criar e manter APIs robustas e escaláveis.",
      experienceLevel: "Senior",
      benefits: ["Vale transporte", "Auxílio home office"],
      location: "Rio de Janeiro - RJ",
      workSchedule: "Híbrido",
      availablePositions: 2,
      expectedStartDate: "2025-01-10T00:00:00.000Z",
      companyInfo: {
        name: "API Builders",
        industry: "Technology",
        teamSize: "30-50",
      },
      mainResponsibilities: [
        "Desenvolver endpoints RESTful",
        "Manter a documentação da API",
      ],
      toolsAndSoftware: ["Postman", "Docker"],
      publicationDate: "2024-11-15T00:00:00.000Z",
      applicationDeadline: "2024-12-20T23:59:59.000Z",
      isAvailable: true,
      createdAt: "2024-11-26T00:20:11.560Z",
      updatedAt: "2024-11-26T00:20:11.560Z",
    },
    {
      id: 4,
      jobTitle: "UX/UI Designer",
      contractType: "Freelancer",
      requirements: ["Figma", "Adobe XD", "Prototyping"],
      jobDescription:
        "Projetar experiências de usuário intuitivas e visualmente atraentes.",
      experienceLevel: "Pleno",
      benefits: ["Bônus por entrega", "Horários flexíveis"],
      location: "Remoto",
      workSchedule: "Flexível",
      availablePositions: 1,
      expectedStartDate: "2025-01-01T00:00:00.000Z",
      companyInfo: {
        name: "Design Studio",
        industry: "Creative Agency",
        teamSize: "5-10",
      },
      mainResponsibilities: ["Criar wireframes", "Testar interfaces"],
      toolsAndSoftware: ["Figma", "Miro"],
      publicationDate: "2024-11-20T00:00:00.000Z",
      applicationDeadline: "2024-12-25T23:59:59.000Z",
      isAvailable: true,
      createdAt: "2024-11-26T00:25:11.560Z",
      updatedAt: "2024-11-26T00:25:11.560Z",
    },
    {
      id: 5,
      jobTitle: "DevOps Engineer",
      contractType: "PJ",
      requirements: ["AWS", "Docker", "Kubernetes"],
      jobDescription:
        "Automatizar pipelines e manter infraestrutura em nuvem.",
      experienceLevel: "Senior",
      benefits: ["Ajuda de custo", "Bônus anual"],
      location: "Campinas - SP",
      workSchedule: "Híbrido",
      availablePositions: 2,
      expectedStartDate: "2025-02-01T00:00:00.000Z",
      companyInfo: {
        name: "Cloud Masters",
        industry: "Cloud Computing",
        teamSize: "100-150",
      },
      mainResponsibilities: [
        "Configurar pipelines CI/CD",
        "Monitorar infraestruturas",
      ],
      toolsAndSoftware: ["Jenkins", "Terraform"],
      publicationDate: "2024-11-25T00:00:00.000Z",
      applicationDeadline: "2024-12-30T23:59:59.000Z",
      isAvailable: true,
      createdAt: "2024-11-26T00:30:11.560Z",
      updatedAt: "2024-11-26T00:30:11.560Z",
    },
  ];

  function handleModal(item: Job) {
    setSelectedItem(item);
    setShowModal(true);
  }

  const CardItem = ({ item }: { item: Job }) => {
    return (
      <VStack className="bg-secondary-200 md:bg-secondary-0 md:items-center md:justify-center mt-6">
        <VStack
          space="md"
          className='p-5'
        >
          <VStack>
            <HStack space='sm' className='justify-between'>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>{item.jobTitle}</Text>
              <Text style={{ fontSize: 12, fontWeight: "light" }}>{formatDateToBrazilian(item.createdAt)}</Text>
            </HStack>
            <Text style={{ color: "gray" }} className='pt-2'>
              {item.jobDescription.length > 200 ? item.jobDescription.substring(0, 250) + '...' : item.jobDescription}
            </Text>
          </VStack>
          <Card size="sm" variant="outline" className="m-3">
            <HStack space='sm' className='justify-between'>
              <Button size="sm" variant="outline" onPress={() => handleModal(item)}>
                <ButtonText>Candidatar-se</ButtonText>
              </Button>
              <Badge size="md" variant="solid" action="success">
                <BadgeText>Disponível</BadgeText>
                <BadgeIcon as={GlobeIcon} className="ml-2" />
              </Badge>
            </HStack>
          </Card>
        </VStack>
      </VStack >
    )
  }

  return (
    <Box className="flex-1 bg-secondary-100 md:bg-secondary-0 md:items-center md:justify-center my-10">
      <HStack className="flex-1 bg-secondary-100 md:bg-secondary-0 md:items-center md:justify-center mt-6">
        <FlashList
          data={jobs}
          renderItem={({ item }) => <CardItem item={item}></CardItem>}
          keyExtractor={(item) => String(item.id)}
          estimatedItemSize={200}
          contentContainerStyle={{ paddingBottom: 25 }}
          ListEmptyComponent={() => (
            <VStack className="bg-secondary-200 md:bg-secondary-0 md:items-center md:justify-center mt-6">
              <VStack
                space="md"
                className='p-5'
              >
                <VStack>
                  <Text style={{ fontSize: 18, fontWeight: "bold" }}>Nenhum resultado encontrado</Text>
                </VStack>
              </VStack>
            </VStack>
          )}
        />
        {selectedItem && (
          <Modal isOpen={showModal} onClose={() => setShowModal(false)} size="lg">
            <ModalBackdrop />
            <ModalContent>
              <ModalHeader>
                <VStack space='xs'>
                  <Heading size="md" className="text-typography-950">
                    {selectedItem.jobTitle}
                  </Heading>
                  <Text className='text-typography-600 text-xs' >
                    {selectedItem.location} | {selectedItem.contractType} | {selectedItem.experienceLevel}
                  </Text>
                </VStack>

                <ModalCloseButton>
                  <Icon
                    as={CloseIcon}
                    size="md"
                    className="stroke-background-400 group-[:hover]/modal-close-button:stroke-background-700 group-[:active]/modal-close-button:stroke-background-900 group-[:focus-visible]/modal-close-button:stroke-background-900"
                  />
                </ModalCloseButton>
              </ModalHeader>
              <ModalBody>
                <Divider className="my-0.5" />
                <Text className='text-typography-700'>
                  Descrição da Vaga:  <Text size="sm" className="text-slate-600 my-2">
                    {selectedItem.jobDescription}
                  </Text>
                </Text>

                {/* Empresa */}
                <VStack space="sm" className='my-2'>
                  <Text className='text-typography-700'>
                    Empresa: <Text className='text-typography-600'>{selectedItem.companyInfo.name}</Text>
                  </Text>
                  <Text className='text-typography-700'>
                    Indústria: <Text className='text-typography-600'>{selectedItem.companyInfo.industry}</Text>
                  </Text>
                  <Text className='text-typography-700'>
                    Tamanho do time: <Text className='text-typography-600'>{selectedItem.companyInfo.teamSize}</Text>
                  </Text>
                </VStack>

                <Divider className="my-0.2" />

                {/* Responsabilidades */}
                <VStack space="sm" >
                  <Text className='text-center' bold>
                    Principais responsabilidades
                  </Text>
                  {selectedItem.mainResponsibilities.map((responsibility, index) => (
                    <Text key={index}>
                      - {responsibility}
                    </Text>
                  ))}
                  <Text size="sm" className="text-typography-500" >
                    <Text >Ferramentas e Software:</Text> {selectedItem.toolsAndSoftware.join(', ')}
                  </Text>
                </VStack>

                <VStack space="md" className="my-2">
                  <Text size="sm" className="text-typography-500">
                    <Text >Requisitos:</Text>
                  </Text>
                  <HStack space="md" className="mb-2 flex-wrap">
                    {selectedItem.requirements.map((requirement, index) => (
                      <VStack key={index} className='justify-start' space="sm">
                        <Text size="sm" className="text-typography-700"><Icon as={CheckIcon} className="text-green-500 m-2 w-4 h-4" /> {requirement}</Text>
                      </VStack>
                    ))}
                  </HStack>

                </VStack>

                <Divider className="my-0.5" />

                {/* Benefícios */}
                {selectedItem.benefits && <VStack space="sm">
                  <Text size="sm" className="text-typography-700 my-2">
                    <Text >Benefícios:</Text> {selectedItem.benefits.join(', ')}
                  </Text>
                </VStack>}

                {/* Informações adicionais */}
                <VStack space="sm" className='my-2'>
                  <Text className='text-center' bold>
                    Informações adicionais
                  </Text>
                  <Text>
                    Nível de experiência: {selectedItem.experienceLevel}
                  </Text>
                  <Text>
                    Horário de trabalho: {selectedItem.workSchedule}
                  </Text>
                  <Text className='text-right'>
                    Vagas disponíveis: {selectedItem.availablePositions}
                  </Text>
                </VStack>

                {/* Ações */}
                <Divider />
                <HStack className='justify-between mt-3'>
                  <Text>
                    Candidaturas até {new Date(selectedItem.applicationDeadline).toLocaleDateString()}
                  </Text>
                </HStack>

                <Text size="md" className="text-typography-700">
                  <Text>Início Esperada:</Text> {new Date(selectedItem.expectedStartDate).toLocaleDateString()}
                </Text>
                <Text size="md" className="text-typography-700 text-right">
                  <Text>Publicação:</Text> {new Date(selectedItem.publicationDate).toLocaleDateString()}
                </Text>
                <Divider className="my-0.5" />

              </ModalBody>
              <ModalFooter>
                <Button
                  variant="outline"
                  action="secondary"
                  onPress={() => {
                    setShowModal(false);
                  }}
                >
                  <ButtonText>Sair</ButtonText>
                </Button>
                <Button
                  onPress={() => {
                    setShowModal(false);
                  }}
                >
                  <ButtonText>Aplica-se</ButtonText>
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        )}
      </HStack>
    </Box>
  );
}