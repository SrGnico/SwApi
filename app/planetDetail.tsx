import IconButton from '@/components/IconButton';
import Colors from '@/constants/Colors';
import { planetImages } from '@/data/images/images';
import { RootState } from '@/redux/store';
import { getPlanetFromApiById } from '@/services/swApi/swApi';
import { Planeta, PlanetName } from '@/types/types';
import { router, useLocalSearchParams } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, ScrollView, FlatList, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';

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
    
            // Fetch para residentes
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
            <View style={styles.header}>
                <IconButton name={'chevron-back'} onPress={() => {
                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
                        router.back();
                }}></IconButton>
                <Text style={[styles.title, { color: Colors[isDarkMode ? 'dark' : 'light'].text }]}>{planet?.nombre}</Text>
            </View>
            <Image
                source={planetImages[planet?.nombre as PlanetName] || require("../data/images/planets/default.png")}
                style={[styles.image, { width: width, height: width}]}
            />
            <View style={[styles.item,{backgroundColor: Colors[isDarkMode ? 'light' : 'dark'].background }]}>
                <Text style={[styles.text, { color: Colors[isDarkMode ? 'light' : 'dark'].text }]}>Diametro:</Text>
                <Text style={[styles.text, { color: Colors[isDarkMode ? 'light' : 'dark'].text }]}>{planet?.diametro}</Text>
            </View>
            <View style={[styles.item,{backgroundColor: Colors[isDarkMode ? 'light' : 'dark'].background }]}>

                <Text style={[styles.text, { color: Colors[isDarkMode ? 'light' : 'dark'].text }]}>Periodo de Rotacion:</Text>
                <Text style={[styles.text, { color: Colors[isDarkMode ? 'light' : 'dark'].text }]}>{planet?.periodoRotacion}</Text>
            </View>
            <View style={[styles.item,{backgroundColor: Colors[isDarkMode ? 'light' : 'dark'].background }]}>

                <Text style={[styles.text, { color: Colors[isDarkMode ? 'light' : 'dark'].text }]}>Periodo Orbital:</Text>
                <Text style={[styles.text, { color: Colors[isDarkMode ? 'light' : 'dark'].text }]}>{planet?.periodoOrbital}</Text>
            </View>
            <View style={[styles.item,{backgroundColor: Colors[isDarkMode ? 'light' : 'dark'].background }]}>

                <Text style={[styles.text, { color: Colors[isDarkMode ? 'light' : 'dark'].text }]}>Gravedad:</Text>
                <Text style={[styles.text, { color: Colors[isDarkMode ? 'light' : 'dark'].text }]}>{planet?.gravedad}</Text>
            </View>
            <View style={[styles.item,{backgroundColor: Colors[isDarkMode ? 'light' : 'dark'].background }]}>

                <Text style={[styles.text, { color: Colors[isDarkMode ? 'light' : 'dark'].text }]}>Poblacion:</Text>
                <Text style={[styles.text, { color: Colors[isDarkMode ? 'light' : 'dark'].text }]}>{planet?.poblacion}</Text>
            </View>
            <View style={[styles.item,{backgroundColor: Colors[isDarkMode ? 'light' : 'dark'].background }]}>

                <Text style={[styles.text, { color: Colors[isDarkMode ? 'light' : 'dark'].text }]}>Clima:</Text>
                <Text style={[styles.text, { color: Colors[isDarkMode ? 'light' : 'dark'].text }]}>{planet?.clima}</Text>
            </View>
            <View style={[styles.item,{backgroundColor: Colors[isDarkMode ? 'light' : 'dark'].background }]}>

                <Text style={[styles.text, { color: Colors[isDarkMode ? 'light' : 'dark'].text }]}>Terreno:</Text>
                <Text style={[styles.text, { color: Colors[isDarkMode ? 'light' : 'dark'].text }]}>{planet?.terreno}</Text>
            </View>
            <View style={[styles.item,{backgroundColor: Colors[isDarkMode ? 'light' : 'dark'].background }]}>

                <Text style={[styles.text, { color: Colors[isDarkMode ? 'light' : 'dark'].text }]}>Agua Superficial:</Text>
                <Text style={[styles.text, { color: Colors[isDarkMode ? 'light' : 'dark'].text }]}>{planet?.aguaSuperficial}</Text>
            </View>
            <View style={[styles.item,{backgroundColor: Colors[isDarkMode ? 'light' : 'dark'].background }]}>
                <Text style={[styles.text, { color: Colors[isDarkMode ? 'light' : 'dark'].text }]}>Residentes:</Text>
            </View>
            <FlatList 
                style={styles.flatList}
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                data={residents}
                contentContainerStyle={{gap: 10}}
                renderItem={({ item }) => (
                    <Pressable 
                        style={({ pressed }) => ({
                            opacity: pressed ? 0.5 : 1,
                        })}
                        onPress={()=>{
                        router.push({pathname:'/peopleDetail', params:{ id: item.id}})
                    }}>
                    <Text key={item.id} style={[styles.flatListItem, { color: Colors[isDarkMode ? 'light' : 'dark'].text, backgroundColor: Colors[isDarkMode ? 'light' : 'dark'].background}]}>{item.title}</Text>
                    </Pressable>
                )}
            ></FlatList>
            <View style={[styles.item,{backgroundColor: Colors[isDarkMode ? 'light' : 'dark'].background }]}>
                <Text style={[styles.text, { color: Colors[isDarkMode ? 'light' : 'dark'].text }]}>Peliculas:</Text>
            </View>
            <FlatList 
                style={styles.flatList}
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                data={films}
                contentContainerStyle={{gap: 10}}
                renderItem={({ item }) => (
                    <Pressable 
                        style={({ pressed }) => ({
                            opacity: pressed ? 0.5 : 1,
                        })}
                        onPress={()=>{
                        router.push({pathname:'/filmDetail', params:{ id: item.id}})
                    }}>
                            <Text key={item.id} style={[styles.flatListItem, { color: Colors[isDarkMode ? 'light' : 'dark'].text, backgroundColor: Colors[isDarkMode ? 'light' : 'dark'].background}]}>{item.title}</Text>
                    </Pressable>
                )}
            >

            </FlatList>
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
  header: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignContent: 'flex-start',
    alignItems: 'center'
  },
  title: {
    fontSize: 32,
    height: 40,
    fontWeight: 'bold',
    marginRight: 'auto'
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
  text:{
    fontSize: 16
  },
  flatList:{
    paddingHorizontal: 20,
    marginBottom: 10
  },
  flatListItem:{
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20
  }
});