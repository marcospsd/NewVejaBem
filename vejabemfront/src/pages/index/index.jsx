import React, { useState, useEffect } from 'react';
import DadosUser from './components/dadosuser/dadosuser';
import Feed from './components/feed/feed';
import News from './components/news/news';
import './index.css'
import { api } from '../../services/api'




const FeedPage = () => {
    const iduser = localStorage.getItem('iduser')
    const [user, setUser] = useState([])


    useEffect(() => {
        api.get(`/auth/create/${iduser}/`)
          .then(user => setUser(user.data))
      }, [])

    return(
        <div className='container-page-feed'>
            <div className='container-user'>
                <DadosUser data={user}/>
            </div>
            <div className='container-feed'>
                <Feed />
            </div>
            <div className='container-news'>
                <News/>
            </div>
        </div>
        
    )
}

export default FeedPage;