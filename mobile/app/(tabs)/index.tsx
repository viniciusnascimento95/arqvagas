import { Card } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { FlashList } from '@shopify/flash-list';

import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export default function HomeScreen() {

  function formatDateToBrazilian(dateString: string) {
    // Criar o objeto Date explicitamente no formato correto

    const [year, month, day] = dateString.split("-").map(Number);
    const date = new Date(year, month - 1, day); // Ajuste para mês (0-11)
    return format(date, "dd/MM/yyyy", { locale: ptBR });
  }

  // Dados de exemplo
  const jobs = [
    {
      id: "1",
      title: "Arquiteto de Soluções Corporativas",
      description: "Desenvolva estratégias arquitetônicas para grandes corporações, garantindo a integração de sistemas legados com novas tecnologias. Trabalhe em colaboração com equipes de desenvolvimento, operações e negócios para identificar as melhores soluções para os desafios organizacionais. É necessário profundo conhecimento em arquitetura de microserviços, padrões de design e frameworks modernos. Experiência em ambientes multinuvem será um diferencial.",
      datePosted: "2024-12-01"
    },
    {
      id: "2",
      title: "Arquiteto de Dados",
      description: "Projete e implemente estruturas de dados robustas para empresas de grande porte. Suas responsabilidades incluem modelagem de dados, otimização de banco de dados, implementação de pipelines de ETL e suporte a iniciativas de inteligência artificial e machine learning. O profissional deve garantir conformidade com LGPD e outras regulamentações de proteção de dados. Experiência com ferramentas como Snowflake, Hadoop e Kafka é essencial.",
      datePosted: "2024-11-25"
    },
    {
      id: "3",
      title: "Arquiteto de Software",
      description: "Lidere o design e a implementação de soluções de software de ponta a ponta, definindo padrões arquitetônicos e revisando decisões técnicas críticas. Trabalhe em estreita colaboração com engenheiros e gerentes de produto para garantir a escalabilidade, segurança e manutenção das aplicações. Familiaridade com metodologias ágeis e experiência com linguagens como Java, Python e JavaScript são indispensáveis.",
      datePosted: "2024-11-20"
    },
    {
      id: "4",
      title: "Arquiteto de Infraestrutura",
      description: "Projete e mantenha a infraestrutura de TI de organizações em rápida expansão. Inclui a criação de arquiteturas de redes seguras, sistemas de backup e recuperação de desastres e integração com provedores de nuvem. Experiência em automação usando ferramentas como Terraform e Ansible será altamente valorizada. Conhecimento em virtualização e gerenciamento de contêineres (Docker, Kubernetes) é essencial.",
      datePosted: "2024-11-15"
    },
    {
      id: "5",
      title: "Arquiteto de Integração de Sistemas",
      description: "Responsável por planejar e implementar soluções de integração entre sistemas complexos, garantindo a troca de dados fluida e segura. O profissional trabalhará com APIs, middleware e ferramentas de integração como MuleSoft, Apache Camel ou Dell Boomi. Experiência prática com SOAP, REST e gRPC é um requisito indispensável. Conhecimento em EDI será um diferencial.",
      datePosted: "2024-11-10"
    },
    {
      id: "6",
      title: "Arquiteto de Segurança",
      description: "Projete estratégias de segurança de ponta a ponta para proteger os sistemas corporativos contra ameaças cibernéticas. Inclui análise de vulnerabilidades, implementação de firewalls, sistemas de detecção de intrusão e políticas de segurança em nuvem. É imprescindível conhecimento em frameworks de segurança como NIST e ISO 27001, além de experiência prática com ferramentas como Splunk, Palo Alto e AWS Shield.",
      datePosted: "2024-11-05"
    },
    {
      id: "7",
      title: "Freelancer - Designer de Interiores",
      description: "Procura-se profissional freelance para criação de projetos de interiores residenciais e comerciais. O trabalho inclui levantamento de necessidades, desenvolvimento de conceitos, escolha de materiais e apresentação ao cliente. Experiência com softwares como AutoCAD, SketchUp e Revit é desejável. Disponibilidade para reuniões online e visitas ocasionais aos clientes.",
      datePosted: "2024-12-10"
    },
    {
      id: "8",
      title: "Freelancer - Consultor de Sustentabilidade para Arquitetura",
      description: "Oportunidade freelance para consultoria em projetos arquitetônicos sustentáveis. Inclui avaliação de materiais, uso de energia renovável, análise de eficiência energética e integração com certificações como LEED. Profissionais com experiência comprovada em projetos ecológicos serão priorizados.",
      datePosted: "2024-12-08"
    },
    {
      id: "9",
      title: "Arquiteto Paisagista",
      description: "Buscamos profissional especializado em paisagismo para projetos de áreas externas residenciais e corporativas. O trabalho inclui criação de conceitos, escolha de vegetação, sistemas de irrigação e design sustentável. Conhecimentos em programas como Lumion e V-Ray são um diferencial.",
      datePosted: "2024-12-06"
    },
    {
      id: "10",
      title: "Freelancer - Modelagem 3D para Arquitetura",
      description: "Oportunidade para freelancer especializado em modelagem 3D e renderização para projetos arquitetônicos. Responsável por criar modelos detalhados e realistas de interiores e exteriores. É essencial experiência com ferramentas como 3ds Max, Blender e Unreal Engine.",
      datePosted: "2024-12-03"
    }
  ];


  const CardItem = ({ item }: { item: { title: string; description: string, datePosted: string } }) => {
    return (
      <VStack className="bg-secondary-200 md:bg-secondary-0 md:items-center md:justify-center mt-6">
        <VStack
          space="md"
          className='p-5'
        >
          <VStack>
            <HStack space='sm' className='justify-between'>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>{item.title}</Text>
              <Text style={{ fontSize: 12, fontWeight: "light" }}>{formatDateToBrazilian(item.datePosted)}</Text>
            </HStack>
            <Text style={{ color: "gray" }} className='pt-2'>
              {item.description.length > 200 ? item.description.substring(0, 250) + '...' : item.description}
            </Text>
          </VStack>
          <Card size="sm" variant="outline" className="m-3">
            <HStack space='sm' className='justify-between'>
              <Heading size="md" >
                inscrever-se
              </Heading>
              <Text size="sm"> teste</Text>
              <Text size="sm"> </Text>
            </HStack>
          </Card>
        </VStack>
      </VStack>
    )
  }

  return (
    <HStack className="flex-1 bg-secondary-100 md:bg-secondary-0 md:items-center md:justify-center mt-6">
      <FlashList
        data={jobs}
        renderItem={({ item }) => <CardItem item={item}></CardItem>}
        keyExtractor={(item) => item.id}
        estimatedItemSize={200}
      />
    </HStack>
  );
}