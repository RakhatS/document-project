import React from 'react'
import { StyleSheet, Text, View, Platform, Image, FlatList, TouchableOpacity } from 'react-native'
import { Appbar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons'
import { Avatar, Button, Card, IconButton  } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const debateFormats = [
  { id: 1, name: 'Парламентские дебаты (Американский формат)' },
  { id: 2, name: 'Парламентские дебаты (Британский формат)' },
  { id: 3, name: 'Политические дебаты' },
  { id: 4, name: 'Программа дебатов Карла Поппера' },
  { id: 5, name: 'Модель Организации Объединенных Наций' },
  { id: 6, name: 'Дебаты Линкольна-Дугласа' },
  { id: 7, name: 'Открытые дебаты' },
];


const DebateKeeper = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* <MyComponent /> */}
      <Text>Formates:</Text>
      <FlatList
      data={debateFormats}
      renderItem={({item})=>{
        return(
         <TouchableOpacity key={item.id} style={styles.btnContainer} onPress={()=>navigation.navigate("TimerScreen", item.name)}>
           <Text style={styles.btnText}>{item.name}</Text>
           <Icon name="chevron-forward-outline" size={18} />
         </TouchableOpacity>
        )
      }}
      />
    </View>
  )
}

export default DebateKeeper

const styles = StyleSheet.create({
  container: {

  },
  header:{

  },
  btnContainer:{
    padding:10,
    backgroundColor: '#7B7B7B',
    borderRadius: 15,
    marginBottom: 10,
    flexDirection: 'row'
  },
  btnText: {

  }
})

const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';

const MyComponent = () => (
    <Appbar.Header>
       <Appbar.Content title="Title"  />
        <Appbar.Action icon="magnify" onPress={() => {}} />
        <Appbar.Action icon={MORE_ICON} onPress={() => {}} />
    </Appbar.Header>
);
