import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    ActivityIndicator,
} from 'react-native';
import React, {useContext, useEffect, useState, useTransition} from 'react';
import commonStyles from '../../component/commonStyles';
import Header from '../../commonComponent/Header';
import SearchComponent from '../../commonComponent/SearchComponent';
import Api from '../../api/Api';
import RenderFlag from './homeComponent/RenderFlag';
import {Context as DarkModeContext} from '../../context/DarkModeContext';
import {heightToDp} from '../../component/Responsive';

const HomeScreen = () => {
    // get user device theme color from context
    const {
        state: {themeValue},
    } = useContext(DarkModeContext);

    // get boolean value of theme
    const isLightMode = themeValue === 'light';

    // define state
    const [countryList, setCountriesList] = useState<any[]>([]);
    const [rootList, setCountriesRootList] = useState<any[]>([]);
    const [loading, setLoading] = useState<Boolean>(true);
    const [isPending, startTransition] = useTransition();

    /**
     * description :- To get all countries lis through API
     * @return {list of countries}
     * @author {Alamin}
     * @created_by :- {ALAMIN}
     * @created_at :- 25/03/2023 14:40:17
     */
    useEffect(() => {
        let unmount = false;
        if (!unmount) {
            // called api
            getCountriesList();
        }

        return () => {
            unmount = true;
        };
    }, []);

    const getCountriesList = async () => {
        try {
            const response = await Api.get('/all');

            // store into state
            setCountriesList(prv => [...prv, ...(response.data || [])]);
            setCountriesRootList(prv => [...prv, ...(response.data || [])]);
        } catch (errors) {
            if (__DEV__) {
                console.log(errors, 'from Home screen component');
            }
        } finally {
            setLoading(prv => !prv);
        }
    };

    /**
     * description :- Get an call back from search-component
     * @created_by :- {ALAMIN}
     * @created_at :- 03/06/2023 16:17:35
     */
    const callBackTxt = (text: string) => {
        // if any text is not for search field
        if (!text?.length) {
            return setCountriesList(rootList);
        }

        startTransition(() => {
            (async () => {
                try {
                    setLoading(prv => !prv);

                    const res = await Api.get(`/name/${text}`);

                    setCountriesList(res.data || []);

                    setLoading(prv => !prv);
                } catch (err) {
                    setCountriesList([]);
                    setLoading(prv => !prv);
                    if (__DEV__) {
                        console.log(err, 'err');
                    }
                }
            })();
        });
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

                {/* render all flag */}
                <View style={styles.scrollViewChildContainer}>
                    <SearchComponent callBackTxt={callBackTxt} />
                    {!loading && !isPending ? (
                        countryList?.length ? (
                            <View style={styles.scrollViewChildContainer}>
                                <RenderFlag rootData={countryList} />
                            </View>
                        ) : (
                            <Text
                                style={[
                                    isLightMode
                                        ? commonStyles.light_medium_text_style
                                        : commonStyles.dark_medium_text_style,
                                    styles.resultIsNotFound,
                                ]}>
                                No item is found!
                            </Text>
                        )
                    ) : (
                        <View style={styles.resultIsNotFound}>
                            <ActivityIndicator size="large" />
                            <Text
                                style={[
                                    isLightMode
                                        ? commonStyles.light_medium_text_style
                                        : commonStyles.dark_medium_text_style,
                                ]}>
                                Loading...
                            </Text>
                        </View>
                    )}
                </View>
            </View>
        </SafeAreaView>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    scrollViewChildContainer: {
        alignItems: 'center',
        width: '100%',
    },
    resultIsNotFound: {
        marginTop: heightToDp(20),
    },
});
