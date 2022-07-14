import React from 'react';
import Button from '@mui/material/Button'
import { useAxios } from '../../../../hooks/useAxios'
import LoadingPage from '../../../../components/Loading/loading'
import './news.css'

const News = () => {
    const jornal = useAxios(`/news/endnewspaper/`)

    if (!jornal.data) {
        return <LoadingPage/>
    }

    const NewJornal = jornal ? jornal.data?.results[0] : []

    return (
        
        <div className='content-news'>
            <h3>Última Edição:</h3>
            { NewJornal ?
                 <Button variant='text' href={NewJornal.content} key={NewJornal.id} sx={{ width: '100%', color: 'black'}}>
                 <div className="content-id-newspaper">
                    <h2>{NewJornal.tittle}</h2>
                 </div>
             </Button>
             : <p>Não Existem Edições</p>}
        </div>
    )
}

export default News;