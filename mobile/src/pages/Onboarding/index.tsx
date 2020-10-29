import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';

import ContextOnboarding from '../../contexts/onboarding';
import First from './First';
import Second from './Second';
import { useNavigation } from '@react-navigation/native';

export default function Onboarding() {
  const [page, setPage] = useState(1);
  const { setOnboarding } = useContext(ContextOnboarding);
  const { navigate } = useNavigation();

  useEffect(() => {
    if (page === 3) {
      (async () => {
        await AsyncStorage.setItem('onboarding', 'false');
        setOnboarding(false);
        navigate('OrphanagesMap');
      })()
    }
  }, [page])

  return (
    <View style={styles.container}>

      { page === 1 &&  <First /> }
      { page === 2 &&  <Second /> }
      { page === 3 &&  <Second /> }

      <View style={styles.footer}>
        <View style={styles.activePageContainer}>
          <View style={ page === 1 ? styles.activePage : styles.inactivePage }/>
          <View style={ page === 2 ? styles.activePage : styles.inactivePage }/>
        </View>

        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => setPage(before => before + 1)}
        >
          <View style={styles.button}>
            <Feather name="arrow-right" size={24} color="#15B6D6"/>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    justifyContent: 'space-around'
  },

  footer: {
    marginTop: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  activePageContainer: {
    flexDirection: 'row',
    width: 40,
    justifyContent: 'space-between'
  },

  activePage: {
    width: 22,
    height: 8,
    borderRadius: 5,
    backgroundColor: '#FFD152'
  },

  inactivePage: {
    width: 8,
    height: 8,
    borderRadius: 5,
    backgroundColor: '#BECFD8'
  },

  button: {
    backgroundColor: '#D1EDF2',
    width: 56,
    height: 56,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center'
  }
});