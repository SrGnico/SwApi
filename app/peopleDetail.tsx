import IconButton from '@/components/IconButton';
import Colors from '@/constants/Colors';
import { RootState } from '@/redux/store';
import { getPeopleFromApiById } from '@/services/swApi/swApi';
import { Persona } from '@/types/types';
import { router, useLocalSearchParams } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, ScrollView, FlatList, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';

const PeopleDetailScreen = () => {
  const { id } = useLocalSearchParams() as { id: string };
  const [persona, setPersona] = useState<Persona>();
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  const width = Dimensions.get('window').width - 40;
  const [planet, setPlanet] = useState<{ title: string; id: string }>();
  const [films, setFilms] = useState<{ title: string; id: string }[]>([]);
  const [species, setSpecies] = useState<{ title: string}>();
  const [vehicles, setVehicles] = useState<{ title: string }[]>();
  const [ships, setShips] = useState<{ title: string }[]>();

  


  useEffect(() => {
    const fetchPlanetData = async () => {
      try {
        const personaData = await getPeopleFromApiById(id);
        setPersona(personaData);

        const planetaNatalRes = await fetch(personaData.planetaNatal);
        const planetaNatalData = await planetaNatalRes.json();
        const planetId = personaData.planetaNatal.split("/").filter(Boolean).pop() || "";
        setPlanet({ title: planetaNatalData.name, id: planetId });

        const speciesRes = await fetch(personaData.especies[0]);
        const spesciesData = await speciesRes.json();
        setSpecies(spesciesData.name);

        const vehiclesData = await Promise.all(
          personaData.vehiculos.map(async (url) => {
            const res = await fetch(url);
            const data = await res.json();
            
            return { title: data.name };
          })
        );
        setVehicles(vehiclesData);

        const shipsData = await Promise.all(
          personaData.navesEstelares.map(async (url) => {
            const res = await fetch(url);
            const data = await res.json();
            
            return { title: data.name };
          })
        );
        setVehicles(shipsData);

        const filmData = await Promise.all(
            personaData.peliculas.map(async (url) => {
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
            <Text style={[styles.title, { color: Colors[isDarkMode ? 'dark' : 'light'].text }]}>{persona?.nombre}</Text>
        </View>
        <View style={[styles.item,{backgroundColor: Colors[isDarkMode ? 'light' : 'dark'].background }]}>
            <Text style={[styles.text, { color: Colors[isDarkMode ? 'light' : 'dark'].text }]}>Altura:</Text>
            <Text style={[styles.text, { color: Colors[isDarkMode ? 'light' : 'dark'].text }]}>{persona?.altura}</Text>
        </View>
        <View style={[styles.item,{backgroundColor: Colors[isDarkMode ? 'light' : 'dark'].background }]}>

            <Text style={[styles.text, { color: Colors[isDarkMode ? 'light' : 'dark'].text }]}>Año de Nacimiento:</Text>
            <Text style={[styles.text, { color: Colors[isDarkMode ? 'light' : 'dark'].text }]}>{persona?.anoNacimiento}</Text>
        </View>
        <View style={[styles.item,{backgroundColor: Colors[isDarkMode ? 'light' : 'dark'].background }]}>

            <Text style={[styles.text, { color: Colors[isDarkMode ? 'light' : 'dark'].text }]}>Color de Cabello</Text>
            <Text style={[styles.text, { color: Colors[isDarkMode ? 'light' : 'dark'].text }]}>{persona?.colorCabello}</Text>
        </View>
        <View style={[styles.item,{backgroundColor: Colors[isDarkMode ? 'light' : 'dark'].background }]}>

            <Text style={[styles.text, { color: Colors[isDarkMode ? 'light' : 'dark'].text }]}>Color de ojos:</Text>
            <Text style={[styles.text, { color: Colors[isDarkMode ? 'light' : 'dark'].text }]}>{persona?.colorOjos}</Text>
        </View>
        <View style={[styles.item,{backgroundColor: Colors[isDarkMode ? 'light' : 'dark'].background }]}>

            <Text style={[styles.text, { color: Colors[isDarkMode ? 'light' : 'dark'].text }]}>Color de piel:</Text>
            <Text style={[styles.text, { color: Colors[isDarkMode ? 'light' : 'dark'].text }]}>{persona?.colorPiel}</Text>
        </View>
        <View style={[styles.item,{backgroundColor: Colors[isDarkMode ? 'light' : 'dark'].background }]}>

            <Text style={[styles.text, { color: Colors[isDarkMode ? 'light' : 'dark'].text }]}>Especies:</Text>
            <Text style={[styles.text, { color: Colors[isDarkMode ? 'light' : 'dark'].text }]}>{`${species}`}</Text>
        </View>
        <View style={[styles.item,{backgroundColor: Colors[isDarkMode ? 'light' : 'dark'].background }]}>

            <Text style={[styles.text, { color: Colors[isDarkMode ? 'light' : 'dark'].text }]}>Genero:</Text>
            <Text style={[styles.text, { color: Colors[isDarkMode ? 'light' : 'dark'].text }]}>{persona?.genero}</Text>
        </View>
        <View style={[styles.item,{backgroundColor: Colors[isDarkMode ? 'light' : 'dark'].background }]}>

            <Text style={[styles.text, { color: Colors[isDarkMode ? 'light' : 'dark'].text }]}>Masa:</Text>
            <Text style={[styles.text, { color: Colors[isDarkMode ? 'light' : 'dark'].text }]}>{persona?.masa}</Text>
        </View>
        <View style={[styles.item,{backgroundColor: Colors[isDarkMode ? 'light' : 'dark'].background }]}>
          <Text style={[styles.text, { color: Colors[isDarkMode ? 'light' : 'dark'].text }]}>Naves Estelares:</Text>
          <Text style={[styles.text, { color: Colors[isDarkMode ? 'light' : 'dark'].text }]}>{persona?.navesEstelares.length === 0? 'n/a': ''}</Text>
        </View>
        {persona?.navesEstelares.length === 0? '':<FlatList 

            style={styles.flatList}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            data={vehicles}
            contentContainerStyle={{gap: 10}}
            renderItem={({ item }) => (
                <Text key={item.title} style={[styles.flatListItem, { color: Colors[isDarkMode ? 'light' : 'dark'].text, backgroundColor: Colors[isDarkMode ? 'light' : 'dark'].background}]}>{item.title}</Text>
            )}
            >

            </FlatList>}
        <View style={[styles.item,{backgroundColor: Colors[isDarkMode ? 'light' : 'dark'].background }]}>
          <Text style={[styles.text, { color: Colors[isDarkMode ? 'light' : 'dark'].text }]}>Vehiculos:</Text>
          <Text style={[styles.text, { color: Colors[isDarkMode ? 'light' : 'dark'].text }]}>{persona?.vehiculos.length === 0? 'n/a': ''}</Text>
        </View>
          {persona?.vehiculos.length === 0? '':<FlatList 

            style={styles.flatList}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            data={vehicles}
            contentContainerStyle={{gap: 10}}
            renderItem={({ item }) => (
                <Text key={item.title} style={[styles.flatListItem, { color: Colors[isDarkMode ? 'light' : 'dark'].text, backgroundColor: Colors[isDarkMode ? 'light' : 'dark'].background}]}>{item.title}</Text>
            )}
        >

        </FlatList>}

        <View style={[styles.item,{backgroundColor: Colors[isDarkMode ? 'light' : 'dark'].background }]}>
            <Text style={[styles.text, { color: Colors[isDarkMode ? 'light' : 'dark'].text }]}>Planeta de nacimiento:</Text>
            <Pressable 
                    style={({ pressed }) => ({
                        opacity: pressed ? 0.5 : 1,
                    })}
                    onPress={()=>{
                    router.push({pathname:'/planetDetail', params:{ id: planet?.id}})
                }}>
              <Text style={[styles.text, { color: Colors[isDarkMode ? 'light' : 'dark'].text }]}>{planet?.title}</Text>
            </Pressable>
        </View>

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

export default PeopleDetailScreen;


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