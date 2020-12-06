import React from 'react';
import ReactPaginate from 'react-paginate';
import Table from "./Table/Table";
import {useDispatch, useSelector} from "react-redux";
import {
    ElementType,
    FieldType,
    getBigData,
    getSmallData,
    onSort, setCurrentPage,
    setUser,
    SortingDirectionType,
    SortingFieldType
} from "./redux/table-reducer";
import {AppStateType} from "./redux/store";
import {Spinner} from './Spinner/Spinner';
import {Card} from './Card/Card';
import {Search} from "./Search/Search";

function App() {
    const dispatch = useDispatch()
    const onGetBigData = () => dispatch(getBigData())
    const onGetSmallData = () => dispatch(getSmallData())

    const data = useSelector<AppStateType, Array<ElementType>>(state => state.table.data)
    const isLoading = useSelector<AppStateType, boolean>(state => state.app.isLoading)
    const sortingDirection = useSelector<AppStateType, SortingDirectionType>(state => state.table.sortingDirection)
    const sortingField = useSelector<AppStateType, SortingFieldType | FieldType>(state => state.table.sortingField)
    const user = useSelector<AppStateType, ElementType | null>(state => state.table.user)
    const currentPage = useSelector<AppStateType, number>(state => state.table.currentPage)
    const pageSize = 50
    let dataPaging = data
    if (currentPage !== 0) {
        dataPaging = data.slice(1 + pageSize * currentPage, pageSize * currentPage + pageSize)
    } else {
        dataPaging = data.slice(0, pageSize)
    }

    const onSorting = (field: FieldType) => {
        let sort: SortingDirectionType = sortingDirection === "asc" ? "desc" : "asc"
        dispatch(onSort(field, sort))
    }
    const onUserSelect = (user: ElementType) => {
        dispatch(setUser(user))
    }

    const onPageChangeHandler = (selectedItem: { selected: number }) => {
        dispatch(setCurrentPage(selectedItem.selected))
    }

    const onSearchHandler = (value: string) => {
        console.log(value)
    }

    return (
        <div className="container">
            <button type="button" className="btn btn-outline-dark mt-3 mb-3 mr-2" onClick={onGetSmallData}>
                32 элемента
            </button>
            <button type="button" className="btn btn-outline-dark mt-3 mb-3" onClick={onGetBigData}>
                1000 элементов
            </button>
            {isLoading && <Spinner/>}
            {data.length
                ? <>
                <Search onSearchHandler={onSearchHandler}/>
                <Table
                    data={dataPaging}
                    onSorting={onSorting}
                    sortingDirection={sortingDirection}
                    sortingField={sortingField}
                    onUserSelect={onUserSelect}

                /></>
                : null
            }
            {user && <Card user={user}/>}
            {data.length > 50 && <ReactPaginate
                onPageChange={onPageChangeHandler}
                previousLabel={"Назад"}
                previousClassName={"page-link"}
                nextLabel={"Вперед"}
                nextClassName={"page-link"}
                breakLabel={'...'}
                breakLinkClassName={"page-link"}
                pageClassName={"page-link"}
                pageCount={20}
                pageRangeDisplayed={5}
                marginPagesDisplayed={3}
                containerClassName={"pagination"}
            />}
        </div>
    );
}

export default App;
