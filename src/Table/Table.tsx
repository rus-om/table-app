import React from 'react';
import {ElementType, FieldType, SortingDirectionType, SortingFieldType} from "../redux/table-reducer";

type PropsType = {
    data: Array<ElementType>
    onSorting: (field: FieldType) => void
    sortingDirection: SortingDirectionType
    sortingField: SortingFieldType | FieldType
    onUserSelect: (user: ElementType) => void
}
const Table = (props: PropsType) => {
    return (
        <table className="table">
            <thead className="thead-dark">
            <tr>
                <th onClick={()=>props.onSorting("id")}>
                    ID
                    <small>{props.sortingField === "id" ? props.sortingDirection : ""}</small>
                </th>
                <th onClick={()=>props.onSorting("firstName")}>
                    First Name
                    <small>{props.sortingField === "firstName" ? props.sortingDirection : ""}</small>
                </th>
                <th onClick={()=>props.onSorting("lastName")}>
                    Last Name
                    <small>{props.sortingField === "lastName" ? props.sortingDirection : ""}</small>
                </th>
                <th onClick={()=>props.onSorting("email")}>
                    Email
                    <small>{props.sortingField === "email" ? props.sortingDirection : ""}</small>
                </th>
                <th onClick={()=>props.onSorting("phone")}>
                    Phone
                    <small>{props.sortingField === "phone" ? props.sortingDirection : ""}</small>
                </th>
            </tr>
            </thead>
            <tbody>
            {props.data.map(el => (
                <tr key={el.id ? el.id + Math.random() : el.id} onClick={()=>props.onUserSelect(el)}>
                    <td>{el.id}</td>
                    <td>{el.firstName}</td>
                    <td>{el.lastName}</td>
                    <td>{el.email}</td>
                    <td>{el.phone}</td>
                </tr>
            ))}
            </tbody>
        </table>
    )
}

export default Table;
