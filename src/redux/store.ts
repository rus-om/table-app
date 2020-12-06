import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunkMiddleware from "redux-thunk";
import tableReducer, {
    OnSortingActionType,
    SetCurrentPageActionType,
    SetDataActionType,
    SetUserActionType
} from "./table-reducer";
import appReducer, {SetIsLoadingActionType} from "./app-reducer";

let rootReducer = combineReducers({
    table: tableReducer,
    app: appReducer,
})

type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunkMiddleware))
)

//const store = createStore(rootReducer, (applyMiddleware(thunkMiddleware)))

export type ActionsType = SetDataActionType
    | SetIsLoadingActionType
    | OnSortingActionType
    | SetUserActionType
    | SetCurrentPageActionType
export default store