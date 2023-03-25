import {Image, StyleSheet, Text, View, Dimensions} from 'react-native';
import React from 'react';
import ThemeSchema from '../../../component/ThemeSchema';
import commonStyles from '../../../component/commonStyles';
import theme from '../../../component/theme';

const {width} = Dimensions.get('window');

const RenderFlag = ({data}: any) => {
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
            <Image style={styles.imageStyle} source={{uri: data?.flags?.png}} />
            <View style={styles.countryInfo}>
                <Text
                    style={[
                        colorScheme
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
        </View>
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
