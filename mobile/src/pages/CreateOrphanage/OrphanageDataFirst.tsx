import React, { useEffect, useState } from 'react';
import { ScrollView, View, StyleSheet, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';

interface OrphanageDataFirstParams {
  position: {
    latitude: number;
    longitude: number;
  }
}

export default function OrphanageDataFirst() {
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [disabled, setDisabled] = useState(true);

  const navigation = useNavigation();
  const route = useRoute();
  const params = route.params as OrphanageDataFirstParams;

  async function handleSelectImages(imageDelete: string | null) {
    if (imageDelete) {
      const newImages: string[] = [];
      images.forEach((image) => {
        if (image === imageDelete) return;
        newImages.push(image);
      });
      setImages(newImages);
      return;
    }

    const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
  
    if (status !== 'granted') {
      alert('Eita, precisamos de acesso às suas fotos...');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (result.cancelled) {
      return;
    }

    const { uri: image } = result;

    setImages([...images, image]);
  }

  useEffect(() => {
    if (name !== '' && about !== '' && whatsapp !== '' && images.length !== 0) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [name, about, whatsapp, images]);
  
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 24 }}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Dados</Text>
        <View style={styles.pageActiveContainer}>
          <Text style={styles.activeText}>01</Text>
          <Text style={styles.inactiveText}> - 02</Text>
        </View>
      </View>

      <Text style={styles.label}>Nome</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Sobre</Text>
      <TextInput
        style={[styles.input, { height: 110 }]}
        multiline
        value={about}
        onChangeText={setAbout}
      />

      <Text style={styles.label}>Whatsapp</Text>
      <TextInput
        style={styles.input}
        value={whatsapp}
        onChangeText={setWhatsapp}
        keyboardType="numeric"
        maxLength={13}
      />

      <Text style={styles.label}>Fotos</Text>

      <View style={styles.uploadedImagesContainer}>
        {images.map((image, index) => {
          return (
            <LinearGradient
              key={image}
              colors={['#FFC2D8', '#A1E9C5']}
              start={{ x: 0.8, y: 0.1 }}
              style={styles.imageBorderContainer}
            >
              <LinearGradient
                colors={['#FCF0F4', '#EDFFF6']}
                start={{ x: 0.99, y: 0 }}
                style={styles.imageContainer}
              >
                <View style={styles.imagePreview}>
                  <Image 
                    source={{ uri: image }}
                    style={styles.uploadedImage}
                  />

                  <Text style={styles.previewText}>imagem_{index < 9 && '0'}{index + 1}.jpg</Text>
                </View>
                <Feather name="x" size={24} color="#FF669D" onPress={() => handleSelectImages(image)}/>
              </LinearGradient>
            </LinearGradient>
          );
        })}
      </View>

      <TouchableOpacity 
        style={styles.imagesInput} 
        onPress={() => handleSelectImages(null)}
      >
        <Feather name="plus" size={24} color="#15B6D6" />
      </TouchableOpacity>

      <RectButton 
        style={[
          styles.nextButton, 
          disabled && { opacity: 0.5 }
        ]} 
        onPress={() => !disabled && navigation.navigate('OrphanageDataSecond', {
          position: params.position,
          name,
          about,
          whatsapp,
          images
        })}
      >
        <Text style={styles.nextButtonText}>Próximo</Text>
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

  uploadedImagesContainer: {
    // flexDirection: 'row',
  },

  imageBorderContainer: {
    padding: 1,
    borderRadius: 20,
    marginBottom: 8
  },

  imageContainer: {
    borderRadius: 20,
    padding: 4,
    paddingRight: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  imagePreview: {
    flexDirection: 'row'
  },

  previewText: {
    color: '#37C77F',
    fontFamily: 'Nunito_600SemiBold',
    fontSize: 16,
    marginLeft: 16,
    marginTop: 8
  },

  uploadedImage: {
    width: 64,
    height: 64,
    borderRadius: 20,
  },

  imagesInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderStyle: 'dashed',
    borderColor: '#96D2F0',
    borderWidth: 1.4,
    borderRadius: 20,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },

  nextButton: {
    backgroundColor: '#15c3d6',
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