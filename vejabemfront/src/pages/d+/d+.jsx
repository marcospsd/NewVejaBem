import React, { useContext } from 'react';
import DadosUser from '../index/components/dadosuser/dadosuser';
import News from '../index/components/news/news';
import NavBar from '../../components/NavBar/navbar';
import { AuthContext } from '../../contexts/auth';
import { api } from '../../services/api'
import LoadingPage from '../../components/Loading/loading';
import { useAxios } from '../../hooks/useAxios';
import { Button } from '@mui/material'
import IMGDIMAIS from '../../assets/dimaiz.png'


const DMAISPage = () => {
    const { user, setUser } = useContext(AuthContext)
    const { data } = useAxios('/dimais/descolaborador/')

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

                 <img src={IMGDIMAIS} style={{ width: 300, maxWidth: '100%', borderRadius: 15 }}/>
                </div>
                <p style={{ textAlign: 'center'}}>Aqui você encontra tudo que as Óticas Diniz tem a oferecer para você, nosso colaborador !</p>
                <br/>
                { data ? data.results.map((res) => (
                    <Button variant='text' href={res.content} key={res.id} sx={{ width: '100%', color: 'black', borderRadius: 10}}>
                        <div className="content-id-newspaper" >
                            <h1>{res.tittle}</h1>
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

export default DMAISPage;