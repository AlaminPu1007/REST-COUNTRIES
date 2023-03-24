import * as React from 'react';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import RootStackNav from './src/navigationFlow/stackNav/RootStackNav';
import {SafeAreaProvider} from 'react-native-safe-area-context';

function App() {
    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <RootStackNav />
            </NavigationContainer>
        </SafeAreaProvider>
    );
}

export default () => {
    return (
        <GestureHandlerRootView style={styles.container}>
            <App />
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
