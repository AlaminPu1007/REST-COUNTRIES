import {Text, View} from 'react-native';
// import React, {useEffect} from 'react';
// import {Props} from '../../navigationFlow/drawerNav/homeStackNav/HomeStackNav';
// import Api from '../../api/Api';
//{route}: Props
const PreviewScreen = () => {
    // const {params} = route;

    // useEffect(() => {
    //     const getData = async () => {
    //         const res = await Api.get(
    //             `https://restcountries.com/v3.1/name/${params.itemName}`,
    //         );
    //         console.log(res.data);
    //     };
    //     getData();
    // }, [params]);

    return (
        <View>
            <Text>PreviewScreen</Text>
        </View>
    );
};

export default PreviewScreen;
