import React, {useState} from 'react'
import {useAxios, useAxiosInfinity} from '../../../../hooks/useAxios'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import './viewpost.css'
import { IconButton, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import { api } from '../../../../services/api';
import LikeList from './components/likeslist/likelist';
import { DataMes } from '../../../../components/functions/data'
import LoadingPage from '../../../../components/Loading/loading'
import UIInfiniteScroll from '../../../../components/UIInfiniteScroll/UIInfiniteScroll';
import LikeButton from '../../../../components/Likebutton/likebutton';


const ViewPost = (props) => {
    const post = useAxios(`/posts/posts/${props.id}/`)
    const likes = useAxios(`/posts/like/${props.id}/`)
    const {data, mutate, size, setSize, loadingMore, isReachedEnd} = useAxiosInfinity(`/posts/viewcomments/${props.id}`)    
    const [comentario, setComentario] = useState("")
    const [likeslist, setLikesList] = useState(null)
    const [likesanchorElNav, setlikesAnchorElNav] = React.useState(null);

    if (!data) {
        return <p>Carregando ...</p>
    }
    if (!post.data) {
        return <p>Carregando ...</p>
    }
    if (!likes) {
        return <p>Carregando ...</p>

    }


    const SendComment = (id) => {
        if(comentario) {
            const coment = {
                comment_content: comentario,
                comment_author: props.user.id,
                comment_post: id,
            }
            api.post(`/posts/comments/`, coment)
            .then((res) => {
                mutate()
                setComentario("")
            })
        }
    }


    const Likebutton = (dado) => {
        api.put(`/posts/like/${dado}/`, { post_likes: [props.iduser ] })
        .then((res) => {
            post.mutate()
            likes.mutate()
            props.mutate()
        })
    }

    const NameButton = (data) => {
        const verificar = data.post_likes.filter(x => x === props.iduser)
        if (verificar.length === 0) {
            return false
        } else { return true}
    }

    const DeleteComment = (id) => {
        if (window.confirm("Deseja deletar o comentário ?")) {
            api.delete(`/posts/comments/${id}/`)
            .then((res) => {
                mutate()
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
            if (didi[0].valor2 == author) {
                return 'container-id-comments-didi'
            } else {
                return 'container-id-comments'
            }
        } else { return 'container-id-comments'}
    }

    const ButtonLoading = () => {
        if (!loadingMore) {
            if (isReachedEnd) {
                 setSize(size+1)
            } else {
                return null
            }
        } else {
            return <LoadingPage/>
        }
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
                            <Avatar 
                                src={post.data.author_name.img} 
                                sx={{ width: 50, height: 50 }}
                                onClick={() => props.navigate(`/user/${post.data.post_author}`)} 
                                id="mousepass"/>
                            <div className='text-post'>
                                <a id="mousepass" onClick={() => props.navigate(`/user/${post.data.post_author}`)}><h3>{post.data.author_name.first_name}</h3><p className="cargo-id">{post.data.author_name.cargo? post.data.author_name.cargo+" | ": null} {DataMes(post.data.post_created_at)} </p></a>
                            </div>
                        </div>
                        <hr></hr>
                        <div className='col1-id'>
                            <div className='ck-content' dangerouslySetInnerHTML={{__html: post.data.post_content}}/>
                            <hr></hr>
                            <div className='conteudo-buttonsview'>
                                <LikeButton likestatus={NameButton} likeclick={Likebutton} data={post.data}/>
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
                        post.results.map((post) => 
                        <div className={'container-posts'} key={post.id}>
                            <div className={Divdidi1(post.comment_author)}>
                                
                                <div className='content-comments'>
                                    <Avatar 
                                    id="avatar" 
                                    src={post.author_name.img } 
                                    onClick={() => props.navigate(`/user/${post.comment_author}`)}/>
                                    <div className='text-comments'>
                                        <a onClick={() => props.navigate(`/user/${post.comment_author}`)} id="mousepass" >
                                            <h3>{(post.author_name.first_name).split(' ').slice(0, 1).join(' ')}</h3></a>
                                        <p id="minicargo">{post.author_name.cargo}</p>
                                        <p id="minidata">{DataMes(post.comment_created_at)}</p>
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
                    )))}
                    <div className="carregar-div">
                        { data ? <UIInfiniteScroll buscar={ButtonLoading}/> : null}
                    </div>
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