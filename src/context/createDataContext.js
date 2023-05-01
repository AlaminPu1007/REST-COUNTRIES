/**
 * description :- This code exports a function that creates a React context and a provider
 * component for managing application state using a reducer function and a set of actions
 * @author {ALAMIN}
 * @created_by :- {ALAMIN}
 * @created_at :- 01/05/2023 13:19:39
 */
import React, {useReducer, createContext} from 'react';

export default (reducer, actions, defaultValue) => {
    const Context = createContext();

    const Provider = ({children}) => {
        const [state, dispatch] = useReducer(reducer, defaultValue);

        const boundActions = {};
        for (let key in actions) {
            boundActions[key] = actions[key](dispatch);
        }
        return (
            <Context.Provider value={{state, ...boundActions}}>
                {children}
            </Context.Provider>
        );
    };
    return {Context, Provider};
};
