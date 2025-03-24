import IconButton from '@/components/IconButton';
import Colors from '@/constants/Colors';
import { RootState } from '@/redux/store';
import { getFilmFromApiById } from '@/services/swApi/swApi';
import { FilmName, Pelicula } from '@/types/types';
import { router, useLocalSearchParams } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, ScrollView, FlatList, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { filmImages } from '@/data/images/images';
import DetailItem from '@/components/DetailItem';
import DetailClickableList from '@/components/DetailClickableList'

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
        <View style={styles.header}>
            <IconButton name={'chevron-back'} onPress={() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
                    router.back();
            }}></IconButton>
            <Text style={[styles.title, { color: Colors[isDarkMode ? 'dark' : 'light'].text }]}>{pelicula?.titulo}</Text>
        </View>

        <Image
          source={filmImages[pelicula?.titulo as FilmName]}
          style={[styles.image, { width: width, height: width }]}
        />

        <DetailItem title="Episodio:" info={`${pelicula?.episodio}`}></DetailItem>
        <DetailItem title="Director:" info={`${pelicula?.director}`}></DetailItem>
        <DetailItem title="Fecha de Estreno:" info={`${pelicula?.fechaEstreno}`}></DetailItem>
        <DetailItem title="Productor:" info={`${pelicula?.productores}`}></DetailItem>
       
        <View style={[styles.itemTextoDeApertura,{backgroundColor: Colors[isDarkMode ? 'light' : 'dark'].background }]}>

            <Text style={[styles.text, { color: Colors[isDarkMode ? 'light' : 'dark'].text }]}>Texto de Apertura:</Text>
            <Text style={[styles.text, { color: Colors[isDarkMode ? 'light' : 'dark'].text }]}>{pelicula?.textoApertura}</Text>
        </View>
      
        <View style={[styles.item,{backgroundColor: Colors[isDarkMode ? 'light' : 'dark'].background }]}>
          <Text style={[styles.text, { color: Colors[isDarkMode ? 'light' : 'dark'].text }]}>Naves Estelares:</Text>
          <Text style={[styles.text, { color: Colors[isDarkMode ? 'light' : 'dark'].text }]}>{pelicula?.especies.length === 0? 'n/a': ''}</Text>
        </View>
        {pelicula?.especies.length === 0? '':<FlatList 

            style={styles.flatList}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            data={species}
            contentContainerStyle={{gap: 10}}
            renderItem={({ item }) => (
                <Text key={item.title} style={[styles.flatListItem, { color: Colors[isDarkMode ? 'light' : 'dark'].text, backgroundColor: Colors[isDarkMode ? 'light' : 'dark'].background}]}>{item.title}</Text>
            )}
            >

            </FlatList>}

        <View style={[styles.item,{backgroundColor: Colors[isDarkMode ? 'light' : 'dark'].background }]}>
          <Text style={[styles.text, { color: Colors[isDarkMode ? 'light' : 'dark'].text }]}>Naves Estelares:</Text>
          <Text style={[styles.text, { color: Colors[isDarkMode ? 'light' : 'dark'].text }]}>{pelicula?.navesEstelares.length === 0? 'n/a': ''}</Text>
        </View>
        {pelicula?.navesEstelares.length === 0? '':<FlatList 

            style={styles.flatList}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            data={ships}
            contentContainerStyle={{gap: 10}}
            renderItem={({ item }) => (
                <Text key={item.title} style={[styles.flatListItem, { color: Colors[isDarkMode ? 'light' : 'dark'].text, backgroundColor: Colors[isDarkMode ? 'light' : 'dark'].background}]}>{item.title}</Text>
            )}
            >

            </FlatList>}
      
        <View style={[styles.item,{backgroundColor: Colors[isDarkMode ? 'light' : 'dark'].background }]}>
          <Text style={[styles.text, { color: Colors[isDarkMode ? 'light' : 'dark'].text }]}>Vehiculos:</Text>
          <Text style={[styles.text, { color: Colors[isDarkMode ? 'light' : 'dark'].text }]}>{pelicula?.vehiculos.length === 0? 'n/a': ''}</Text>
        </View>
          {pelicula?.vehiculos.length === 0? '':<FlatList 

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
            <Text style={[styles.text, { color: Colors[isDarkMode ? 'light' : 'dark'].text }]}>Planetas:</Text>
        </View>
        <FlatList 
            style={styles.flatList}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            data={planets}
            contentContainerStyle={{gap: 10}}
            renderItem={({ item }) => (
                <Pressable 
                    style={({ pressed }) => ({
                        opacity: pressed ? 0.5 : 1,
                    })}
                    onPress={()=>{
                    router.push({pathname:'/planetDetail', params:{ id: item.id}})
                }}>
                        <Text key={item.id} style={[styles.flatListItem, { color: Colors[isDarkMode ? 'light' : 'dark'].text, backgroundColor: Colors[isDarkMode ? 'light' : 'dark'].background}]}>{item.title}</Text>
                </Pressable>
            )}
        >

        </FlatList>

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
    objectFit: 'contain'
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
  itemTextoDeApertura:{
    marginHorizontal: 20,
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