import Colors from '@/constants/Colors';
import { RootState } from '@/redux/store';
import { getPeopleFromApiById } from '@/services/swApi/swApi';
import { Persona } from '@/types/types';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Dimensions, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import DetailItem from '@/components/DetailItem';
import DetailNotClickableList from '@/components/DetailNotClickableList';
import DetailClickableList from '@/components/DetailClickableList';
import DetailHeader from '@/components/DetailHeader';

const PeopleDetailScreen = () => {
  const { id } = useLocalSearchParams() as { id: string };
  const [persona, setPersona] = useState<Persona>();
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
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
        setShips(shipsData);

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

        <DetailHeader title={`${persona?.nombre}`}></DetailHeader>

        <DetailItem title={'Altura:'} info={`${persona?.altura}`}></DetailItem>
        <DetailItem title={'Año de Nacimiento:'} info={`${persona?.anoNacimiento}`}></DetailItem>
        <DetailItem title={'Color de Cabello:'} info={`${persona?.colorCabello}`}></DetailItem>
        <DetailItem title={'Color de ojos:'} info={`${persona?.colorOjos}`}></DetailItem>
        <DetailItem title={'Color de piel:'} info={`${persona?.colorPiel}`}></DetailItem>
        <DetailItem title={'Especie:'} info={`${species}`}></DetailItem>
        <DetailItem title={'Genero:'} info={`${persona?.genero}`}></DetailItem>
        <DetailItem title={'Masa:'} info={`${persona?.masa}`}></DetailItem>

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

        <DetailNotClickableList title={'Naves Estelares:'} data={ships || []}></DetailNotClickableList>
        <DetailNotClickableList title={'Vehiculos:'} data={vehicles || []}></DetailNotClickableList>

        <DetailClickableList link={'/filmDetail'} title={'Peliculas:'} data={films || []}></DetailClickableList>

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
 
});