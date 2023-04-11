import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    ScrollView,
    ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import commonStyles from '../../component/commonStyles';
import ThemeSchema from '../../component/ThemeSchema';
import Header from '../../commonComponent/Header';
import SearchComponent from '../../commonComponent/SearchComponent';
import Api from '../../api/Api';
import RenderFlag from './homeComponent/RenderFlag';

const HomeScreen = () => {
    // get user device theme color
    const [themeValue] = ThemeSchema();
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
                <Header />

                {/* render all flag */}
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={styles.scrollView}
                    contentContainerStyle={styles.scrollViewStyle}>
                    <View style={styles.scrollViewChildContainer}>
                        <SearchComponent />
                        {!loading ? (
                            countryList?.length ? (
                                countryList?.map((item: any) => {
                                    return (
                                        <View
                                            style={
                                                styles.scrollViewChildContainer
                                            }
                                            key={
                                                item?.name?.common || Date.now()
                                            }>
                                            <RenderFlag data={item} />
                                        </View>
                                    );
                                })
                            ) : (
                                <Text>No item is found!</Text>
                            )
                        ) : (
                            <View>
                                <ActivityIndicator size="large" />
                                <Text>Loading...</Text>
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
