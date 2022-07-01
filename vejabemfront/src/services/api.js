import axios from "axios";


export const api = axios.create({
    baseURL: "http://10.3.1.95:80",
});

export const createSession = (username, password) => {
    return api.post('/auth/', { username, password });
};

     

/// SWR