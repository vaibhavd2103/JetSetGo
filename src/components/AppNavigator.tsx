import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Login from '../screens/Login';
import {SCREENS} from '../constants/routes';
import SignUp from '../screens/SignUp';
import Home from '../screens/Home';
import FlightDetails from '../screens/FlightDetails';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="login"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name={SCREENS.LOGIN} component={Login} />
        <Stack.Screen name={SCREENS.SIGNUP} component={SignUp} />
        <Stack.Screen name={SCREENS.HOME} component={Home} />
        <Stack.Screen name={SCREENS.FLIGHT_DETAILS} component={FlightDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
