import React from 'react'
import './loading.css'
import CircularProgress from '@mui/material/CircularProgress';


const LoadingPage = () => {

    return (

        <div className='loading'>
                <div className="container-loading">
                <CircularProgress id="circularprogress" />
                </div>
        </div>

    )
}

export default LoadingPage;