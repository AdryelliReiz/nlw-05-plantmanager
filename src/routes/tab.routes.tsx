import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import colors from '../../styles/colors';
import { PLantSelect } from '../pages/PlantSelect';
import { MaterialIcons } from '@expo/vector-icons';
import { MyPlants } from '../pages/MyPlants';
import { Platform } from 'react-native';

const AppTab = createBottomTabNavigator();

const AuthRoutes = () => {
    return(
        <AppTab.Navigator
            tabBarOptions={{
                activeTintColor: colors.green,
                inactiveTintColor: colors.heading,
                labelPosition: 'below-icon',
                style: {
                    paddingVertical: Platform.OS == 'ios' ? 20 : 0,
                    height: 88
                },
        }}>
            <AppTab.Screen 
                name="Nova Planta"
                component={PLantSelect}
                options={{
                    tabBarIcon: (({ size, color }) => (
                        <MaterialIcons 
                            name="add-circle-outline"
                            size={size}
                            color={color}
                        />
                    ))
                }}
            /> 

            <AppTab.Screen 
                name="Minhas Plantas"
                component={MyPlants}
                options={{
                    tabBarIcon: (({ size, color }) => (
                        <MaterialIcons 
                            name="format-list-bulleted"
                            size={size}
                            color={color}
                        />
                    ))
                }}
            />
        </AppTab.Navigator>
    )
}

export default AuthRoutes;
