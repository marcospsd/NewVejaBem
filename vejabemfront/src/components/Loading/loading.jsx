import React from 'react'
import './loading.css'
import CircularProgress from '@mui/material/CircularProgress';


const LoadingPage = () => {

    return (

        <div className='loading'>
                <CircularProgress />
        </div>

    )
}

export default LoadingPage;