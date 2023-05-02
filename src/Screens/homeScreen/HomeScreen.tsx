import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    ScrollView,
    ActivityIndicator,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import commonStyles from '../../component/commonStyles';
import Header from '../../commonComponent/Header';
import SearchComponent from '../../commonComponent/SearchComponent';
import Api from '../../api/Api';
import RenderFlag from './homeComponent/RenderFlag';
import {Context as DarkModeContext} from '../../context/DarkModeContext';

const HomeScreen = () => {
    // get user device theme color from context
    const {
        state: {themeValue},
    } = useContext(DarkModeContext);

    // get boolean value of theme
    const isLightMode = themeValue === 'light';

    // define state
    const [countryList, setCountriesList] = useState([]);
    const [loading, setLoading] = useState(true);

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
            setCountriesList(response.data || []);

            setLoading(false);
        } catch (errors) {
            setLoading(false);
            if (__DEV__) {
                console.log(errors, 'from Home screen component');
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

                {/* render all flag */}
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={styles.scrollView}
                    contentContainerStyle={styles.scrollViewStyle}>
                    <View style={styles.scrollViewChildContainer}>
                        <SearchComponent />
                        {!loading ? (
                            countryList?.length ? (
                                <View style={styles.scrollViewChildContainer}>
                                    <RenderFlag rootData={countryList} />
                                </View>
                            ) : (
                                <Text>No item is found!</Text>
                            )
                        ) : (
                            <View>
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
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        // borderWidth: 1,
        width: '100%',
    },
    scrollViewStyle: {
        flexGrow: 1,
        justifyContent: 'flex-start',
        width: '100%',
    },
    scrollView: {
        width: '100%',
    },
    scrollViewChildContainer: {
        alignItems: 'center',
        width: '100%',
    },
});
