import { Button, Image, StyleSheet, TextInput, Alert } from 'react-native';
import React, { useEffect, useState } from "react";

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import blogFetch from '@/config';

type TemperatureProps = {
  city?: string;
  temp?: number
}

export default function HomeScreen(){
  const [temperature, setTemperature] = useState<TemperatureProps>();
  const [city, setCity] = useState('');

  const getTemperature = async (cidade: string) => {
    if(!cidade){
      alert("O campo de cidade está vazio");
      return;
    }
    try {
      const response = await blogFetch.get(`/weather?key=1d24e491&city_name=${cidade}`, {
        method: "GET",
      });
      setTemperature(response.data.results);
    } catch (error) {
      console.log('errou')
      alert("Essa cidade não existe tente novamente");
    }
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#c1c9cb' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Temperatura hoje</ThemedText>
        
      </ThemedView>
      
      <TextInput
        style={{
          color: 'white',
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
        }}
       value={city}
       onChangeText={(e)=> setCity(e)}
      />
         <ThemedText type="title">{temperature?.city || ''}</ThemedText>
        <ThemedText type="title">{temperature?.temp! || ''} graus</ThemedText>
        <Button onPress={()=> getTemperature(city)} title='Buscar tempo'></Button>
    
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
