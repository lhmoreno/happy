import React, { useState } from 'react';
import { ScrollView, View, StyleSheet, Text, TextInput } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation, useRoute } from '@react-navigation/native';
import api from '../../services/api';

interface OrphanageDataSecondParams {
  position: {
    latitude: number;
    longitude: number;
  },
  name: string;
  about: string;
  whatsapp: string;
  images: string[];
}

export default function OrphanageDataSecond() {
  const [instructions, setInstructions] = useState('');
  const [opening_hours, setOpeningHours] = useState('');
  const [open_on_weekends, setOpenOnWeekends] = useState(true);

  const navigation = useNavigation();
  const route = useRoute();
  const params = route.params as OrphanageDataSecondParams;

  async function handleCreateOrphanage() {
    const { latitude, longitude } = params.position;
    
    const data = new FormData();

    data.append('name', params.name);
    data.append('about', params.about);
    data.append('whatsapp', params.whatsapp);
    data.append('latitude', String(latitude));
    data.append('longitude', String(longitude));
    data.append('instructions', instructions);
    data.append('opening_hours', opening_hours);
    data.append('open_on_weekends', String(open_on_weekends));
    params.images.forEach((image, index) => {
      data.append('images', {
        name: `image_${index}.jpg`,
        type: 'image/jpg',
        uri: image,
      } as any);
    });

    console.log(data);

    // await api.post('create/orphanage', data);

    // navigation.navigate('OrphanagesMap');
  }
  
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 24 }}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Visitação</Text>
        <View style={styles.pageActiveContainer}>
          <Text style={styles.inactiveText}>01 - </Text>
          <Text style={styles.activeText}>02</Text>
        </View>
      </View>

      <Text style={styles.label}>Instruções</Text>
      <TextInput
        style={[styles.input, { height: 110 }]}
        multiline
        value={instructions}
        onChangeText={setInstructions}
      />

      <Text style={styles.label}>Horario de visitas</Text>
      <TextInput
        style={styles.input}
        value={opening_hours}
        onChangeText={setOpeningHours}
      />

      <View style={styles.inputWeekends}>
        <Text style={styles.label}>Atende final de semana?</Text>
        <View style={styles.switchContainer}>
          <Text 
            style={[
              styles.switchText, 
              open_on_weekends && styles.activeWeekends,
              open_on_weekends && { borderTopLeftRadius: 18, borderBottomLeftRadius: 18 }
            ]}
            onPress={() => !open_on_weekends && setOpenOnWeekends(true)}
          >
            Sim
          </Text>

          <Text 
            style={[
              styles.switchText,
              !open_on_weekends && styles.activeWeekends,
              !open_on_weekends && { borderTopRightRadius: 18, borderBottomRightRadius: 18 }
            ]}
            onPress={() => open_on_weekends && setOpenOnWeekends(false)}
          >
            Não
          </Text>
        </View>
      </View>

      <RectButton style={styles.nextButton} onPress={handleCreateOrphanage}>
        <Text style={styles.nextButtonText}>Confirmar</Text>
      </RectButton>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
    paddingBottom: 24,
    borderBottomWidth: 0.8,
    borderBottomColor: '#D3E2E6'
  },

  title: {
    color: '#5c8599',
    fontSize: 24,
    fontFamily: 'Nunito_700Bold',
  },

  pageActiveContainer: {
    flexDirection: 'row',
  },

  activeText: {
    color: '#5C8599',
    fontFamily: 'Nunito_800ExtraBold'
  },

  inactiveText: {
    color: '#5C8599',
    fontFamily: 'Nunito_400Regular'
  },

  label: {
    color: '#8fa7b3',
    fontFamily: 'Nunito_600SemiBold',
    marginBottom: 8,
  },

  comment: {
    fontSize: 11,
    color: '#8fa7b3',
  },

  input: {
    backgroundColor: '#fff',
    borderWidth: 1.4,
    borderColor: '#d3e2e6',
    borderRadius: 20,
    height: 56,
    paddingVertical: 18,
    paddingHorizontal: 24,
    marginBottom: 16,
    textAlignVertical: 'top',
  },

  uploadedImage: {
    width: 64,
    height: 64,
    borderRadius: 20,
    marginBottom: 32,
    marginRight: 8,
  },

  inputWeekends: {
    marginTop: 16,
  },

  switchContainer: {
    borderWidth: 1.4,
    backgroundColor: '#fff',
    borderColor: '#d3e2e6',
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 56,
  },

  switchText: {
    flex: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#5C8599',
    fontFamily: 'Nunito_600SemiBold',
  },

  activeWeekends: {
    borderWidth: 5,
    borderColor: '#A1E9C5'
  },

  nextButton: {
    backgroundColor: '#3CDC8C',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
    marginTop: 32,
  },

  nextButtonText: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 16,
    color: '#FFF',
  }
});