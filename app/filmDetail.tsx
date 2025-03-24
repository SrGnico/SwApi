import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const FilmDetailScreen = () => {
  const { id } = useLocalSearchParams();
  return (
    <SafeAreaView style={styles.container}>
      <Text>FilmDetailScreen Screen</Text>
      <Text>{id}</Text>
    </SafeAreaView>
  );
};

export default FilmDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center'
  }
});