import React, {useContext, useEffect} from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DrawerNav from '../drawerNav/DrawerNav';
import {Context as DarkModeContext} from '../../context/DarkModeContext';

export type RootStackParamList = {
    Dashboard: undefined,
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootStackNav = () => {
    const {getThemeValue} = useContext(DarkModeContext);

    // get user-schema from local-storage
    useEffect(() => {
        getThemeValue();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Dashboard" component={DrawerNav} />
        </Stack.Navigator>
    );
};

export default RootStackNav;
