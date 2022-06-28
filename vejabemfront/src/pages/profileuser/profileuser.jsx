import React, { useContext } from 'react'
import './profileuser.css'
import {useParams} from 'react-router-dom'
import {useAxios} from '../../hooks/useAxios'
import Navbar from '../../components/NavBar/navbar'
import { AuthContext } from '../../contexts/auth'
import DadosUser from '../index/components/dadosuser/dadosuser'
import News from '../index/components/news/news'
import LoadingPage from '../../components/Loading/loading'
import { Avatar } from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';
import HouseIcon from '@mui/icons-material/House';
import PsychologyIcon from '@mui/icons-material/Psychology';
import AssignmentIcon from '@mui/icons-material/Assignment';


const ProfileUser = (props) => {
    const { user, config } = useContext(AuthContext)
    const { id } = useParams()
    const { data } = useAxios(`/auth/create/${id}/`)

    if (!data) {
        return <LoadingPage/>
    }

    const DateFunction = (id) => {
        const nd = id.replace(/[^0-9]/, '')
        const nde = nd.substring(5, 9) 
        return nde
    } 

    return (
        <>
        <Navbar user={user}/>
        <div className='container-page-feed'>


            <div className='container-user'>
                <DadosUser data={user}/>
            </div>

            

            <div className='container-feedprofile'>
                <div className="profile">
                    <label className="inputimg" htmlFor="icon-button-file">
                        <Avatar id="avatar" alt={data.first_name} src={data.img} sx={{ width: 150, height: 150 }}></Avatar>
                    </label>

                    <h1>{data.first_name}</h1>
                </div>
                <div className="profile-data">
                    {data.cargo && <p><WorkIcon /> Sou <b>{data.cargo}</b></p>}
                    {data.dateadmicao && <p><PsychologyIcon/> Trabalho nas Óticas Diniz desde <b>{DateFunction(data.dateadmicao)}</b></p>}
                    {data.cidade && <p><HouseIcon/> Moro em <b>{data.cidade}</b></p>}
                    {data.biografia && <><p><AssignmentIcon/> Sobre mim:</p><p><b>{data.biografia}</b></p></>}
                </div>
            </div>


            <div className='container-news'>
                <News/>
            </div>

        </div>
        
        </>
    )
}


export default ProfileUser;