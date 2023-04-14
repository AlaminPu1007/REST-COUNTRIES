import {
    Dimensions,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {PreviewScreenNavigationProp} from '../../navigationFlow/drawerNav/homeStackNav/HomeStackNav';
import Api from '../../api/Api';
import {SafeAreaView} from 'react-native-safe-area-context';
import ThemeSchema from '../../component/ThemeSchema';
import commonStyles from '../../component/commonStyles';
import Header from '../../commonComponent/Header';
import theme from '../../component/theme';
import {heightToDp} from '../../component/Responsive';

const {width} = Dimensions.get('window');

const PreviewScreen = ({route}: PreviewScreenNavigationProp) => {
    const {name} = route.params;

    // get user device theme color
    const [themeValue] = ThemeSchema();
    // get boolean value of theme
    const isLightMode = themeValue === 'light';

    //define state
    const [countryInfo, setCountryInfo] = useState<any>({});

    useEffect(() => {
        getCountryInfo();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [route]);

    const getCountryInfo = async () => {
        try {
            const res = await Api.get(
                `https://restcountries.com/v3.1/name/${name}`,
            );
            //store info
            setCountryInfo(res.data[0] || {});
        } catch (errors: any) {
            if (__DEV__) {
                console.log(errors.message);
            }
        }
    };

    return (
        <SafeAreaView style={commonStyles.safeAreaViewStyle}>
            <View
                style={[
                    isLightMode
                        ? commonStyles.light_container
                        : commonStyles.dark_container,
                    styles.container,
                ]}>
                <Header title="Where in the world ?" />
                <TouchableOpacity
                    activeOpacity={0.8}
                    // onPress={navigateToItemPreview}
                    style={[
                        isLightMode
                            ? commonStyles.light_background_color
                            : commonStyles.dark_background_color,
                        styles.btnContainer,
                    ]}>
                    <Image
                        style={styles.imageStyle}
                        source={{uri: countryInfo?.flags?.png}}
                    />
                    <View style={styles.countryInfo}>
                        <Text
                            style={[
                                isLightMode
                                    ? commonStyles.light_large_text_style
                                    : commonStyles.dark_large_text_style,
                                styles.countryNameStyle,
                            ]}>
                            {countryInfo?.name?.common || 'country-name'}
                        </Text>
                        <View>
                            <Text>
                                Population :{' '}
                                <Text>{countryInfo?.population || 0}</Text>{' '}
                            </Text>
                            <Text>
                                Region :{' '}
                                <Text>{countryInfo?.region || 'region'}</Text>{' '}
                            </Text>
                            <Text>
                                Capital :{' '}
                                <Text>{countryInfo?.capital || 'capital'}</Text>{' '}
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        // borderWidth: 1,
        width: '100%',
    },
    btnContainer: {
        width: '90%',
        marginVertical: heightToDp(5),
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

export default PreviewScreen;
