import React, { useContext } from 'react';
import DadosUser from '../index/components/dadosuser/dadosuser';
import News from '../index/components/news/news';
import './ci.css'
import NavBar from '../../components/NavBar/navbar';
import { AuthContext } from '../../contexts/auth';
import { api } from '../../services/api'
import LoadingPage from '../../components/Loading/loading';
import { useAxios } from '../../hooks/useAxios';
import { Button } from '@mui/material'
import IMGCI from '../../assets/CI.png'

const CIPage = () => {
    const { user } = useContext(AuthContext)
    const { data } = useAxios('/news/ci/')

    if (!user) {
        return <LoadingPage/>
    }


    return(
        <>
        <NavBar user={user}/>
        <div className='container-page-feed'>
            
            <div className='container-user'>
                <DadosUser data={user}/>
            </div>

            <div className='container-feedprofile'>
                <div className='content-tittle-newspaper'>
                    <h2>Comunicações Internas</h2>
                    <img src={IMGCI} style={{ width: 120, maxWidth: '100%', borderRadius: 15 }}/>
                </div>
                <br/>
                { data ? data.results.map((res) => (
                    <Button variant='text' href={res.content} key={res.id} sx={{ width: '100%', color: 'black', borderRadius: 10}}>
                        <div className="content-id-newspaper">
                            <h1>{res.tittle}</h1>
                            <div>
                                <p>Publicado em</p>
                                <p>{res.created_at}</p>
                            </div>
                        </div>
                    </Button>

                )) : null }


            </div>
            <div className='container-news'>
                <News/>
            </div>
        </div>
        </>
                
    )
}

export default CIPage;