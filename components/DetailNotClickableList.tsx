import Colors from '@/constants/Colors';
import { RootState } from '@/redux/store';
import { router } from 'expo-router';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';

const DetailNotClickableList = ({ data, title}: { title: string, data: { title: string }[]}) => {
    const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  return (
    <View>
        <View style={[styles.item,{backgroundColor: Colors[isDarkMode ? 'light' : 'dark'].background }]}>
            <Text style={[styles.text, { color: Colors[isDarkMode ? 'light' : 'dark'].text }]}>{title}</Text>
            <Text style={[styles.text, { color: Colors[isDarkMode ? 'light' : 'dark'].text }]}>{data.length === 0? 'n/a': ''}</Text>
         </View>
            {data.length === 0? '':<FlatList 
        
                style={styles.flatList}
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                data={data}
                contentContainerStyle={{gap: 10}}
                renderItem={({ item }) => (
                    <Text key={item.title} style={[styles.flatListItem, { color: Colors[isDarkMode ? 'light' : 'dark'].text, backgroundColor: Colors[isDarkMode ? 'light' : 'dark'].background}]}>{item.title}</Text>
                )}
            >
        
        </FlatList>}
    </View>
  );
};

export default DetailNotClickableList

const styles = StyleSheet.create({
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