import React from 'react';
import './dadosuser.css'
import SemIMG from '../../../../assets/sem_foto.png'
import Avatar from '@mui/material/Avatar';

const DadosUser = ({data}) => {
    const nomepessoa = () => {
        if (data.last_name != "") {
            return data.last_name
        } else {
            return data.first_name
        }
    }

    return (
        <div className='content-user'>
            <Avatar alt={data.first_name} src={data.img} sx={{ width: 230, height: 230 }}/>
            <h1>{nomepessoa()}</h1>
            <h3>{data.cargo}</h3>
        </div>
    )
}

export default DadosUser;