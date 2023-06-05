import {StyleSheet, TextInput, View} from 'react-native';
import React, {useContext, useState} from 'react';
import commonStyles from '../component/commonStyles';
// import ThemeSchema from '../component/ThemeSchema';
import theme from '../component/theme';
import {Context as DarkModeContext} from '../context/DarkModeContext';

interface propTypes {
    callBackTxt: any;
}

const SearchComponent = ({callBackTxt}: propTypes) => {
    // get user device theme color from context
    const {
        state: {themeValue},
    } = useContext(DarkModeContext);

    // get boolean value of theme
    const isLightMode = themeValue === 'light';

    // define state here
    const [textInput, setTextInput] = useState('');

    /**
     * description :- text input handle method
     * @return {char of text}
     * @created_by :- {ALAMIN}
     * @created_at :- 25/03/2023 14:26:41
     */
    const onChangeTextMethod = (text: string) => {
        callBackTxt(text);
        setTextInput(text);
    };
    return (
        <View
            style={[
                isLightMode
                    ? commonStyles.light_background_color
                    : commonStyles.dark_background_color,
                styles.container,
            ]}>
            <TextInput
                value={textInput}
                placeholder="Search for a country..."
                onChangeText={onChangeTextMethod}
                style={[
                    styles.textInputStyle,
                    !isLightMode ? styles.dark_mode_txt : null,
                ]}
                placeholderTextColor={theme.PLACE_HOLDER_TEXT_COLOR}
            />
        </View>
    );
};

export default SearchComponent;
const styles = StyleSheet.create({
    container: {
        width: '95%',
        marginVertical: 15,
        paddingVertical: 5,
        elevation: 1,
        borderRadius: 5,
    },
    textInputStyle: {
        padding: 0,
        paddingHorizontal: 15,
        paddingVertical: 10,
        fontSize: theme.FONT_SIZE_MEDIUM,
        color: theme.TEXT_PRIMARY_COLOR,
        letterSpacing: 0.5,
    },
    dark_mode_txt: {
        color: theme.PRIMARY_COLOR_LIGHT,
    },
});
