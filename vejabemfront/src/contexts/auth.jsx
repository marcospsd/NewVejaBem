import axios from "axios";
import React, { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import {api, createSession } from "../services/api";




export const AuthContext = createContext();


export const AuthProvicer = ({children}) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [config, setConfig] = useState([])

    useEffect(() => {
        const recoveredUser = localStorage.getItem('iduser');
        const token = localStorage.getItem('token');

        if(recoveredUser && token) {
            setUser(JSON.parse(recoveredUser));
            api.defaults.headers.Authorization = `token ${token}`

        }
        setLoading(false);

        api.get('/auth/config/')
        .then((res) => {
            setConfig(res.data)
        })
    }, []);


    const login = async (username, password) => {
        try{
        const response = await createSession(username, password)
        if(response.status !== 200){
            setError('Deu erro no coisa');
          }
        const loggedUser = response.data.nome
        const token = response.data.token
        const iduser = response.data.iduser

        localStorage.setItem("nome", JSON.stringify(loggedUser));
        localStorage.setItem("token", token);
        localStorage.setItem('iduser', iduser);
    

        api.defaults.headers.Authorization = `token ${token}`

        api.get('/auth/config/')
        .then((res) => {
            setConfig(res.data)
        })

        setUser(iduser);
        navigate("/")
        } catch(e){
            window.alert("Login ou senha Incorretos")
        };
    };
    
    const logout = () => {
        localStorage.removeItem("nome")
        localStorage.removeItem("token")
        localStorage.removeItem("iduser")
        localStorage.removeItem('imguser')

        api.defaults.headers.Authorization = null;
        setConfig([])
        setUser(null);
        navigate("/login")
    };

    return (
        <AuthContext.Provider value={{ authenticated: !!user, user, loading, login, logout, config }}>{children}</AuthContext.Provider>
    )
}