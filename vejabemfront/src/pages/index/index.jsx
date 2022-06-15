import React, { useContext } from 'react';
import DadosUser from './components/dadosuser/dadosuser';
import Feed from './components/feed/feed';
import News from './components/news/news';
import './index.css'
import NavBar from '../../components/NavBar/navbar';
import { AuthContext } from '../../contexts/auth';
import LoadingPage from '../../components/Loading/loading';




const FeedPage = () => {
    const { user, config } = useContext(AuthContext)

    if (!user) {
        return <LoadingPage/>
    }

    return(
        <>
        <NavBar user={user} config={config}/>
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