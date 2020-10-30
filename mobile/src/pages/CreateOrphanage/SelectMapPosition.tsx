import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, Text, Image, TouchableWithoutFeedback } from 'react-native';

import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import MapView, { Marker, MapEvent } from 'react-native-maps';

import mapMarkerImg from '../../images/map-marker.png';
import selectImg from '../../images/select.png';
import Header from '../../components/Header';

interface MapPositionParams {
  location: {
    latitude: number;
    longitude: number;
  }
}

export default function SelectMapPosition() {
  const navigation = useNavigation();
  const { params } = useRoute<RouteProp<Record<string, MapPositionParams>, string>>();
  const [position, setPosition] = useState({ latitude: 0, longitude: 0 });
  const [first, setFirst] = useState(true);

  function handleNextStep() {
    navigation.navigate('OrphanageDataFirst', { position });
  }

  function handleSelectMapPosition(event: MapEvent) {
    setPosition(event.nativeEvent.coordinate);
  }

  return (
    <>
      {!first && <Header title="Selecione no mapa" />}
      <View style={styles.container}>
        {first && (
          <TouchableWithoutFeedback
            onPressIn={() => setFirst(false)}
            onPress={() => setFirst(false)}
          >
            <View style={styles.guide}>
              <Image source={selectImg}/> 
              <Text style={styles.guideText}>
                Toque no mapa para adicionar um orfanato
              </Text>
            </View>
          </TouchableWithoutFeedback>
        )}

        <MapView 
          initialRegion={{
            latitude: params.location.latitude,
            longitude: params.location.longitude,
            latitudeDelta: 0.008,
            longitudeDelta: 0.008,
          }}
          style={styles.mapStyle}
          onPress={handleSelectMapPosition}
        >
          {position.latitude !== 0 && (
            <Marker 
              icon={mapMarkerImg}
              coordinate={{ latitude: position.latitude, longitude: position.longitude }}
            />
          )}
        </MapView>
        {position.latitude !== 0 && (
          <RectButton style={styles.nextButton} onPress={handleNextStep}>
            <Text style={styles.nextButtonText}>Próximo</Text>
          </RectButton>
        )}
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative'
  },

  guide: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: '#15B6D6',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.7,
    zIndex: 5,
    paddingHorizontal: 75
  },

  guideText: {
    marginTop: 24,
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 24,
    color: '#FFF',
    textAlign: 'center'
  },

  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },

  nextButton: {
    backgroundColor: '#15c3d6',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,

    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 40,
  },

  nextButtonText: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 16,
    color: '#FFF',
  }
});