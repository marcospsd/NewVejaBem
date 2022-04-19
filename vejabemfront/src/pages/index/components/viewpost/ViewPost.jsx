import React, {useState} from 'react'
import useAxios from '../../../../hooks/useAxios'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import './viewpost.css'
import SemIMG from '../../../../assets/sem_foto.png'
import Button from '@mui/material/Button';
import { IconButton, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import { api } from '../../../../services/api';



const ViewPost = (props) => {
    const {data, mutate} = useAxios(`/posts/viewcomments/${props.id.id}`)    
    const [comentario, setComentario] = useState("")

    const SendComment = (id) => {
        const coment = {
            comment_content: comentario,
            comment_author: localStorage.getItem('iduser'),
            comment_post: props.id.id,
        }
        api.post(`/posts/comments/`, coment)
        .then((res) => {
            mutate()
            setComentario("")
        })
    }

    const Datefunction = (id) => {
        const news = new Date(id);
        return news.toLocaleDateString() + " " + news.getHours() + ":" + news.getMinutes() + ":" + news.getSeconds()
    }

    return (
        <Modal
            open={props.modalviewpost}
            onClose={() => props.setModalViewPost(null)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            disablePortal
            id='modal-view-post1'
            >
            <Box id='modal-view-post'>
                <div className='container-comments'>
                    <div className='container-id' key={props.id.id}>
                    <IconButton id='button-close' onClick={() => {props.setModalViewPost(null)}}>
                        <CloseIcon/>
                    </IconButton>
                        <div className='content-post'>
                            <img src={props.id.author_name.img ? props.id.author_name.img : SemIMG }></img>
                            <div className='text-post'>
                                <h3>{props.id.author_name.first_name}</h3>
                                <p>{Datefunction(props.id.post_created_at)}</p>
                            </div>
                        </div>
                        <hr></hr>
                        <div className='col1-id'>
                            <div className='ck-content' dangerouslySetInnerHTML={{__html: props.id.post_content}}/>
                            <hr></hr>
                            <div className='conteudo-buttons'>
                                <Button variant="contained" id="curtir" onClick={() => {}}>Curtir</Button>
                            </div>
                        </div>
                    </div>
                    {data && data.map((post) => (
                        <div className='container-posts'>
                            <div className='container-id-comments' key={post.id}>
                                <div className='content-comments'>
                                    <img src={post.author_name.img ? post.author_name.img : SemIMG }></img>
                                    <div className='text-comments'>
                                        <h3>{(post.author_name.first_name).split(' ').slice(0, 1).join(' ')}</h3>
                                        {/* <p>{Datefunction(post.comment_created_at)}</p> */}
                                    </div>
                                </div>
                                <hr/>
                                <div className='col1-id'>
                                    {post.comment_content}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className='input-comments'>
                    <TextField id="input-comments-textfield" label="" variant="outlined" value={comentario} onChange={(e) => setComentario(e.target.value)}fullWidth/>
                    <IconButton onClick={() => SendComment()}>
                        <SendIcon/>
                    </IconButton>
                </div>
            </Box>
        </Modal>

    )
}

export default ViewPost;