import IconButton from '@/components/IconButton';
import Colors from '@/constants/Colors';
import { planetImages } from '@/data/images/images';
import { RootState } from '@/redux/store';
import { getPlanetFromApiById } from '@/services/swApi/swApi';
import { Planeta, PlanetName } from '@/types/types';
import { router, useLocalSearchParams } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import DetailItem from '@/components/DetailItem';
import DetailClickableList from '@/components/DetailClickableList';
import DetailHeader from '@/components/DetailHeader';

const PlanetDetailScreen = () => {
    const { id } = useLocalSearchParams() as { id: string };
    const [planet, setPlanet] = useState<Planeta>();
    const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
    const width = Dimensions.get('window').width - 40;
    const [residents, setResidents] = useState<{ title: string; id: string }[]>([]);
    const [films, setFilms] = useState<{ title: string; id: string }[]>([]);
    
    useEffect(() => {
        const fetchPlanetData = async () => {
          try {
            const planetData = await getPlanetFromApiById(id);
            setPlanet(planetData);
    
            const residentsData = await Promise.all(
              planetData.residentes.map(async (url) => {
                const res = await fetch(url);
                const data = await res.json();
                const id = url.split("/").filter(Boolean).pop() || '';

                return { title: data.name, id }; 
              })
            );
            setResidents(residentsData);
    
            const filmData = await Promise.all(
                planetData.peliculas.map(async (url) => {
                  const res = await fetch(url);
                  const data = await res.json();
                  
                  const id = url.split("/").filter(Boolean).pop() || '';
              
                  return { title: data.title, id };
                })
              );
              setFilms(filmData);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
    
        fetchPlanetData();
      }, [id]);

  return (
    <ScrollView>
        <SafeAreaView style={[styles.container,{backgroundColor: Colors[isDarkMode ? 'dark' : 'light'].background }]}>
        
            <DetailHeader title={`${planet?.nombre}`}></DetailHeader>

            <Image
                source={planetImages[planet?.nombre as PlanetName] || require("../data/images/planets/default.png")}
                style={[styles.image, { width: width, height: width}]}
            />

            <DetailItem title={'Diametro:'} info={`${planet?.diametro}`}></DetailItem>
            <DetailItem title={'Periodo de Rotacion:'} info={`${planet?.periodoRotacion}`}></DetailItem>
            <DetailItem title={'Periodo Orbital:'} info={`${planet?.periodoOrbital}`}></DetailItem>
            <DetailItem title={'Gravedad:'} info={`${planet?.gravedad}`}></DetailItem>
            <DetailItem title={'Poblacion:'} info={`${planet?.poblacion}`}></DetailItem>
            <DetailItem title={'Clima:'} info={`${planet?.clima}`}></DetailItem>
            <DetailItem title={'Terreno:'} info={`${planet?.terreno}`}></DetailItem>
            <DetailItem title={'Agua Superficial:'} info={`${planet?.aguaSuperficial}`}></DetailItem>

            <DetailClickableList link={'/peopleDetail'} title={'Residentes:'} data={residents}></DetailClickableList>
            <DetailClickableList link={'/filmDetail'} title={'Peliculas:'} data={films}></DetailClickableList>
            
           
        </SafeAreaView>
    </ScrollView>
  );
};

export default PlanetDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    overflow: 'visible'
  },
  
  image:{
    marginHorizontal: 20,
    aspectRatio: 1,
    objectFit: 'fill'
  },
  item:{
    marginHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginVertical: 10,
    borderRadius: 10
  },

});