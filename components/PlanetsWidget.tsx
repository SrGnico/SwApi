import { FlatList, StyleSheet, Text, Image, Pressable } from 'react-native';
import { getPlanetsFromApi } from '../services/swApi/swApi';
import { Planeta, PlanetName } from '../types/types';
import { planetImages } from '@/data/images/images';
import { useState, useEffect } from 'react';
import { View } from './Themed';
import Colors from '@/constants/Colors';
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Link, router } from 'expo-router';
import * as Haptics from 'expo-haptics';

const PlanetsWidget = () => {
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  const [planets, setPlanets] = useState<Planeta[]>([]);

  useEffect(() => {
    const fetchPlanets = async () => {
      const data = await getPlanetsFromApi();
      setPlanets(data.results);
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
        <Text style={[styles.title, {color: Colors[isDarkMode ? 'dark' : 'light'].text }]}>Planetas</Text>
        <Link href={'/list?category=Planetas'} style={[styles.link, {color: Colors[isDarkMode ? 'dark' : 'light'].text }]}>Ver más</Link>
      </View>

      <FlatList 
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={styles.flatList} 
        contentContainerStyle={{gap: 10}}
        data={planets} 
        renderItem={({ item }) => (
          <Pressable 
            style={({ pressed }) => ({
              opacity: pressed ? 0.5 : 1,
              ...styles.item, backgroundColor: Colors[isDarkMode ? 'light' : 'dark'].background, shadowColor: Colors[isDarkMode ? 'light' : 'dark'].background
              })}
              onPress={()=>{
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
                router.push({ pathname: '/planetDetail', params: { id: getIdFromUrl(item.url)} })
              }}>
            <Image
              source={planetImages[item.nombre as PlanetName] || require("../data/images/planets/default.png")}
              style={[styles.image, {backgroundColor: Colors[isDarkMode ? 'dark' : 'light'].background }]}
            />
            <Text style={[styles.nombrePlaneta, {color: Colors[isDarkMode ? 'light' : 'dark'].text }]}>{item.nombre}</Text>
          </Pressable>
        )}
      >
      </FlatList>
    </View>
  );
};

export default PlanetsWidget;

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
    height: 150,
    overflow: 'visible'
  },
  item:{
    marginTop: 50,
    width: 120,
    height: 80,
    borderRadius: 10,
    alignItems: 'center',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 5,     
    elevation: 5, 
  },
  image:{
    marginTop: -60,
    height: 90,
    width: 90,
    marginBottom: 5,
    backgroundColor: 'white',
    borderRadius: 5000,
    shadowColor: '#000',  
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 1,  
    shadowRadius: 5,  
    elevation: 5,

  },
  nombrePlaneta:{
    fontSize: 18,
    fontWeight: 'bold'
  }
});