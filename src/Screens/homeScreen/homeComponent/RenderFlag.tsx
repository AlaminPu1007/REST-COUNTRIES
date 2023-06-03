import {
    Image,
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableOpacity,
    VirtualizedList,
} from 'react-native';
import React, {memo, useContext, useEffect, useState} from 'react';
import commonStyles from '../../../component/commonStyles';
import theme from '../../../component/theme';
import {Props} from '../../../navigationFlow/drawerNav/homeStackNav/HomeStackNav';
import {useNavigation} from '@react-navigation/native';
import {Context as DarkModeContext} from '../../../context/DarkModeContext';
import {heightToDp} from '../../../component/Responsive';
import OrientedScreen from '../../../app-helpers/OrientedScreen';

const {width, height} = Dimensions.get('window');

const RenderFlag = ({rootData}: any) => {
    // get user device theme color from context
    const {
        state: {themeValue},
    } = useContext(DarkModeContext);

    //define state
    const [orientation, setOrientation] = useState<string>(
        OrientedScreen.isPortrait() ? 'portrait' : 'landscape',
    );

    // get boolean value of theme
    const isLightMode = themeValue === 'light';
    // define use-navigation to access navigation
    const navigation: any = useNavigation<Props>();

    const navigateToItemPreview = (value: string) =>
        navigation.navigate('preview', {name: value});

    //handle orientation screen
    useEffect(() => {
        const subscription = Dimensions.addEventListener('change', () => {
            setOrientation(
                OrientedScreen.isPortrait() ? 'portrait' : 'landscape',
            );
        });
        return () => subscription?.remove();
    }, []);

    /**
     * description :- It will render each country
     * @created_by :- {ALAMIN}
     * @created_at :- 03/05/2023 21:06:35
     */
    const renderItem = (item: any) => {
        const {item: data} = item;

        return (
            <TouchableOpacity
                // activeOpacity={0.8}
                onPress={() => {
                    navigateToItemPreview(data.name.common);
                }}
                key={data?.name?.common || Date.now()}
                style={[
                    isLightMode
                        ? commonStyles.light_background_color
                        : commonStyles.dark_background_color,
                    styles.container,
                ]}>
                {data?.flags?.png && (
                    <Image
                        style={
                            orientation === 'portrait'
                                ? styles.imageStyle
                                : styles.imageStylesForLandSpace
                        }
                        source={{uri: data?.flags?.png}}
                    />
                )}
                <View style={[styles.countryInfo]}>
                    <Text
                        style={[
                            isLightMode
                                ? commonStyles.light_large_text_style
                                : commonStyles.dark_large_text_style,
                            styles.countryNameStyle,
                        ]}>
                        {data?.name?.common}
                    </Text>
                    <View>
                        <Text
                            style={[
                                isLightMode
                                    ? commonStyles.light_small_text_style
                                    : commonStyles.dark_small_text_style,
                                styles.padding_vertical,
                            ]}>
                            Population : <Text>{data?.population || 0}</Text>{' '}
                        </Text>
                        <Text
                            style={[
                                isLightMode
                                    ? commonStyles.light_small_text_style
                                    : commonStyles.dark_small_text_style,
                            ]}>
                            Region : <Text>{data?.region || 'region'}</Text>{' '}
                        </Text>
                        <Text
                            style={[
                                isLightMode
                                    ? commonStyles.light_small_text_style
                                    : commonStyles.dark_small_text_style,
                            ]}>
                            Capital : <Text>{data?.capital || 'capital'}</Text>{' '}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    type ItemData = {
        name: any,
        id: string,
        title: string,
    };

    const getItem = (_data: any, index: number): ItemData => {
        return _data[index];
    };

    const getItemCount = (_data: unknown) => rootData?.length;

    return (
        <View>
            <VirtualizedList
                initialNumToRender={4}
                data={rootData}
                renderItem={renderItem}
                keyExtractor={item => item.name.common}
                getItemCount={getItemCount}
                getItem={getItem}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

export default memo(RenderFlag);

const styles = StyleSheet.create({
    container: {
        width: '100%',
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
});
