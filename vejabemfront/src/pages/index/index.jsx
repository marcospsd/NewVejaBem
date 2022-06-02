import React, { useState, useEffect, useContext } from 'react';
import DadosUser from './components/dadosuser/dadosuser';
import Feed from './components/feed/feed';
import News from './components/news/news';
import './index.css'
import { api } from '../../services/api'
import NavBar from '../../components/NavBar/navbar';
import { AuthContext } from '../../contexts/auth';




const FeedPage = () => {
    const { user, config } = useContext(AuthContext)

    if (!user) {
        return <p>Carregando ...</p>
    }

    return(
        <>
        <NavBar user={user}/>
        <div className='container-page-feed'>
            
            <div className='container-user'>
                <DadosUser data={user}/>
            </div>
            <div className='container-feed'>
                <Feed user={user} config={config} />
            </div>
            <div className='container-news'>
                <News/>
            </div>
        </div>
        </>
                
    )
}

export default FeedPage;