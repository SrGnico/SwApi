import Colors from '@/constants/Colors';
import { Pressable, StyleSheet, Text } from 'react-native';
import * as Haptics from 'expo-haptics';

const Button = ({ title, onPress }: { title: string, onPress: () => void }) => {
    return (
        <Pressable 
            style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
                ...styles.pressable
            })}
            onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
                onPress();
            }}>
            <Text style={styles.title}>{title}</Text>
        </Pressable>
    );
};

export default Button;

const styles = StyleSheet.create({
    pressable: {
        borderRadius: 50,
        borderWidth: 1,
        borderColor: Colors.dark.tint,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10
    },
    title: {
        color: Colors.dark.text,
        fontSize: 16,
        fontWeight: 'bold',
    }
});