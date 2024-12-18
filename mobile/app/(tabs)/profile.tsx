import { Box } from '@/components/ui/box';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';

export default function TabThreeScreen() {
  return (
    <Box className="flex-1 bg-secondary-100 md:bg-secondary-0 md:items-center md:justify-center m-6">
      <HStack>
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
    </Box>
  );
}

