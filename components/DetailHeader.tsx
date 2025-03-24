import { Pressable, StyleSheet, View } from "react-native";
import { Text } from "./Themed";
import Ionicons from '@expo/vector-icons/Ionicons';
import * as Haptics from 'expo-haptics';
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import Colors from "@/constants/Colors";
import IconButton from "./IconButton";
import { router } from "expo-router";

const DetailHeader = ({ title }: {title: string}) => {
    const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);

    return  <View style={styles.header}>
                <IconButton name={'chevron-back'} onPress={() => {
                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
                        router.back();
                }}></IconButton>
                <Text style={[styles.title, { color: Colors[isDarkMode ? 'dark' : 'light'].text }]}>{title}</Text>
            </View>
}

export default DetailHeader;

const styles = StyleSheet.create({
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
})