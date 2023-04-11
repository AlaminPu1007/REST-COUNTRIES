import {StyleSheet, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import commonStyles from '../component/commonStyles';
import ThemeSchema from '../component/ThemeSchema';
import theme from '../component/theme';

const SearchComponent = () => {
    // get user device theme color
    const [themeValue] = ThemeSchema();
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
    const onChangeTextMethod = (text: string) => setTextInput(text);
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
                style={styles.textInputStyle}
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
});
