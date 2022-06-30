import axios from "axios";
import React, { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import {api, createSession } from "../services/api";




export const AuthContext = createContext();


export const AuthProvicer = ({children}) => {
    const navigate = useNavigate();
    const [activo, setActivo] = useState(null)
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [config, setConfig] = useState(null)

    useEffect(() => {
        const recoveredUser = localStorage.getItem('iduser');
        const token = localStorage.getItem('token');

        if(recoveredUser && token) {
            api.defaults.headers.Authorization = `token ${token}`
            api.get(`/auth/create/${recoveredUser}/`)
            .then(user => {
                setUser(user.data)
            });
            api.get('/auth/config/')
            .then((res) => {
                setConfig(res.data.results)
      
            });
            
        }
        setActivo(recoveredUser)
        setLoading(false);
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

        api.get(`/auth/create/${iduser}/`)
        .then(user => {
            setUser(user.data)
          })

        api.get('/auth/config/')
        .then((res) => {
            setConfig(res.data.results)
        })
        setActivo(loggedUser)
        navigate("/")
        } catch(e){
            window.alert("Login ou senha Incorretos")
        };
    };
    
    const logout = () => {
        setConfig(null)
        setUser(null);
        setActivo(null)
        localStorage.removeItem("nome")
        localStorage.removeItem("token")
        localStorage.removeItem("iduser")
        api.defaults.headers.Authorization = null;
        navigate("/login")
    };

    return (
        <AuthContext.Provider value={{ authenticated: !!activo, activo, loading, login, logout, config, user, setUser, setConfig }}>{children}</AuthContext.Provider>
    )
}