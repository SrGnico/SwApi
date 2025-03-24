import Colors from '@/constants/Colors';
import { RootState } from '@/redux/store';
import { StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';

const DetailItem = ({title, info }: {title: string, info: string}) => {
    const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  return (
    <View style={[styles.item,{backgroundColor: Colors[isDarkMode ? 'light' : 'dark'].background }]}>
        <Text style={[styles.text, { color: Colors[isDarkMode ? 'light' : 'dark'].text }]}>{title}</Text>
        <Text style={[styles.text, { color: Colors[isDarkMode ? 'light' : 'dark'].text }]}>{info}</Text>
    </View>
  );
};

export default DetailItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center'
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
  title: {
    fontSize: 32,
    height: 40,
    fontWeight: 'bold',
    marginRight: 'auto'
  },
  text:{
    fontSize: 16
  },
});