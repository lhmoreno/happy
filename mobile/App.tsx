import React from 'react';

import { useFonts } from 'expo-font';
import { Nunito_600SemiBold, Nunito_700Bold, Nunito_800ExtraBold, Nunito_400Regular } from '@expo-google-fonts/nunito';

import Routes from './src/routes';
import { ContextProvider } from './src/contexts/onboarding';

export default function App() {
  const [fontsLoaded] = useFonts({
    Nunito_400Regular,
    Nunito_600SemiBold,
    Nunito_700Bold,
    Nunito_800ExtraBold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ContextProvider>
      <Routes />
    </ContextProvider>
  );
}