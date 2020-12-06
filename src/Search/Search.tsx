import React, {ChangeEvent, useState} from 'react';

type PropsType = {
    onSearchHandler: (value: string) => void
}

export const Search = (props: PropsType) => {
    const [value, setValue] = useState('')

    const valueChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }
    return (
        <div className="input-group mb-3">
            <input type="text" className="form-control" value={value} onChange={valueChangeHandler}/>
                <div className="input-group-append">
                    <button className="btn btn-outline-secondary" onClick={()=>props.onSearchHandler(value)}>Найти</button>
                </div>
        </div>
    )
}