import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useContext} from 'react';
import commonStyles from '../component/commonStyles';
import {Context as DarkModeContext} from '../context/DarkModeContext';
interface Props {
    title: string;
}
const Header = ({title = 'Where in the world ?'}: Props) => {
    const {
        state: {themeValue},
        setThemeValue,
    } = useContext(DarkModeContext);

    // get boolean value of theme
    const isLightMode = themeValue === 'light';

    const updateThemeValue = () => {
        const value = themeValue === 'light' ? 'dark' : 'light';
        setThemeValue(value);
    };

    return (
        <View
            style={[
                isLightMode
                    ? commonStyles.light_background_color
                    : commonStyles.dark_background_color,
                styles.container,
            ]}>
            <Text
                style={[
                    isLightMode
                        ? commonStyles.light_large_text_style
                        : commonStyles.dark_large_text_style,
                    styles.welcomeTextStyle,
                ]}>
                {title}
            </Text>
            <TouchableOpacity onPress={updateThemeValue}>
                <Text
                    // onPress={toggleTheme}
                    style={[
                        isLightMode
                            ? commonStyles.light_medium_text_style
                            : commonStyles.dark_medium_text_style,
                        styles.darkTextStyle,
                    ]}>
                    {themeValue === 'light' ? 'Dark Mode' : 'Light Mode'}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default Header;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingHorizontal: 10,
        paddingVertical: 20,
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
