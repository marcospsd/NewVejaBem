import React, { useState, useEffect, useContext } from 'react';
import DadosUser from '../index/components/dadosuser/dadosuser';
import News from '../index/components/news/news';
import './profile.css'
import NavBar from '../../components/NavBar/navbar';
import { AuthContext } from '../../contexts/auth';
import { Avatar, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { IconButton } from '@mui/material';
import { api } from '../../services/api'
import Badge from '@mui/material/Badge';
import WorkIcon from '@mui/icons-material/Work';
import HouseIcon from '@mui/icons-material/House';
import PsychologyIcon from '@mui/icons-material/Psychology';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import EditProfileModal from './components/Editprofile/editprofile';


const ProfilePage = (props) => {
    const { user, setUser } = useContext(AuthContext)
    const [openeditmodal, setOpenEditModal] = useState(null)

    if (!user) {
        return <p>Carregando ...</p>
    }

    const AtualizarImg = (event) => {
        const formData = new FormData()
        formData.append("img", event.target.files[0])
        formData.append("username", user.username)
        api.patch(`/auth/create/${user.id}/`, formData, { headers : { 'Content-Type' : 'multipart/form-data'}})
        .then((res) => setUser(res.data))
    }


    const DateFunction = (id) => {
        const nd = id.replace(/[^0-9]/, '')
        const nde = nd.substring(5, 9) 
        return nde
    } 
    return(
        <>
        <NavBar user={user}/>
        <div className='container-page-feed'>
            
            <div className='container-user'>
                <DadosUser data={user}/>
            </div>

            <div className='container-feedprofile'>
                <div className="profile">
                    <label className="inputimg" htmlFor="icon-button-file">
                        <input accept="image/*" id="icon-button-file" type="file" onChange={(event) => AtualizarImg(event)} />
                        <IconButton component="span">
                            <Badge
                                overlap="circular"
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                badgeContent={
                                    <Avatar id="avatarphotocam" ><PhotoCameraIcon id="photocam" /></Avatar>
                                }
                                >
                                <Avatar id="avatar" src={user.img} sx={{ width: 150, height: 150 }}><input type="file"/></Avatar>
                            </Badge>
                        </IconButton>
                        
                    </label>

                    <h1>{user.first_name}</h1>
                </div>
                <div className="profile-data">
                    {user.cargo && <p><WorkIcon /> Sou <b>{user.cargo}</b></p>}
                    {user.dateadmicao && <p><PsychologyIcon/> Trabalho na Diniz desde <b>{DateFunction(user.dateadmicao)}</b></p>}
                    {user.cidade && <p><HouseIcon/> Moro em <b>{user.cidade}</b></p>}
                    {user.biografia && <><p><AssignmentIcon/> Sobre mim:</p><p><b>{user.biografia}</b></p></>}
                </div>
                <div className="ButtonsProfile">
                    <Button variant="contained" id="button-post" onClick={() => setOpenEditModal(true)} >Editar Perfil</Button>
                </div>
            </div>
            <div className='container-news'>
                <News/>
            </div>
        </div>
        {openeditmodal && <EditProfileModal user={user} setUser={setUser} openeditmodal={openeditmodal} setOpenEditModal={setOpenEditModal}/>}
        </>
                
    )
}

export default ProfilePage;