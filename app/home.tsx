import { StatusBar, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '@/components/Header';
import PlanetsWidget from '@/components/PlanetsWidget';
import FilmsWidget from '@/components/FilmsWidget';
import PeopleWidget from '@/components/PeopleWidget';
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import Colors from '@/constants/Colors';
import { Link } from 'expo-router';

const HomeScreen = () => {
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: Colors[isDarkMode ? 'light' : 'dark'].text  }]}>
       <StatusBar
      barStyle={isDarkMode ? "light-content" : "dark-content"}
      backgroundColor={Colors[isDarkMode ? 'light' : 'dark'].background}
    />
      <Header></Header>
      <PlanetsWidget></PlanetsWidget>
      <PeopleWidget></PeopleWidget>
      <FilmsWidget></FilmsWidget>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});