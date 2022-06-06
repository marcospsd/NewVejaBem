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
import LikeList from './components/likeslist/likelist';



const ViewPost = (props) => {
    const post = useAxios(`/posts/posts/${props.id}/`)
    const likes = useAxios(`/posts/like/${props.id}/`)
    const {data, mutate} = useAxios(`/posts/viewcomments/${props.id}`)    
    const [comentario, setComentario] = useState("")
    const [likeslist, setLikesList] = useState(null)
    const [likesanchorElNav, setlikesAnchorElNav] = React.useState(null);

    if (!data) {
        return ""
    }
    if (!post.data) {
        return ""
    }
    if (!likes) {
        return ""
    }


    const SendComment = (id) => {
        if(comentario) {
            const coment = {
                comment_content: comentario,
                comment_author: localStorage.getItem('iduser'),
                comment_post: id,
            }
            api.post(`/posts/comments/`, coment)
            .then((res) => {
                mutate()
                setComentario("")
            })
        }
    }

    const Datefunction = (id) => {
        const news = new Date(id);
        return news.toLocaleDateString() + " " + news.getHours() + ":" + news.getMinutes() + ":" + news.getSeconds()
    }

    const Likebutton = (dado) => {
        api.put(`/posts/like/${dado}/`, { post_likes: [props.iduser ] })
        .then((res) => {
            post.mutate()
            likes.mutate()
        })
    }

    const NameButton = (data) => {
        const verificar = data.post_likes.filter(x => x === props.iduser)
        if (verificar.length === 0) {
            return `Curtir`
        } else { return `Descurtir`}
    }

    const DeleteComment = (id) => {
        if (window.confirm("Deseja deletar o comentário ?")) {
            api.delete(`/posts/comments/${id}/`)
            .then((res) => {
                const NewData = data.filter((x) => x.id !== id)
                mutate(NewData, false)
            })
        }
    }

    const DropDownOptions = (id, user) => {
        if (props.user.is_staff == true) {
            return <IconButton id="deletepostview" onClick={() => DeleteComment(id)}><DeleteIcon/></IconButton>
        } else if (user.pk === props.iduser) {
            return <IconButton id="deletepostview" onClick={() => DeleteComment(id)}><DeleteIcon/></IconButton>
        } else {
            return;
        }
    }

    const Divdidi1 = (author) => {
        if (props.config) {
            const didi = props.config.filter((x) => x.variavel === 'POST_USER_DIDI')
            console.log(didi[0])
            console.log(author)
            if (didi[0].valor2 == author) {
                return 'container-id-comments-didi'
            } else {
                return 'container-id-comments'
            }
        } else { return 'container-id-comments'}
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
                    <div className={props.Divdidi(post.data.post_author)} key={post.data.id}>
                    <IconButton id='button-close' onClick={() => {props.setModalViewPost(null)}}>
                        <CloseIcon/>
                    </IconButton>

                        <div className='content-post'>
                            <Avatar src={post.data.author_name.img ? post.data.author_name.img : SemIMG } sx={{ width: 50, height: 50 }}></Avatar>
                            <div className='text-post'>
                                <h3>{post.data.author_name.first_name}</h3>
                                <p>{Datefunction(post.data.post_created_at)}</p>
                            </div>
                        </div>
                        <hr></hr>
                        <div className='col1-id'>
                            <div className='ck-content' dangerouslySetInnerHTML={{__html: post.data.post_content}}/>
                            <hr></hr>
                            <div className='conteudo-buttonsview'>
                                <Button variant="contained" id="curtir" onClick={() => Likebutton(post.data.id)}>{NameButton(post.data)}</Button>
                                <AvatarGroup id="likesimg" max={4} onClick={(e) => {
                                        setlikesAnchorElNav(e.currentTarget)
                                        setLikesList(true)
                                }}>
                                    {likes.data ? likes?.data.usuarios.map((x) => (
                                        <Avatar alt={x.first_name} src={x.img} sx={{ width: 30, height: 30 }} key={x.first_name}/>
                                    )) : null}
                                </AvatarGroup>
                                 {likeslist && <LikeList likes={likes.data} likeslist={likeslist} setLikesList={setLikesList} likesanchorElNav={likesanchorElNav} setlikesAnchorElNav={setlikesAnchorElNav}/>}
                            </div>
                        </div>
                    </div>
                    {data && data.map((post) => (
                        <div className={'container-posts'} key={post.id}>
                            <div className={Divdidi1(post.comment_author)}>
                                
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
                                { 
                                DropDownOptions(post.id, post.author_name)
                                }
                            </div>
                        </div>
                    ))}
                </div>
                <div className='input-comments'>
                    <TextField id="input-comments-textfield" inputProps={{ maxLength: '255' }} variant="outlined" value={comentario} onChange={(e) => setComentario(e.target.value)} fullWidth/>
                    <IconButton onClick={() => SendComment(props.id)}>
                        <SendIcon/>
                    </IconButton>
                </div>
            </Box>
        </Modal>

    )
}

export default ViewPost;