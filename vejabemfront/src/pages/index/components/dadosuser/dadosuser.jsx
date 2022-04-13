import React from 'react';
import './dadosuser.css'

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
            <img src={data.img}/>
            <h1>{nomepessoa()}</h1>
            <label>{data.cargo}</label>
            
        </div>
    )
}

export default DadosUser;