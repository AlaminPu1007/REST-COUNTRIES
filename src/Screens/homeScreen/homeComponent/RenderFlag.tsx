import {
    Image,
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import React from 'react';
import ThemeSchema from '../../../component/ThemeSchema';
import commonStyles from '../../../component/commonStyles';
import theme from '../../../component/theme';
import {Props} from '../../../navigationFlow/drawerNav/homeStackNav/HomeStackNav';
import {useNavigation} from '@react-navigation/native';

const {width} = Dimensions.get('window');

const RenderFlag = ({data}: any) => {
    // get user device theme color
    const [themeValue] = ThemeSchema();
    // get boolean value of theme
    const isLightMode = themeValue === 'light';
    // define use-navigation to access navigation
    const navigation: any = useNavigation<Props>();

    const navigateToItemPreview = () =>
        navigation.navigate('preview', {name: data.name.common});

    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={navigateToItemPreview}
            style={[
                isLightMode
                    ? commonStyles.light_background_color
                    : commonStyles.dark_background_color,
                styles.container,
            ]}>
            <Image style={styles.imageStyle} source={{uri: data?.flags?.png}} />
            <View style={styles.countryInfo}>
                <Text
                    style={[
                        isLightMode
                            ? commonStyles.light_large_text_style
                            : commonStyles.dark_large_text_style,
                        styles.countryNameStyle,
                    ]}>
                    {data.name.common}
                </Text>
                <View>
                    <Text>
                        Population : <Text>{data?.population || 0}</Text>{' '}
                    </Text>
                    <Text>
                        Region : <Text>{data?.region || 'region'}</Text>{' '}
                    </Text>
                    <Text>
                        Capital : <Text>{data?.capital || 'capital'}</Text>{' '}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default RenderFlag;

const styles = StyleSheet.create({
    container: {
        width: '90%',
        marginBottom: 30,
        borderRadius: 10,
        elevation: 1,
        shadowProp: {
            shadowColor: '#171717',
            shadowOffset: {width: -2, height: 4},
            shadowOpacity: 0.2,
            shadowRadius: 3,
        },
    },
    imageStyle: {
        width: width - 42,
        height: 250,
        resizeMode: 'stretch',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    countryInfo: {
        marginHorizontal: 30,
        paddingVertical: 40,
    },
    countryNameStyle: {
        fontSize: theme.FONT_SIZE_LARGE + 5,
        fontWeight: '700',
        paddingBottom: 20,
    },
});
