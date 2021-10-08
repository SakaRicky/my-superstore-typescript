import axios from 'axios';
import constants from '../utils/constants';

const baseUrl = 'http://localhost:5000/';

// export const upload = async (formdata) => {
//     const response = await axios.post(`${baseUrl}item/upload`, formdata)
//     return response.data
// }

// export const getItem = async (id) => {
//     const response = await axios.get(`${baseUrl}item/${id}`)
//     return response.data
// }

export interface FetchItemType {
    from: number,
    sortField?: string,
    sortDir?: string,
    isOnSale: boolean,
    q?: string
}

const fetchItemList = async ({ from, sortField, sortDir, isOnSale, q }: FetchItemType) => {

    const itemLists = await axios
                                .get<any>(`${baseUrl}item/list`, {
                                    params: {
                                        from,
                                        size: constants.PAGE_SIZE,
                                        sortField,
                                        sortDir,
                                        isOnSale,
                                        q,
                                    },
                                });
    console.log(itemLists.data);
    
    return itemLists.data;
       
};


// const services = { getAllItems, getDeals, getItem, upload }

export default fetchItemList;