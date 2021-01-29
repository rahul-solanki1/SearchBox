import React from 'react';

import {NavigationContainer} from '@react-navigation/native';

import {createStackNavigator} from '@react-navigation/stack';

import {Home} from '../Screens';

import {ScreenName, ScreenTitle} from '../Constants';

// Create a stack
const Stake = createStackNavigator();

// Create stack navigator and provide the screen with name & component, so that it can be identified in navigator.
const StackNavigator = () => {
  return (
    <Stake.Navigator>
      <Stake.Screen
        name={ScreenName.Home}
        options={{headerTitle: ScreenTitle.Home}}
        component={Home}
      />
    </Stake.Navigator>
  );
};

// Main app navigation starts from here.
const AppRouter = () => {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
};

export {AppRouter};
