import React, { createContext, useReducer, useContext } from "react";
import { User, CartItemType } from "../../types";
import { Action, reducer } from "./reducer";

export type State = {
    user: User | null,
    cart: CartItemType[]
};

const initialState: State = {
    user: null,
    cart: []
};

export const StateContext = createContext<[State, React.Dispatch<Action>]>([
    initialState,
    () => initialState
]);

type StateProp = {
    children: React.ReactElement
};

export const StateProvider: React.FC<StateProp> = ({children}: StateProp) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
            <StateContext.Provider value={[state, dispatch]}>
                {children}
            </StateContext.Provider>
        );
};

export const useStateValue = () =>useContext(StateContext);