import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

import childrensImg from '../../images/childrens.png';

export default function Second() {
  return(
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image 
          source={childrensImg} 
          style={styles.image}
        />
      </View>
      <Text style={styles.textTitle}>
      Escolha um orfanato no mapa e faça uma visita
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around'
  },

  imageContainer: {
    alignItems: 'center'
  },

  image: {
    height: '85%',
    resizeMode: 'contain',
    marginBottom: 18
  },

  textTitle: {
    maxWidth: 280,
    paddingTop: 10,
    textAlign: 'right',
    color: '#0089A5',
    fontSize: 32,
    lineHeight: 32,
    fontFamily: 'Nunito_800ExtraBold'
  },
});