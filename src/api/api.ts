import axios from "axios";

export const instance = axios.create({
    baseURL: ' http://www.filltext.com/',
});

export type responseDataType = {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    address: {
        streetAddress: string,
        city: string,
        state: string,
        zip: string
    },
    description: string
}

export const dataAPI = {
    getSmallData() {
        return instance.get<Array<responseDataType>>(`?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}`).then(res => res.data)
    },
    getBigData() {
        return instance.get<Array<responseDataType>>(`?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}`).then(res => res.data)
    },
}