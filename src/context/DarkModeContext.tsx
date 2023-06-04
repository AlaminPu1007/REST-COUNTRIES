/**
 * description :- This file help us to handle dark mode functionality with globally
 * @author {ALAMIN}
 * @created_by :- {ALAMIN}
 * @created_at :- 01/05/2023 13:26:54
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import DataContext from './createDataContext';
import {Dispatch} from 'react';

// data-type of state
interface State {
    themeValue: string;
}

type Action =
    | {type: 'GET_THEME_VALUE_LOCAL_STORAGE', payload: string}
    | {type: 'LogOut'};

const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'GET_THEME_VALUE_LOCAL_STORAGE':
            return {...state, themeValue: action.payload};
        default:
            return state;
    }
};

/**
 * description :- This method help us to get user-preferable mode from local-storage
 * @return {theme-value}
 * @created_by :- {ALAMIN}
 * @created_at :- 01/05/2023 13:42:33
 */
const getThemeValue = (dispatch: Dispatch<Action>) => {
    return async () => {
        const value = await AsyncStorage.getItem('@theme_value');
        if (value) {
            dispatch({type: 'GET_THEME_VALUE_LOCAL_STORAGE', payload: value});
        }
    };
};

/**
 * description :- method for set theme value into local-storage
 * @param {dark, light}
 * @return {theme-value}
 * @author {Alamin}
 * @created_by :- {ALAMIN}
 *  @created_at :- 01/05/2023 13:50:55
 */
const setThemeValue = (dispatch: Dispatch<Action>) => {
    return async (value: string) => {
        const jsonValue = value;

        await AsyncStorage.setItem('@theme_value', jsonValue);
        dispatch({type: 'GET_THEME_VALUE_LOCAL_STORAGE', payload: value});
    };
};

export const {Context, Provider} = DataContext(
    reducer,
    // all method will be goes here
    {getThemeValue, setThemeValue},
    // initial-state goes here
    {themeValue: 'light'},
);
