// import {useEffect} from 'react';
import {Appearance} from 'react-native';

const ThemeSchema = () => {
    // useEffect(() => {
    //     if (__DEV__) {
    //         console.log('first');
    //     }
    // }, []);

    const colorScheme = Appearance.getColorScheme();

    return colorScheme;
};

export default ThemeSchema;
