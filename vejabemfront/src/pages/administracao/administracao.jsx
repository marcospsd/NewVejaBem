import React, { useState, useContext } from 'react'
import Navbar from '../../components/NavBar/navbar'
import { AuthContext } from '../../contexts/auth'
import DadosUser from '../index/components/dadosuser/dadosuser'
import News from '../index/components/news/news'
import './administracao.css'
import { api } from '../../services/api'
import LoadingPage from '../../components/Loading/loading'
import { TextField, Button } from '@mui/material'
import SwitchIOS from '../../components/iosswitch/iosswitch'
import ModalDidi from './modal/modal'
import ModalNewPaper from './modal/modalnewspaper'

const Administracao = () => {
    const { user, config, setConfig } = useContext(AuthContext)
    const [ habpost, setHabPost] = useState(null)
    const [ opendidi, setOpenDidi] = useState(null)
    const [ openedition, setOpenEdition] = useState(null)


    if (!config) {
        return <LoadingPage/>
    }


    const HabilitarPost = (id) => {
        if (id === true) {
            api.patch(`/auth/config/${config1.id}/`, { status: false })
            .then((res) => {
                const newconfig = config.filter((x) => x.variavel !== 'POST_FEED_USERS')
                setHabPost(res.data.status)
                setConfig([res.data, ...newconfig])
                
            })
        } else {
            api.patch(`/auth/config/${config1.id}/`, { status: true })
            .then((res) => {
                const newconfig = config.filter((x) => x.variavel !== 'POST_FEED_USERS')
                setHabPost(res.data.status)
                setConfig([res.data, ...newconfig])
            })
        }

    }

    const config1 = config?.filter((res) => res.variavel === 'POST_FEED_USERS')[0]
    const config2 = config?.filter((res) => res.variavel === 'POST_USER_DIDI')[0]

    return (
        <>
        {user && <Navbar user={user}/>}
        <div className='container-page-feed'>

            <div className='container-user'>
                <DadosUser data={user}/>
            </div>

            <div className='container-administacao'>
                <div className="tittle-adm">
                    <h1>Painel Administrativo</h1>
                </div>
                <div className="buttons">
                    <h3 className="titulo-adm">Configurações de Sistema</h3>
                    <div className="habilita-post">
                        { config1 && <>
                            <p><b>{config1.descricao}:</b></p>

                            <SwitchIOS
                            checked={habpost == null ? config1.status : habpost} 
                            onClick={() => HabilitarPost(config1.status)}
                            sx={{ alignSelf: 'center'}}
                            /> 
                            
                            </>
                        }
                    </div>
                                       
                </div>
                <div className="vejabem-adm">
                    <h3 className="titulo-adm"> Controle de Acesso Assistênte Virtual </h3>
                    <div className="habilita-post">
                        <p><b>Controlar Postagem: </b></p>
                        <Button variant="contained" id='adm-button' onClick={() => setOpenDidi(true)}>Abrir</Button>
                    </div>
                </div>

                <div className="vejabem-adm">
                    <h3 className="titulo-adm"> Controle de Acesso Páginas VejaBem </h3>
                    <div className="habilita-post">
                        <p><b>Controlar Edições: </b></p>
                        <Button variant="contained" id='adm-button' onClick={() => setOpenEdition(true)}>Abrir</Button>
                    </div>
                </div>
                
            </div>

            <div className='container-news'>
                <News/>
            </div>

        </div>
            { opendidi && <ModalDidi open={opendidi} setOpen={setOpenDidi} data={config2}  />}
            { openedition && <ModalNewPaper open={openedition} setOpen={setOpenEdition} />}
        </>
    )
}

export default Administracao;