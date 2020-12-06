import React from 'react';
import {ElementType} from "../redux/table-reducer";


type PropsType = {
    user: ElementType | null
}
export const Card = (props: PropsType) => {
    return (
        <>
            <div className="form-group">
                <label htmlFor="exampleFormControlTextarea1">
                    Выбран пользователь: <b>{props.user?.firstName} {props.user?.lastName}</b><br/>
                    Описание:
                </label>
                <textarea className="form-control" id="exampleFormControlTextarea1" value={props.user?.description ? props.user?.description : ""} />
                    {/*{props.user?.description}*/}
            </div>
            <div className="card width: 18rem;">
                <ul className="list-group list-group-flush ">
                    <li className="list-group-item">Адрес проживания: <b>{props.user?.address.streetAddress}</b></li>
                    <li className="list-group-item">Город: <b>{props.user?.address.city}</b></li>
                    <li className="list-group-item">Провинция: <b>{props.user?.address.state}</b></li>
                    <li className="list-group-item">Индекс: <b>{props.user?.address.zip}</b></li>
                </ul>
            </div>
        </>
    )
}