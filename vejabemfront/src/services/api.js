import axios from "axios";


export const api = axios.create({
    baseURL: "http://177.53.172.226:2001",
});

export const createSession = (username, password) => {
    return api.post('/auth/', { username, password });
};

     

/// SWR