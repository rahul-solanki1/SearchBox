import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Home} from '../Screens';
import {ScreenName, ScreenTitle} from '../Constants';

const Stake = createStackNavigator();

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

const AppRouter = () => {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
};

export {AppRouter};
