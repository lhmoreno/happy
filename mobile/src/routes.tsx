import React, { useContext, useEffect, useState } from 'react';
import { View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const { Navigator, Screen } = createStackNavigator();

import Onboarding from './pages/Onboarding';
import OrphanagesMap from './pages/OrphanagesMap';
import OrphanageDetails from './pages/OrphanageDetails';

import SelectMapPosition from './pages/CreateOrphanage/SelectMapPosition';
import OrphanageDataFirst from './pages/CreateOrphanage/OrphanageDataFirst';
import OrphanageDataSecond from './pages/CreateOrphanage/OrphanageDataSecond';
import Header from './components/Header';
import ContextOnboarding from './contexts/onboarding';

export default function Routes(){
  const [loading, setLoading] = useState(true);
  const { onboarding, setOnboarding } = useContext(ContextOnboarding)

  useEffect(() => {
    (async () => {
      const onboardingStorage = await AsyncStorage.getItem('onboarding');

      if (!onboardingStorage || onboardingStorage === 'true') {
        setOnboarding(true);
      }

      setLoading(false);
    })()
  }, []);

  if (loading) {
    return <View />
  }

  return (
    <NavigationContainer>
      <Navigator 
        screenOptions={{ 
          headerShown: false, 
          cardStyle: { 
            backgroundColor: '#F2F3F5' 
          } 
        }}
        initialRouteName={onboarding ? 'Onboarding' : 'OrphanagesMap'}
      >
        <Screen 
          name="OrphanagesMap" 
          component={OrphanagesMap} 
        />
        <Screen 
          name="OrphanageDetails" 
          component={OrphanageDetails} 
          options={{
            headerShown: true,
            header: () => <Header showCancel={false} title="Orfanato" />
          }}
        />

        <Screen 
          name="SelectMapPosition" 
          component={SelectMapPosition} 
        />
        <Screen 
          name="OrphanageDataFirst" 
          component={OrphanageDataFirst} 
          options={{
            headerShown: true,
            header: () => <Header title="Informe os dados" />
          }}
        />
        <Screen 
          name="OrphanageDataSecond" 
          component={OrphanageDataSecond} 
        />

        {onboarding && (
          <Screen 
            name="Onboarding" 
            component={Onboarding} 
          />
        )}
      </Navigator>
    </NavigationContainer>
  );
}