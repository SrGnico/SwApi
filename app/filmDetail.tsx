import IconButton from '@/components/IconButton';
import Colors from '@/constants/Colors';
import { RootState } from '@/redux/store';
import { getFilmFromApiById } from '@/services/swApi/swApi';
import { FilmName, Pelicula } from '@/types/types';
import { router, useLocalSearchParams } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { filmImages } from '@/data/images/images';
import DetailItem from '@/components/DetailItem';
import DetailClickableList from '@/components/DetailClickableList'
import DetailNotClickableList from '@/components/DetailNotClickableList';
import DetailHeader from '@/components/DetailHeader';

const FilmDetailScreen = () => {
  const { id } = useLocalSearchParams() as { id: string };
  const [pelicula, setPelicula] = useState<Pelicula>();
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  const width = Dimensions.get('window').width - 40;
  const [planets, setPlanets] = useState<{ title: string; id: string }[]>();
  const [people, setPeople] = useState<{ title: string; id: string }[]>();
  const [films, setFilms] = useState<{ title: string; id: string }[]>([]);
  const [species, setSpecies] = useState<{ title: string}[]>();
  const [vehicles, setVehicles] = useState<{ title: string }[]>();
  const [ships, setShips] = useState<{ title: string }[]>();

  useEffect(() => {
    const fetchPlanetData = async () => {
      try {
        const peliculaData = await getFilmFromApiById(id);
        setPelicula(peliculaData);


        const speciesData = await Promise.all(
          peliculaData.especies.map(async (url) => {
            const res = await fetch(url);
            const data = await res.json();
            
            return { title: data.name };
          })
        );
        setSpecies(speciesData);

        const vehiclesData = await Promise.all(
          peliculaData.vehiculos.map(async (url) => {
            const res = await fetch(url);
            const data = await res.json();
            
            return { title: data.name };
          })
        );
        setVehicles(vehiclesData);

        const shipsData = await Promise.all(
          peliculaData.navesEstelares.map(async (url) => {
            const res = await fetch(url);
            const data = await res.json();
            
            return { title: data.name };
          })
        );
        setShips(shipsData);

        const planetsData = await Promise.all(
          peliculaData.planetas.map(async (url) => {
            const res = await fetch(url);
            const data = await res.json();
            
            const id = url.split("/").filter(Boolean).pop() || '';
        
            return { title: data.name, id };
          })
        );
        setPlanets(planetsData);

        const peopleData = await Promise.all(
          peliculaData.personajes.map(async (url) => {
            const res = await fetch(url);
            const data = await res.json();
            
            const id = url.split("/").filter(Boolean).pop() || '';
        
            return { title: data.name, id };
          })
        );
        setPeople(peopleData);


      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchPlanetData();
  }, [id]);

return (
<ScrollView>
    <SafeAreaView style={[styles.container,{backgroundColor: Colors[isDarkMode ? 'dark' : 'light'].background }]}>
      
        <DetailHeader title={`${pelicula?.titulo}`}></DetailHeader>

        <Image
          source={filmImages[pelicula?.titulo as FilmName]}
          style={[styles.image, { width: width, height: width }]}
        />
        
        <View style={[styles.itemView,{backgroundColor: Colors[isDarkMode ? 'light' : 'dark'].background }]}>

            <Text style={[styles.viewTitle, { color: Colors[isDarkMode ? 'light' : 'dark'].text }]}>Texto de Apertura:</Text>
            <Text style={[styles.text, { color: Colors[isDarkMode ? 'light' : 'dark'].text }]}>{pelicula?.textoApertura}</Text>
        </View>

        <DetailItem title="Episodio:" info={`${pelicula?.episodio}`}></DetailItem>
        <DetailItem title="Director:" info={`${pelicula?.director}`}></DetailItem>
        <DetailItem title="Fecha de Estreno:" info={`${pelicula?.fechaEstreno}`}></DetailItem>
        <DetailItem title="Productor:" info={`${pelicula?.productores}`}></DetailItem>
        <DetailNotClickableList title={'Especies:'} data={species || []}></DetailNotClickableList>
        <DetailNotClickableList title={'Naves Estelares:'} data={ships || []}></DetailNotClickableList>
        <DetailNotClickableList title={'Vehiculos:'} data={vehicles || []}></DetailNotClickableList>
        <DetailClickableList link={'/planetDetail'} title={'Planetas:'} data={planets || []}></DetailClickableList>
        <DetailClickableList link={'/peopleDetail'} title={'Personajes:'} data={people || []}></DetailClickableList>

    </SafeAreaView>
</ScrollView>
);
};

export default FilmDetailScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    overflow: 'visible'
  },
  image:{
    marginHorizontal: 20,
    aspectRatio: 1,
    objectFit: 'contain'
  },
  itemView:{
    marginHorizontal: 20,
    justifyContent: 'space-between',
    padding: 10,
    marginVertical: 10,
    borderRadius: 10
  },
  viewTitle:{
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center'
  },
  text:{
    fontSize: 16,
    textAlign: 'center'
  },
});