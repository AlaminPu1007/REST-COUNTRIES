import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';
import HomeStackNav from './homeStackNav/HomeStackNav';

export type RootDrawerStackParamList = {
    Home: undefined,
};

const Drawer = createDrawerNavigator<RootDrawerStackParamList>();

function DrawerNav() {
    return (
        <Drawer.Navigator screenOptions={{headerShown: false}}>
            <Drawer.Screen name="Home" component={HomeStackNav} />
        </Drawer.Navigator>
    );
}

export default DrawerNav;
