import { ActionsType } from "./store";

let initialState = {
    isLoading: false
};

const appReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "APP/SET-IS-LOADING":
            return {
                ...state,
                isLoading: action.isLoading
            }
        default:
            return state;
    }
}

export const setIsLoading = (isLoading: boolean): SetIsLoadingActionType  => ({type: "APP/SET-IS-LOADING", isLoading})


export type SetIsLoadingActionType = {
    type: "APP/SET-IS-LOADING",
    isLoading: boolean
}

export type InitialStateType = {
    isLoading: boolean
}

export default appReducer;
