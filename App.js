/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import Feed from './Screens/Feed';
import WebViewNews from './Screens/WebViewNews'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const App = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Feed' screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Feed" component={Feed} />
        <Stack.Group screenOptions={{ presentation: 'modal' }}>
          <Stack.Screen name='WebViewNews' component={WebViewNews} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};


export default App;
