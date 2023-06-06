import {
    Dimensions,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ScrollView,
    ActivityIndicator,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {PreviewScreenNavigationProp} from '../../navigationFlow/drawerNav/homeStackNav/HomeStackNav';
import Api from '../../api/Api';
import {SafeAreaView} from 'react-native-safe-area-context';
import commonStyles from '../../component/commonStyles';
import Header from '../../commonComponent/Header';
import theme from '../../component/theme';
import {heightToDp} from '../../component/Responsive';
import {Context as DarkModeContext} from '../../context/DarkModeContext';
import OrientedScreen from '../../app-helpers/OrientedScreen';

const {width, height} = Dimensions.get('window');

const PreviewScreen = ({route}: PreviewScreenNavigationProp) => {
    const {name} = route.params;
    // get user device theme color from context
    const {
        state: {themeValue},
    } = useContext(DarkModeContext);
    // get user screen type

    // get boolean value of theme
    const isLightMode = themeValue === 'light';

    //define state
    const [countryInfo, setCountryInfo] = useState<any>({});
    const [orientation, setOrientation] = useState<string>(
        OrientedScreen.isPortrait() ? 'portrait' : 'landscape',
    );
    const [loading, setLoading] = useState<boolean>(true);

    //handle orientation screen
    useEffect(() => {
        const subscription = Dimensions.addEventListener('change', () => {
            setOrientation(
                OrientedScreen.isPortrait() ? 'portrait' : 'landscape',
            );
        });
        return () => subscription?.remove();
    }, []);

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
            setCountryInfo(res?.data[0] || {});

            // stop loader
            setLoading(prv => !prv);
        } catch (errors: any) {
            setLoading(prv => !prv);

            if (__DEV__) {
                console.log(errors.message);
            }
        }
    };

    /**
     * description :- return loader view
     * @author {Alamin}
     * @created_by :- {ALAMIN}
     * @created_at :- 05/06/2023 21:02:06
     */
    if (loading) {
        return (
            <View
                style={[
                    isLightMode
                        ? commonStyles.light_container
                        : commonStyles.dark_container,
                    styles.resultIsNotFound,
                ]}>
                <ActivityIndicator size="large" />
                <Text
                    style={[
                        isLightMode
                            ? commonStyles.light_medium_text_style
                            : commonStyles.dark_medium_text_style,
                        styles.center_txt,
                    ]}>
                    Loading...
                </Text>
            </View>
        );
    }

    /**
     * description :-If any result is not found then it will return this method
     * @created_by :- {ALAMIN}
     * @created_at :- 03/05/2023 20:59:59
     */
    if (!Object.keys(countryInfo).length) {
        return (
            <View
                style={[
                    isLightMode
                        ? commonStyles.light_container
                        : commonStyles.dark_container,
                    styles.noResultFound,
                ]}>
                <Text
                    style={[
                        isLightMode
                            ? commonStyles.light_medium_text_style
                            : commonStyles.dark_medium_text_style,
                    ]}>
                    Result is found!
                </Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={commonStyles.safeAreaViewStyle}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={styles.scrollView}
                contentContainerStyle={styles.scrollViewStyle}>
                <View
                    style={[
                        isLightMode
                            ? commonStyles.light_container
                            : commonStyles.dark_container,
                        styles.container,
                    ]}>
                    <Header title="Where in the world ?" />
                    <TouchableOpacity
                        activeOpacity={0.9}
                        // onPress={navigateToItemPreview}
                        style={[
                            isLightMode
                                ? commonStyles.light_background_color
                                : commonStyles.dark_background_color,
                            styles.btnContainer,
                        ]}>
                        {countryInfo?.flags?.png && (
                            <Image
                                style={
                                    orientation === 'portrait'
                                        ? styles.imageStyle
                                        : styles.imageStylesForLandSpace
                                }
                                source={{uri: countryInfo?.flags?.png}}
                            />
                        )}
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
                                {/* <Text
                                    style={[
                                        isLightMode
                                            ? commonStyles.light_small_text_style
                                            : commonStyles.dark_small_text_style,
                                        styles.padding_vertical,
                                    ]}>
                                    Native Name :{' '}
                                    <Text>
                                        {countryInfo?.name?.nativeName?.eng
                                            ?.common || 'native-name'}
                                    </Text>{' '}
                                </Text> */}
                                <Text
                                    style={[
                                        isLightMode
                                            ? commonStyles.light_small_text_style
                                            : commonStyles.dark_small_text_style,
                                        styles.padding_vertical,
                                    ]}>
                                    Population :{' '}
                                    <Text>
                                        {countryInfo?.population ||
                                            'population'}
                                    </Text>{' '}
                                </Text>
                                <Text
                                    style={[
                                        isLightMode
                                            ? commonStyles.light_small_text_style
                                            : commonStyles.dark_small_text_style,
                                        styles.padding_vertical,
                                    ]}>
                                    Region :{' '}
                                    <Text>
                                        {countryInfo?.region || 'region'}
                                    </Text>{' '}
                                </Text>
                                <Text
                                    style={[
                                        isLightMode
                                            ? commonStyles.light_small_text_style
                                            : commonStyles.dark_small_text_style,
                                        styles.padding_vertical,
                                    ]}>
                                    Subregion :{' '}
                                    <Text>
                                        {countryInfo?.subregion || 'subregion'}
                                    </Text>{' '}
                                </Text>
                                <Text
                                    style={[
                                        isLightMode
                                            ? commonStyles.light_small_text_style
                                            : commonStyles.dark_small_text_style,
                                        styles.padding_vertical,
                                    ]}>
                                    Capital :{' '}
                                    <Text>
                                        {countryInfo?.capital || 'capital'}
                                    </Text>{' '}
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        // borderWidth: 1,
        width: '100%',
    },
    scrollView: {
        width: '100%',
    },
    scrollViewStyle: {
        flexGrow: 1,
        justifyContent: 'flex-start',
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
    imageStylesForLandSpace: {
        width: height - 65,
        height: 260,
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
    padding_vertical: {
        paddingVertical: heightToDp(0.5),
    },
    noResultFound: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    resultIsNotFound: {
        paddingTop: heightToDp(20),
    },
    center_txt: {
        textAlign: 'center',
    },
});

export default PreviewScreen;
