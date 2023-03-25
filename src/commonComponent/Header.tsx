import {Text, View, StyleSheet} from 'react-native';
import React from 'react';
import commonStyles from '../component/commonStyles';
import ThemeSchema from '../component/ThemeSchema';

const Header = () => {
    // get user device theme color
    const userTheme = ThemeSchema();
    const colorScheme = userTheme === 'light';

    return (
        <View
            style={[
                colorScheme
                    ? commonStyles.light_background_color
                    : commonStyles.dark_background_color,
                styles.container,
            ]}>
            <Text
                style={[
                    colorScheme
                        ? commonStyles.light_large_text_style
                        : commonStyles.dark_large_text_style,
                    styles.welcomeTextStyle,
                ]}>
                Where in the world ?
            </Text>
            <Text
                style={[
                    colorScheme
                        ? commonStyles.light_medium_text_style
                        : commonStyles.dark_medium_text_style,
                    styles.darkTextStyle,
                ]}>
                Dark Mode
            </Text>
        </View>
    );
};

export default Header;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingHorizontal: 10,
        paddingVertical: 35,
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'space-between',
        elevation: 1.5,
        // for ios
        shadowProp: {
            shadowColor: '#171717',
            shadowOffset: {width: -2, height: 4},
            shadowOpacity: 0.2,
            shadowRadius: 3,
        },
    },
    welcomeTextStyle: {
        fontWeight: '700',
        fontSize: 20,
    },
    darkTextStyle: {
        fontWeight: '600',
    },
});
