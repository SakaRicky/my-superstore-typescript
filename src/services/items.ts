import axios from 'axios';
import { ItemType } from '../../types';
import constants from '../utils/constants';

const baseUrl = '/';

export const upload = async (formdata: any) => {
    const response = await axios.post(`${baseUrl}item/upload`, formdata);
    return response.data;
};

const getItem = async (id: string) => {    
    const response = await axios.get<ItemType>(`${baseUrl}item/${id}`);
    return response.data;
};

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
    
    return itemLists.data;
       
};




const itemServices = { fetchItemList, getItem };

export default itemServices;