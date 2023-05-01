/**
 * description :- This file help us to handle dark mode functionality with globally
 * @author {ALAMIN}
 * @created_by :- {ALAMIN}
 * @created_at :- 01/05/2023 13:26:54
 */

import DataContext from './createDataContext';

const reducer = (state, action) => {
    switch (action.type) {
        // case 'LogIn':
        //     return {...state, token: action.payload};
        default:
            return state;
    }
};

export const {Context, Provider} = DataContext(
    reducer,
    // all method will be goes here
    {},
    // initial-state goes here
    {},
);
