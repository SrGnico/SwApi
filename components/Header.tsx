import { StyleSheet, Image, Switch, Pressable } from "react-native";
import { Text, View } from "./Themed";
import IconButton from "./IconButton";
const swarWarsLogoNegro = require('../data/images/Star_Wars_Logo_Negro.png');
const swarWarsLogoBlanco = require('../data/images/Star_Wars_Logo_Blanco.png');
const ladoLuz = require('../data/images/lado_luz.png');
const ladoOscuro = require('../data/images/lado_oscuro.png');

import * as Haptics from 'expo-haptics';
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { toggleTheme } from "../redux/slices/themeSlice";
import Colors from "@/constants/Colors";

const Header = () =>{
    const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
    const dispatch = useDispatch<AppDispatch>();

    return <View style={[styles.container, {backgroundColor: Colors[isDarkMode ? 'light' : 'dark'].text }]}>
        <IconButton onPress={()=>{
            //Todo: Menu?
        }} name="menu"></IconButton>
        <Image style={styles.logo} source={isDarkMode ? swarWarsLogoBlanco : swarWarsLogoNegro } />
        <Pressable
        onPress={()=>{
            dispatch(toggleTheme())
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
            
        }}>
            <Image style={styles.image} source={isDarkMode ? ladoOscuro : ladoLuz } />
        </Pressable>
    </View>
};

export default Header;

const styles = StyleSheet.create({
    container:{
        paddingHorizontal: 20,
        flexDirection: 'row',
        width: '100%',
        height: 60,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    logo:{
        height: 100,
        width: 120,
        objectFit: 'contain'
    },
    image:{
        height: 35,
        width: 35
    }
});