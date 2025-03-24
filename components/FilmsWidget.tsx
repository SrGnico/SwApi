import { FlatList, StyleSheet, Text, Image, Pressable } from 'react-native';
import { getFilmsFromApi } from '../app/api/swApi/swApi';
import { Pelicula, FilmName } from '@/app/api/swApi/types';
import { filmImages } from "../data/images/images";
import { useState, useEffect } from 'react';
import { View } from './Themed';
import Colors from '@/constants/Colors';
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Link } from 'expo-router';
import * as Haptics from 'expo-haptics';

const FilmsWidget = () => {
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  const [films, setFilms] = useState<Pelicula[]>([]);

  useEffect(() => {
    const fetchPlanets = async () => {
      const data = await getFilmsFromApi();
      setFilms(data);
    };

    fetchPlanets();
  }, []);

  return (
    <View style={[styles.container, {backgroundColor: Colors[isDarkMode ? 'dark' : 'light'].background }]}>

      <View style={[styles.row, {backgroundColor: Colors[isDarkMode ? 'dark' : 'light'].background }]}>
        <Text style={[styles.title, {color: Colors[isDarkMode ? 'dark' : 'light'].text }]}>Peliculas</Text>
      </View>

      <FlatList 
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={styles.flatList} 
        contentContainerStyle={{gap: 10}}
        data={films} 
        renderItem={({ item }) => (
          <Pressable 
            style={({ pressed }) => ({
              opacity: pressed ? 0.5 : 1,
              ...styles.item, backgroundColor: Colors[isDarkMode ? 'light' : 'dark'].background 
              })}
              onPress={()=>{
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
                //Todo: Take to detail page
              }}>
            <Image
              source={filmImages[item.titulo as FilmName]}
              style={[styles.image, {backgroundColor: Colors[isDarkMode ? 'dark' : 'light'].background }]}
            />
            <Text style={[styles.tituloPelicula, {color: Colors[isDarkMode ? 'light' : 'dark'].text }]}>{item.titulo}</Text>
          </Pressable>
        )}
      >
      </FlatList>
    </View>
  );
};

export default FilmsWidget;

const styles = StyleSheet.create({
  container:{
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  row:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5
  },
  title:{
    fontSize: 32,
    fontWeight: 'bold'
  },
  link:{
    fontSize: 16,
  },
  flatList: {
    paddingVertical: 10,
    height: '100%',
  },
  item:{
    height: 500,
    alignItems: 'center',
  },
  tituloPelicula:{
    fontSize: 18,
    fontWeight: 'bold'
  },
  image:{

  }
});