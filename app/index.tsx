import { StyleSheet, Text, Image, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';
import { useVideoPlayer, VideoView } from 'expo-video';
import galaxyVideoBg from '../data/videos/galaxy_video_bg.mp4';
const swarWarsLogo = require('../data/images/Star_Wars_Logo.png');
import Button from '@/components/Button'; 
import { View } from '@/components/Themed';
import Colors from '@/constants/Colors';
import { router } from 'expo-router';


const IndexScreen = () => {

   const player = useVideoPlayer(galaxyVideoBg, player => {
    player.loop = true;
    player.play();
  });

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="black" />

        <VideoView style={styles.video} player={player} nativeControls={false}/>

        <SafeAreaView style={styles.column}>
          <Image
            style={styles.image}
            source={swarWarsLogo}
          />

          <Text style={styles.subTitle}>Que la Fuerza te acompañe en esta exploración de la galaxia.</Text>

          <Button title='Comienza tu aventura' onPress={() => {
            router.push('/home')
          }}/>

        </SafeAreaView>
      </View>
    );
};

export default IndexScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    position: 'absolute',
    width: '130%',
    height: '150%',
  },
  column:{
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  image:{
    width: '80%',
    height: 200,
    marginHorizontal: 'auto',
    objectFit: 'contain'
  },
  subTitle:{
    marginHorizontal: 'auto',
    color: Colors.dark.text,
    fontWeight:'300',
    textAlign: 'center',
    fontSize: 22,
    marginBottom: 'auto'
  }

});