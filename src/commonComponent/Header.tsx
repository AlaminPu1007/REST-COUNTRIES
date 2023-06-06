import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
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
            <TouchableOpacity onPress={updateThemeValue} activeOpacity={0.9}>
                <Image
                    source={require('../assets/preferences.png')}
                    style={styles.dark_image}
                />
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
        alignItems: 'center',
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

    dark_image: {
        width: 30,
        height: 30,
        resizeMode: 'cover',
    },
});
