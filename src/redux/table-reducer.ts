import {dataAPI, responseDataType} from "../api/api";
import {ActionsType} from "./store";
import {Dispatch} from "redux";
import {setIsLoading} from "./app-reducer";

let initialState: InitialStateType = {
    data: [],
    sortingField: "",
    sortingDirection: "",
    user: null,
    currentPage: 0
};

const tableReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "TABLE/SET-DATA":
            return {
                ...state,
                data: action.data
            }
        case "TABLE/SORT":
                        if (action.sortingDirection === "asc") {
                return {
                    ...state,
                    data: [...state.data].sort((a, b) => {
                        const x: number | string | object = a[action.field] || 0
                        const y: number | string | object = b[action.field] || 0
                        if (typeof x !== "object" && typeof y !== "object") {
                            if (x > y) {
                                return 1
                            } else {
                                return -1
                            }
                        } else {
                            return 0
                        }
                    }),
                    sortingDirection: "asc",
                    sortingField: action.field
                }
            } else {
                return {
                    ...state,
                    data: [...state.data].sort((a, b) => {
                        const x: number | string | object = a[action.field] || 0
                        const y: number | string | object = b[action.field] || 0
                        if (typeof x !== "object" && typeof y !== "object") {
                            if (x < y) {
                                return 1
                            } else {
                                return -1
                            }
                        } else {
                            return 0
                        }
                    }),
                    sortingDirection: "desc",
                    sortingField: action.field
                }
            }
        case "TABLE/SET-USER":
            return {
                ...state,
                user: action.user
            }
        case "TABLE/SET-CURRENT-PAGE":
            return {
                ...state,
                currentPage: action.currentPage
            }
        default:
            return state;
    }
}

export const setData = (data: Array<responseDataType>): SetDataActionType => ({type: "TABLE/SET-DATA", data})
export const onSort =
    (field: FieldType, sortingDirection: SortingDirectionType): OnSortingActionType =>
         ({type: "TABLE/SORT", field, sortingDirection})
export const setUser = (user: ElementType): SetUserActionType => ({type: "TABLE/SET-USER", user})
export const setCurrentPage = (currentPage: number): SetCurrentPageActionType => ({type: "TABLE/SET-CURRENT-PAGE", currentPage})

export const getSmallData = () => async (dispatch: Dispatch) => {
    dispatch(setIsLoading(true))
    const data = await dataAPI.getSmallData()
    dispatch(setData(data))
    dispatch(setIsLoading(false))
}

export const getBigData = () => async (dispatch: Dispatch) => {
    dispatch(setIsLoading(true))
    const data = await dataAPI.getBigData()
    dispatch(setData(data))
    dispatch(setIsLoading(false))
}

export default tableReducer;

export type SetDataActionType = {
    type: "TABLE/SET-DATA",
    data: Array<responseDataType>
}

export type SetUserActionType = {
    type: "TABLE/SET-USER",
    user: ElementType
}
export type SetCurrentPageActionType = {
    type: "TABLE/SET-CURRENT-PAGE",
    currentPage: number
}

export type OnSortingActionType = {
    type: "TABLE/SORT",
    field: FieldType,
    sortingDirection: SortingDirectionType
}

export type InitialStateType = {
    data: Array<ElementType>,
    sortingField: SortingFieldType | FieldType,
    sortingDirection: SortingDirectionType,
    user: ElementType | null,
    currentPage: number
}

export type SortingDirectionType = "asc" | "desc" | ""
export type SortingFieldType = ElementType | ""

export type ElementType = {
    id: number,
    firstName: string | null,
    lastName: string | null,
    email: string | null,
    phone: string | null,
    address: {
        streetAddress: string | null,
        city: string | null,
        state: string | null,
        zip: string | null
    },
    description: string | null
}

export type FieldType = keyof ElementType