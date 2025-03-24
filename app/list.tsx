import Colors from '@/constants/Colors';
import { router, useLocalSearchParams } from 'expo-router';
import { Button, FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { useState, useEffect } from 'react';
import { getPlanetsFromApi, getPeopleFromApi } from '../services/swApi/swApi';
import { Planeta, Persona } from '../types/types';
import IconButton from '@/components/IconButton';

const ListScreen = () => {
    const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
    const { category } = useLocalSearchParams();
    const [data, setData] = useState<(Planeta | Persona)[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isSearching, setIsSearching] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredData, setFilteredData] = useState<(Planeta | Persona)[]>([]);

    const fetchData = async (category: string, page: number) => {
        setLoading(true);
        setError(null);
        try {
            let response;
            if (category === 'Planetas') {
                response = await getPlanetsFromApi(page);
            } else if (category === 'Personas') {
                response = await getPeopleFromApi(page);
            } else {
                throw new Error("Categoría no válida");
            }

            setData(response.results);
            setTotalPages(response.totalPages); // Manejo de paginación
        } catch (err) {
            setError("Hubo un error al obtener los datos.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (category) {
            fetchData(category as string, currentPage);
        }
    }, [category, currentPage]);

    const handleSearch = async (searchQuery: string) => {
        if (searchQuery !== '') {
            setLoading(true);
            setError(null);
            try {
                let response;
                if (category === 'Planetas') {
                    response = await getPlanetsFromApi(1, searchQuery);
                } else if (category === 'Personas') {
                    response = await getPeopleFromApi(1, searchQuery);
                } else {
                    throw new Error("Categoría no válida");
                }

                setFilteredData(response.results);
            } catch (err) {
                setError("Hubo un error al obtener los datos.");
            } finally {
                setLoading(false);
            }
        }
    };

    const getIdFromUrl = (url: string) => {
        const parts = url.split('/').filter(Boolean); 
        return parts[parts.length - 1]; 
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.row}>
                <IconButton name={'chevron-back'} onPress={() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
                    router.back();
                }}></IconButton>

                {isSearching ?
                    <TextInput
                        style={styles.textInput}
                        placeholder={`Buscar ${category}...`}
                        onChangeText={setSearchQuery}
                        onSubmitEditing={(e) => {
                            handleSearch(e.nativeEvent.text);
                        }}
                        value={searchQuery}
                    ></TextInput>
                    :
                    <Text style={[styles.title, { color: Colors[isDarkMode ? 'dark' : 'light'].text }]}>{category}</Text>
                }

                {isSearching ?
                    <IconButton name={'close'} onPress={() => {
                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
                        setIsSearching(false);
                        setSearchQuery('');
                        setFilteredData([])
                    }}></IconButton>
                    :
                    <IconButton name={'search'} onPress={() => {
                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
                        setIsSearching(true);
                    }}></IconButton>
                }
            </View>

            <FlatList
                style={styles.flatList}
                scrollEnabled={false}
                contentContainerStyle={{ gap: 10 }}
                data={isSearching ? filteredData : data}
                renderItem={({ item }) => (
                    <Pressable
                        style={({ pressed }) => ({
                            opacity: pressed ? 0.5 : 1,
                            ...styles.item, backgroundColor: Colors[isDarkMode ? 'light' : 'dark'].background
                        })}
                        onPress={() => {
                            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
                            if(category === 'Planetas')router.push({ pathname: '/planetDetail', params: { id: getIdFromUrl(item.url)} })
                            if(category === 'Personas')router.push({ pathname: '/peopleDetail', params: { id: getIdFromUrl(item.url)} })
                        }}>
                        <Text style={[styles.nombre, { color: Colors[isDarkMode ? 'light' : 'dark'].text }]}>{item.nombre}</Text>
                    </Pressable>
                )}
            >
            </FlatList>
            {isSearching ? "" :
                <View style={styles.navigation}>
                    <IconButton name={'chevron-back'} onPress={() => {
                        setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }}></IconButton>
                    <Text style={[styles.navigationIndex, { color: Colors[isDarkMode ? 'dark' : 'light'].text }]}>Página {currentPage} de {totalPages}</Text>
                    <IconButton name={'chevron-forward'} onPress={() => {
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }}></IconButton>
                </View>
            }
        </SafeAreaView>
    );
};

export default ListScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    row: {
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
    textInput: {
        flex: 1,
        fontSize: 20,
        height: 40,
        borderRadius: 50,
        paddingHorizontal: 20,
        backgroundColor: 'lightgray'
    },
    flatList: {
        marginVertical: 20
    },
    item: {
        height: 50,
        justifyContent: 'center',
        paddingHorizontal: 20,
        borderRadius: 10
    },
    nombre: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    navigation: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    navigationIndex: {
        fontWeight: 'bold',
        fontSize: 16,
        marginHorizontal: 10
    }
});