import React from 'react';
import Button from '@mui/material/Button'
import { useAxios } from '../../../../hooks/useAxios'
import LoadingPage from '../../../../components/Loading/loading'
import './news.css'
import AnnouncementIcon from '@mui/icons-material/Announcement';       
import NewspaperIcon from '@mui/icons-material/Newspaper';    


const News = () => {
    const jornal = useAxios(`/news/endnewspaper/`)
    const ci = useAxios(`/news/endci/`)

    if (!jornal.data) {
        return <LoadingPage/>
    }

    const NewJornal = jornal ? jornal.data?.results[0] : []
    const NewCi = ci ? ci.data?.results[0]: []

    return (
        
        <div className='content-news'>
            <h3>Últimas Notícias:</h3>
            { NewJornal ?
                 <Button variant='text' href={NewJornal.content} key={NewJornal.id} sx={{ width: '100%', color: 'black'}}>
                 <div className="content-id-newspaper">
                    <h2>{NewJornal.tittle}</h2>
                   <NewspaperIcon sx={{ alignSelf: 'center', fontSize: 35}}/>
                 </div>
             </Button>
             : <p>Não Existem Edições</p>}
            { NewCi ?
                 <Button variant='text' href={NewCi.content} key={NewCi.id} sx={{ width: '100%', color: 'black'}}>
                 <div className="content-id-newspaper">
                    <h2>{NewCi.tittle}</h2>
                    <AnnouncementIcon sx={{ alignSelf: 'center', fontSize: 35}}/>
                 </div>
             </Button>
             : <p>Não Existem C.I.'s</p>}
        </div>
    )
}

export default News;