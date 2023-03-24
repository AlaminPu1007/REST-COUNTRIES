import {SafeAreaView, StyleSheet, View} from 'react-native';
import React from 'react';
import commonStyles from '../../component/commonStyles';
import ThemeSchema from '../../component/ThemeSchema';
import Header from '../../commonComponent/Header';
import SearchComponent from '../../commonComponent/SearchComponent';

const HomeScreen = () => {
    // get user device theme color
    const userTheme = ThemeSchema();
    const colorScheme = userTheme === 'light';

    return (
        <SafeAreaView style={commonStyles.safeAreaViewStyle}>
            <View
                style={[
                    colorScheme
                        ? commonStyles.light_container
                        : commonStyles.dark_container,
                    styles.container,
                ]}>
                <Header />
                <SearchComponent />
            </View>
        </SafeAreaView>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
    },
});
