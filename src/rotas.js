import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Tab = createNativeStackNavigator();

import Principal from './telas/Principal';
import Post from './telas/Post';

export default function Rotas() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Principal" component={Principal} options={{ headerShown: false }} />
        <Tab.Screen name="Post" component={Post} options={{ headerStyle: { backgroundColor: '#417fea' }}}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}