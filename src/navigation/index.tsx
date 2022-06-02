import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppStack from './app';

export default function App() {
  return (
    <NavigationContainer>
        <AppStack />
    </NavigationContainer>
  );
}