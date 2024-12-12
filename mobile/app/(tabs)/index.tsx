import ParallaxScrollView from '@/components/ParallaxScrollView';
import { Box } from '@/components/ui/box';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { FlashList } from '@shopify/flash-list';
import { Image, StyleSheet } from 'react-native';

export default function HomeScreen() {

  const DATA = [
    {
      title: "First Item",
    },
    {
      title: "Second Item",
    },
    {
      title: "First Item",
    },
    {
      title: "Second Item",
    },
    {
      title: "First Item",
    },
    {
      title: "Second Item",
    },
    {
      title: "First Item",
    },
    {
      title: "Second Item",
    },
  ];


  const CardItem = () => {
    return (
      <Box className="h-20 w-20 bg-primary-300" />
    )
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <HStack space="md" reversed={false}>
        <Box className="h-20 w-20 bg-primary-300" >

          <FlashList
            data={DATA}
            renderItem={({ item }) => <Text>{item.title}</Text>}
            estimatedItemSize={200}
          />

        </Box>
        <Box className="h-20 w-20 bg-primary-400" />
        <Box className="h-20 w-20 bg-primary-500" />
      </HStack>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
