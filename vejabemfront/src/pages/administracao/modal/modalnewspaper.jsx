import React, {useState} from 'react'
import { Modal, Box, Button, TextField, IconButton } from '@mui/material'
import './modal.css'
import './modalnewspaper.css'
import LoadingPage from '../../../components/Loading/loading'
import { useAxios } from '../../../hooks/useAxios'
import IOSSwitch from '../../../components/iosswitch/iosswitch'
import { api } from '../../../services/api'
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';


const ModalNewsPaper = (props) => {
    const { data, mutate} = useAxios(`/news/allnewspaper/`)
    const [ checked, setChecked] = useState(false)
    const [ tittle, setTittle] = useState("")
    const [ file, setFile] = useState()

    const AtualizarImg = () => {
        if (tittle && file ) {
            const formData = new FormData()
            formData.append("content", file)
            formData.append("tittle", tittle)
            formData.append("activo", checked)
            api.post(`/news/allnewspaper/`, formData, { headers : { 'Content-Type' : 'multipart/form-data'}})
            .then((res) => mutate() )

        } else {
            alert('Não é possivel enviar uma Edição sem conteúdo')
        }
    }

    const Activate = (id, bolean) => {
        api.patch(`/news/allnewspaper/${id}/`, { activo: bolean })
        .then((res) => mutate())
    }

    const DeletePost = (id) => {
        api.delete(`/news/allnewspaper/${id}/`)
        .then((res) => mutate())
    }
    return (
        <Modal
        open={props.open}
        onClose={() => props.setOpen(null)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
            <Box id='box-modal-didi'      
            component="form"
            noValidate
            autoComplete="off">
                <div className="post-feed-newspaper">
                <IconButton id='button-close' onClick={() => {props.setOpen(null)}}>
                    <CloseIcon/>
                </IconButton>
                    <h2>Postar Nova Edição</h2>
                    <TextField 
                        size="small" id="outlined-basic" 
                        variant='outlined'
                        label='Título da Publicação'
                        value={tittle}
                        fullWidth
                        onChange={(e) => setTittle(e.target.value)}
                    />
                    <div className="div-switch">
                        <Button variant="contained" component="label" id="upload-button" size="small">
                            Arquivo
                            <input hidden type="file" onChange={(e) => setFile(e.target.files[0])}/>
                        </Button>
                        <p>{file ? file.name : "Não possui arquivo"}</p>
                    </div>
                    <p>Deseja aprovar a visualização ?</p>
                    <div className="div-switch">
                        <p>Não</p>                        
                        <IOSSwitch
                            checked={checked}
                            onClick={() => setChecked(!checked)}
                        />
                        <p>Sim</p>
                    </div>
                    <br/>
                    <Button variant="contained" onClick={(event) => AtualizarImg(event)} id="send-button">Postar</Button>
                    
                </div>
                <div className="content-edition">
                    { data ? data.results?.map((res) => (
                        <div className="content-id-newspaper2" key={res.id}>
                            <Button href={res.content} sx={{ borderRadius: 10, padding: 1, margin: 0 }}>
                                <h2>{res.tittle}</h2>
                            </Button>
                            <div>
                                <p>Publicado em</p>
                                <p>{res.created_at}</p>
                            </div>
                            <div className="content-buttons">
                                <IOSSwitch
                                    checked={res.activo}
                                    onClick={() => Activate(res.id, !res.activo)}
                                />
                                <br/>
                                <IconButton onClick={() => DeletePost(res.id)}>
                                    <DeleteIcon/>
                                </IconButton>
                            </div>
                            
                        </div>
                    )) : <LoadingPage/> }
                </div>
            </Box>
        </Modal>
    )
}


export default ModalNewsPaper;