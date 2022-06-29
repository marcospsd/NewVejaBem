import useSWRInfinity from 'swr/infinite';
import useSWR from 'swr';
import {api} from '../services/api';
import { useState } from 'react';
import { DataMes } from '../components/functions/data';

export const useAxios = (url) => {
    //const { mutate } = useSWRConfig()
    const { data, error, mutate} = useSWR(url, async url => {
        const response = await api.get(url);

        return response.data
        
    //  }, { refreshInterval: 10000 })
    })
    return {data, mutate}
}



export const useAxiosInfinity = (url) => {
    const getKey = (pageIndex, previousPageData) => {
        pageIndex = pageIndex + 1
        if (previousPageData && !previousPageData.next) return null 
        return `${url}?page=${pageIndex}`
    }

    const { data: dataswr, error, mutate ,size, setSize} = useSWRInfinity(getKey , async url => {
        const response = await api.get(url);
        return response.data
    //  }, { refreshInterval: 10000 })
    })


    const data = dataswr

    const isReachedEnd = dataswr ? dataswr[dataswr.length -1]?.next : null

    const loadingMore = dataswr && typeof dataswr[size - 1] === "undefined"
    
    return {data, mutate, setSize, size, isReachedEnd, loadingMore}
}

