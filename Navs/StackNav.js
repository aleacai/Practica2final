import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import DetailScreen from '../Screens/DetailScreen';
import Home from '../Screens/Home';

const Stack = createStackNavigator();

export default function StackNav(){
    return(
        <Stack.Navigator>
            <Stack.Screen
                name="HomeScreen"
                component={Home}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="Detalles"
                component={DetailScreen}
                options={({route})=>({
                    title: route.params.Ciudad
                })

                }

            />

        </Stack.Navigator>
    )
}