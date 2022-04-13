import useSWR from 'swr';
import {api} from '../services/api';

const useAxios = (url) => {
    //const { mutate } = useSWRConfig()
    const { data, error, mutate} = useSWR(url, async url => {
        const response = await api.get(url);

        return response.data
        
    //  }, { refreshInterval: 10000 })
    })
    return {data, mutate}
}

export default useAxios;
