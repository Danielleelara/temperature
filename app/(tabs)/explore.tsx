import Ionicons from '@expo/vector-icons/Ionicons';
import React, {useEffect, useState} from 'react';
import { StyleSheet,TextInput, Text, Button, Alert, FlatList, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ParallaxScrollView from '@/components/ParallaxScrollView';

type Data = {
  name: string;
  address: string;
  age: string
}

export default function TabTwoScreen() {
  const [infos, setInfos] = useState<Data[]>([])
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [age, setAge] = useState('');


  const sendData = async (value: Data[]) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('userInfos', jsonValue);
    } catch (e) {
      Alert.alert('Deu erro')
    }
  };

  const loadData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('userInfos');

      console.log('jason', jsonValue)
     const result =  jsonValue != null ? JSON.parse(jsonValue) : [];
     console.log('res', result)
    
     setInfos(result)
    } catch (e) {
      Alert.alert('Não foi possivel buscar os dados')
    }
  };

  const handleAddContact = () => {
    if(name && address && age){
      const result = [...infos, {name, address, age}]
      setInfos(result);
      sendData(result)
    }

  };

  useEffect(()=> {
    loadData();
  }, [])

  return (
    <View style={styles.headerImage}>
      <Text  style={styles.label}>Nome</Text>

      <TextInput
        style={styles.inputCadastro}
        value={name}
        onChangeText={(e)=> setName(e)}
      />
      <Text  style={styles.label}>Endereço</Text>
      <TextInput
        style={styles.inputCadastro}
        value={address}
        onChangeText={(e)=> setAddress(e)}
      />
      <Text  style={styles.label}>Idade</Text>
      <TextInput
        style={styles.inputCadastro}
        value={age}
        onChangeText={(e)=> setAge(e)}
      />
      <Button title='Adicionar' onPress={() => handleAddContact()}></Button>
      <FlatList
        data={infos}
        keyExtractor={(item) => item.name + 1}
        renderItem={({ item }) => 
          <>
          <Text  style={styles.label}>{item?.name}</Text>
          <Text  style={styles.label}>{item?.address}</Text>
          <Text  style={styles.label}>{item?.age}</Text>
          </>
        }
      />
 

    </View>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: 'white',
    bottom: -90,
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  label: {
    paddingTop: 10,
    color: 'white',
  },
  inputCadastro: {
    color: 'white',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
  },
  list: {
    color: 'white',
  }
});
