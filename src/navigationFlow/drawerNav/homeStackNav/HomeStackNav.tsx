import React from 'react';
import {
    createNativeStackNavigator,
    NativeStackScreenProps,
} from '@react-navigation/native-stack';
import HomeScreen from '../../../Screens/homeScreen';

export type RootHomeStackParamList = {
    Dashboard: undefined,
    Setting: undefined,
};

export type Props = NativeStackScreenProps<RootHomeStackParamList>;

const Stack = createNativeStackNavigator<RootHomeStackParamList>();

const HomeStackNav = () => {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Dashboard" component={HomeScreen} />
        </Stack.Navigator>
    );
};

export default HomeStackNav;
