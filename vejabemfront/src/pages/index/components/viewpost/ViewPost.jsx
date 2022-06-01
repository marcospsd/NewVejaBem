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
import DeleteIcon from '@mui/icons-material/Delete';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import { api } from '../../../../services/api';
import {mutate as MutateGlobal} from 'swr'



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

    const Likebutton = (dado) => {
        api.put(`/posts/like/${dado}/`, { post_likes: [props.iduser ] })
        .then((res) => MutateGlobal(`/posts/like/${dado}/`, { ...res.data }))
    }

    const NameButton = () => {
        const contar = props.id.post_likes.map(x => x).length
        const verificar = props.id.post_likes.filter(x => x == props.iduser)
        if (verificar.length === 0) {
            return `Curtir`
        } else { return `Descurtir`}
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
                            <Avatar src={props.id.author_name.img ? props.id.author_name.img : SemIMG } sx={{ width: 50, height: 50 }}></Avatar>
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
                                <Button variant="contained" id="curtir" onClick={() => Likebutton(props.id.id)}>{NameButton()}</Button>
                                <AvatarGroup max={4} >
                                    {/* {likes?.map((x) => (
                                        <Avatar alt={x.first_name} src={x.img} sx={{ width: 30, height: 30 }} />
                                    ))}
                                     */}
                                </AvatarGroup>
                            </div>
                        </div>
                    </div>
                    {data && data.map((post) => (
                        <div className='container-posts' key={post.id}>
                            <div className='container-id-comments'>
                                
                                <div className='content-comments'>
                                    <Avatar id="avatar" src={post.author_name.img ? post.author_name.img : SemIMG }></Avatar>
                                    <div className='text-comments'>
                                        <h3>{(post.author_name.first_name).split(' ').slice(0, 1).join(' ')}</h3>
                                        <p id="minidata">{Datefunction(post.comment_created_at)}</p>
                                    </div>
                                </div>
                                <hr/>
                                <div className='col1-id'>
                                    {post.comment_content}
                                </div>
                                <IconButton id="deletepostview" onClick={() => {}}><DeleteIcon/></IconButton>
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