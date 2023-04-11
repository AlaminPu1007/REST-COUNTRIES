import React from 'react';
import {
    createNativeStackNavigator,
    NativeStackScreenProps,
} from '@react-navigation/native-stack';
import HomeScreen from '../../../Screens/homeScreen';
import PreviewScreen from '../../../Screens/homeScreen/PreviewScreen';

export type RootHomeStackParamList = {
    Dashboard: undefined,
    preview: {itemName: string},
};

export type Props = NativeStackScreenProps<RootHomeStackParamList>;

const Stack = createNativeStackNavigator<RootHomeStackParamList>();

const HomeStackNav = () => {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Dashboard" component={HomeScreen} />
            <Stack.Screen name="preview" component={PreviewScreen} />
        </Stack.Navigator>
    );
};

export default HomeStackNav;
