import { FlatList, StyleSheet, Text, Image, Pressable } from 'react-native';
import { getPeopleFromApi } from '../services/swApi/swApi';
import { Persona } from '../types/types';
import { planetImages } from '@/data/images/images';
import { useState, useEffect } from 'react';
import { View } from './Themed';
import Colors from '@/constants/Colors';
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Link, router } from 'expo-router';
import * as Haptics from 'expo-haptics';

const PeopleWidget = () => {
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  const [people, setPeople] = useState<Persona[]>([]);

  useEffect(() => {
    const fetchPlanets = async () => {
      const data = await getPeopleFromApi();
      setPeople(data.results);
    };

    fetchPlanets();
  }, []);

  const getIdFromUrl = (url: string) => {
    const parts = url.split('/').filter(Boolean); 
    return parts[parts.length - 1]; 
  };


  return (
    <View style={[styles.container, {backgroundColor: Colors[isDarkMode ? 'dark' : 'light'].background }]}>

      <View style={[styles.row, {backgroundColor: Colors[isDarkMode ? 'dark' : 'light'].background }]}>
        <Text style={[styles.title, {color: Colors[isDarkMode ? 'dark' : 'light'].text }]}>Personas</Text>
        <Link href={'/list?category=Personas'} style={[styles.link, {color: Colors[isDarkMode ? 'dark' : 'light'].text }]}>Ver más</Link>
      </View>

      <FlatList 
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={styles.flatList} 
        contentContainerStyle={{gap: 10}}
        data={people} 
        renderItem={({ item }) => (
          <Pressable 
            style={({ pressed }) => ({
              opacity: pressed ? 0.5 : 1,
              ...styles.item, backgroundColor: Colors[isDarkMode ? 'light' : 'dark'].background, shadowColor: Colors[isDarkMode ? 'light' : 'dark'].background
              })}
              onPress={()=>{
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
                router.push({ pathname: '/peopleDetail', params: { id: getIdFromUrl(item.url)} })
              }}>
            {/* <Image
              source={planetImages[item.nombre as PlanetName] || require("../data/images/planets/default.png")}
              style={[styles.image, {backgroundColor: Colors[isDarkMode ? 'dark' : 'light'].background }]}
            /> */}
            <Text style={[styles.nombrePersona, {color: Colors[isDarkMode ? 'light' : 'dark'].text }]}>{item.nombre}</Text>
          </Pressable>
        )}
      >
      </FlatList>
    </View>
  );
};

export default PeopleWidget;

const styles = StyleSheet.create({
  container:{
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
    height: 100,
    overflow: 'visible'
  },
  item:{
    padding:10,
    width: 120,
    height: 80,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 5,     
    elevation: 5, 
  },
  nombrePersona:{
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center'
  }
});