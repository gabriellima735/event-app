import { Text, TextInput, TouchableOpacity, View, FlatList, Alert } from 'react-native'
import { styles } from './styles'
import { Participant } from '../../components/Participant'
import React, { useState } from 'react';

export function Home(){

  const [participants, setParticipants] = useState<string[]>(['Gabriel','Arthur','João','Pedro']);
  const [participanteName, setParticipantName] = useState('');

  function handleParticipantAdd(){
    if(participants.includes(participanteName)){
      return Alert.alert('Participante existe', 'Já existe um participante na lista')
    }

    setParticipants(prevState => [...prevState, participanteName]);
    
  }

  function handleParticipantRemover( name: String){

    Alert.alert('Remover', `Remover o participante ${name}?`, [
      {
        text: 'Sim',
        onPress: () => setParticipants(prevState => prevState.filter(participant => participant !== name)),
      },
      {
        text: 'Não',
        style: 'cancel'
      }
    ])
  }

  return(
    <View style={styles.container}>
      <Text style={styles.eventName}>
        Semana da Computação
      </Text>
      <Text style={styles.eventDate}>
        Sexta, 4 de Novembro de 2024
      </Text>

      <View style={styles.form}>
        <TextInput 
          style={styles.input}
          placeholder='Nome do participante'
          placeholderTextColor={'#6B6B6B'}
          onChangeText={setParticipantName}
          value={participanteName}
        />
        
        <TouchableOpacity style={styles.button} onPress={handleParticipantAdd}>
          <Text style={styles.buttonText}>
            +
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList 
        data={participants}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <Participant 
            key={item}
            name={item}
            onRemove={() => handleParticipantRemover(item)}/>
        )}
        showsVerticalScrollIndicator={false} 
        ListEmptyComponent={() => (
          <Text style={styles.listEmptyText}>
            Niguém chegou no evento ainda? Adicione participantes a sua lista de presença!
          </Text>
        )}
      />
     
    </View>
  )
}