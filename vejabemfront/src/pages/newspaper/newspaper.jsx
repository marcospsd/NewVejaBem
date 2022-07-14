import React, { useContext } from 'react'
import Navbar from '../../components/NavBar/navbar'
import { AuthContext } from '../../contexts/auth'
import DadosUser from '../index/components/dadosuser/dadosuser'
import News from '../index/components/news/news'
import { useAxios } from '../../hooks/useAxios'
import { Button } from '@mui/material'
import './newspaper.css'
import { useNavigate } from 'react-router-dom'
import LoadingPage from '../../components/Loading/loading';
import IMGDIDI from '../../assets/DIDILENDO.png'

const NewsPaper = (props) => {
    const navigate = useNavigate()
    const { user } = useContext(AuthContext)
    const { data, mutate} = useAxios(`/news/newspaper/`)

    if (!user ){
        return <LoadingPage/>
    }
    if (!data) {
        return <LoadingPage/>
    }

    return (
        <>
        <Navbar user={user}/>
        <div className='container-page-feed'>


            <div className='container-user'>
                <DadosUser data={user}/>
            </div>

            

            <div className='container-feed'>
                <div className='content-tittle-newspaper'>
                    <h1>Histórico de Edições</h1>
                    <img src={IMGDIDI} id="imglogoappbar"/>
                </div>
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


export default NewsPaper;