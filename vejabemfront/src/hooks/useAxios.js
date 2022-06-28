import useSWRInfinity from 'swr/infinite';
import useSWR from 'swr';
import {api} from '../services/api';

export const useAxios = (url) => {
    //const { mutate } = useSWRConfig()
    const { data, error, mutate} = useSWR(url, async url => {
        const response = await api.get(url);

        return response.data
        
    //  }, { refreshInterval: 10000 })
    })
    return {data, mutate}
}

const getKey = (pageIndex, previousPageData) => {
    // alcançou o fim
    if (previousPageData && !previousPageData.data) return null
  
    // primeira página, nós não temos `previousPageData`
    if (pageIndex === 0) return `/posts/posts/`
  
    // adiciona o cursor para o endpoint da API
    return `/users?cursor=${previousPageData.nextCursor}&limit=10`
  }

export const useAxiosInfinity = (url) => {
    const { data, error, mutate} = useSWRInfinity(getKey , async url => {
        const response = await api.get(url);
        return response.data.results
        
    //  }, { refreshInterval: 10000 })
    })
    return {data, mutate}
}

