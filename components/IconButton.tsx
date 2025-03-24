import { Pressable, StyleSheet } from "react-native";
import { Text } from "./Themed";
import Ionicons from '@expo/vector-icons/Ionicons';
import * as Haptics from 'expo-haptics';
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import Colors from "@/constants/Colors";

const IconButton = ({name, onPress}: {name: string , onPress: () => void}) => {
    const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);

    return  <Pressable  onPress={()=>{
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
                onPress();
            }}
            style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
                ...styles.pressable
            })}
        >
        <Ionicons name={name as any} style={[styles.icon, {color: Colors[isDarkMode ? 'dark' : 'light'].text}]}/>
    </Pressable>
}

export default IconButton;

const styles = StyleSheet.create({
    pressable:{

    },
    icon:{
        fontSize: 30
    }
})