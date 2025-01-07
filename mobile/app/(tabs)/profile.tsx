import { Box } from '@/components/ui/box';
import { Divider } from '@/components/ui/divider';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';

export default function TabThreeScreen() {
  return (
    <Box className="flex-1 bg-secondary-100 md:bg-secondary-0 md:items-center md:justify-center my-10">
      <HStack className="md:bg-secondary-0 md:items-center md:justify-center m-4">
        <VStack>
          <HStack space='sm' className='justify-between'>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>Nome</Text>
            <Text style={{ fontSize: 12, fontWeight: "light" }}>email@teste.com</Text>
          </HStack>
          <HStack space='sm' className='justify-between'>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>Senha</Text>
            <Text style={{ fontSize: 12, fontWeight: "light" }}>********</Text>
          </HStack>
          <Text style={{ color: "gray" }} className='pt-2'>
            teste
          </Text>
        </VStack>
      </HStack>
      <Divider className="my-0.5" />
      <VStack className="md:bg-secondary-0 md:items-center md:justify-center m-4">
        <HStack space='sm' className='justify-between'>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>Escolaridade</Text>
          <Text style={{ fontSize: 12, fontWeight: "light" }}>Superior em Arquitetura</Text>
        </HStack>
        <HStack space='sm' className='justify-between'>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>Experiência Profissional</Text>
          <Text style={{ fontSize: 12, fontWeight: "light" }}>2 anos como Arquiteto Júnior</Text>
        </HStack>
        <HStack space='sm' className='justify-between'>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>Habilidades</Text>
          <Text style={{ fontSize: 12, fontWeight: "light" }}>AutoCAD, SketchUp, Revit</Text>
        </HStack>
        <HStack space='sm' className='justify-between'>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>Certificações</Text>
          <Text style={{ fontSize: 12, fontWeight: "light" }}>Certificação em Design Sustentável</Text>
        </HStack>
        <HStack space='sm' className='justify-between'>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>Portfólio</Text>
          <Text style={{ fontSize: 12, fontWeight: "light" }}>www.portfolio-arquitetura.com</Text>
        </HStack>
        <HStack space='sm' className='justify-between'>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>Disponibilidade</Text>
          <Text style={{ fontSize: 12, fontWeight: "light" }}>Imediata</Text>
        </HStack>
      </VStack>
    </Box>
  );
}

