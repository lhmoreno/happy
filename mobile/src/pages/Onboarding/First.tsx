import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

import earthImg from '../../images/earth.png';

export default function First() {
  return(
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image 
          source={earthImg} 
          style={styles.image}
        />
      </View>
      <Text style={styles.textTitle}>
        Leve felicidade para o mundo
      </Text>
      <Text style={styles.text}>
        Visite orfanatos e mude o dia de muitas crianças.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  imageContainer: {
    alignItems: 'center'
  },

  image: {
    height: 200,
    resizeMode: 'contain',
    marginBottom: 18
  },

  textTitle: {
    maxWidth: 200,
    color: '#0089A5',
    fontSize: 40,
    lineHeight: 40,
    fontFamily: 'Nunito_800ExtraBold'
  },

  text: {
    maxWidth: 250,
    color: '#5C8599',
    fontSize: 20,
    fontFamily: 'Nunito_600SemiBold'
  },
});