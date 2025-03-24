import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const PeopleDetailScreen = () => {
  const { id } = useLocalSearchParams();
  return (
    <SafeAreaView style={styles.container}>
      <Text>PeopleDetailScreen Screen</Text>
      <Text>{id}</Text>
    </SafeAreaView>
  );
};

export default PeopleDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center'
  }
});