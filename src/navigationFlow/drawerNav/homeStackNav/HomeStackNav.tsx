import React from 'react';
import {
    createNativeStackNavigator,
    NativeStackScreenProps,
} from '@react-navigation/native-stack';
import HomeScreen from '../../../Screens/homeScreen';
import PreviewScreen from '../../../Screens/homeScreen/PreviewScreen';

export type RootHomeStackParamList = {
    Dashboard: undefined,
    preview: {name: string},
};

export type HomeScreenNavigationProp = NativeStackScreenProps<
    RootHomeStackParamList,
    // eslint-disable-next-line prettier/prettier
    'Dashboard'
>;

// This allows us to type check route names and params which you're navigating using navigate,
// push etc. The name of the current route is necessary to type check the params in route.params
// https://reactnavigation.org/docs/typescript/#type-checking-screens
export type PreviewScreenNavigationProp = NativeStackScreenProps<
    RootHomeStackParamList,
    // eslint-disable-next-line prettier/prettier
    'preview'
>;

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
