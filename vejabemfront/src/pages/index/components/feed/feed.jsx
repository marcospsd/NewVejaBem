import React, {useContext, useState} from 'react';
import './feed.css'
import './ck-content.css'
import { CKEditor } from "@ckeditor/ckeditor5-react";
import Editor from 'ckeditor5-custom-build/build/ckeditor'
import Button from '@mui/material/Button';
import { api } from '../../../../services/api'
import {useAxiosInfinity} from '../../../../hooks/useAxios'
import { CircularProgress } from "@mui/material";
import DropDown from '../../../../components/DropDown/dropdown';
import ViewPost from '../viewpost/ViewPost'
import Avatar from '@mui/material/Avatar';
import { DataMes } from '../../../../components/functions/data';


import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import LoadingPage from '../../../../components/Loading/loading';
import { useNavigate } from 'react-router-dom';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });




const Feed = props => {
    const navigate = useNavigate()
    const { data, mutate, size, setSize, isReachedEnd, loadingMore} = useAxiosInfinity('/posts/posts/');
    const [post, setPost] = useState("")
    const iduser = props.user.id;
    const [modalviewpost, setModalViewPost] = useState(null)
    const [modalidview, setModalIdView]= useState("")
    const [alert, setAlert] = useState("")
    const [modalalert, setModalAlert] = useState(null)
    const [travaButton, setTravaButton] = useState(null)


    if(!data){
        return (
            <LoadingPage/>
        )
    }

    if (!props.config) {
        return (
            <LoadingPage/>
        )

    }

    const datenow = new Date()
    
    const ContainerPost = {
        post_content: post,
        post_author: props.user.id
    }

    const SendPost = async (id) => {
        if (post) {
            setTravaButton(true)
            await api.post(`/posts/posts/`, id)
            .then((res => {
                mutate()
                setPost("")
                setTravaButton(null)
            }))
            .catch((err) => {
                setAlert("Erro de Requisição, Por favor, recarregue a pagina !")
                setModalAlert(true)
                setTravaButton(null)
            })
        }

    }

    const HandleChange = (event, editor) => {
        setPost(editor.getData());

    }

    
    const Curtir = async (post) => {
        await api.put(`/posts/like/${post.id}/`, { post_likes: [ iduser ]})
        .then((res) => {
            mutate()
        })
    }

    const NameButton = (data) => {
        const verificar = data.post_likes.filter(x => x == iduser)
        if (verificar.length === 0) {
            return `Curtir`
        } else { return `Descurtir`}
    }

    const DropDownOptions = (id, user) => {
        if (props.user.is_staff == true) {
            return <DropDown DeletePost={DeletePost} ID={id} />
        } else if (user === iduser) {
            return <DropDown DeletePost={DeletePost} ID={id} />
        } else {
            return;
        }
        
    }

    const DeletePost = (id) => {
        if(window.confirm("Deseja deletar esse post ?")) {
            api.delete(`/posts/posts/${id}`)
            .then((res) => {
                mutate()
            })
            .catch((err) => {
                setAlert("Erro de Requisição, por favor tente mais tarde")
                setModalAlert(true)
            })
        
        }
    }

    const ButtonLoading = () => {
        if (!loadingMore) {
            if (isReachedEnd) {
                return <Button variant="contained" id="carregar" onClick={() => setSize(size+1)}>Carregar Mais ...</Button>
            } else {
                return null
            }
        } else {
            return <LoadingPage/>
        }
    }

    const PostHabilitado = () => {
        if (props.config) {
            const POST = props.config.filter((x) => x.variavel == 'POST_FEED_USERS')
            if (POST[0].status === true) {
                return (
                    <div className="post-feed">
                        <CKEditor 
                            data={post}
                            editor={Editor}
                            onChange={(e, editor) => { HandleChange(e, editor)}}
                            config= {{
                                simpleUpload: {
                                    uploadUrl: 'http://10.3.1.95:80/posts/upload/',
                                    headers: {
                                        Authorization: `token ${localStorage.getItem('token')}`
                                    }
                                },
                                mediaEmbed: {
                                    previewsInData: true,
                                }
                            }}
        
                            />
                        <Button variant="contained" id="button-post" onClick={(e, editor) => {
                            
                            SendPost(ContainerPost)
                            setPost("")
                            
                        }} disabled={travaButton} >Postar</Button>
                    </div> 
                    )
            } else { 
                return <h3 id="variavelambiente"> POST DESABILITADO PELO ADMINISTRADOR </h3>
            }
        
        }
        return (<CircularProgress/>)
    }

    const Divdidi = (author) => {
        if (props.config) {
            const didi = props.config.filter((x) => x.variavel === 'POST_USER_DIDI')
            if (didi[0].valor2 == author) {
                return 'container-id-didi'
            } else {
                return 'container-id'
            }
        } else { return 'container-id'}
    }
    
    return (
        <div className="content-feed">
            {  PostHabilitado() }
            <hr></hr>
            <div className='container-posts'>

            { data ? data.map((res) => (
                res.results.map((post) => (
                <div className={Divdidi(post.post_author)} key={post.id}>
                    {DropDownOptions(post.id, post.post_author)}
                    <div className='content-post' >
                            <Avatar id="mousepass" onClick={() => navigate(`user/${post.post_author}`)} alt={post.author_name.first_name} src={post.author_name.img ? post.author_name.img : '/broken.jpg' } sx={{ width: 50, height: 50 }}></Avatar>
                            <div className='text-post'>
                                <a id="mousepass" onClick={() => navigate(`user/${post.post_author}`)} ><h3>{post.author_name.first_name}</h3><p className="cargo-id">{post.author_name.cargo? post.author_name.cargo+" | ": null} {DataMes(post.post_created_at)} </p></a>
                                <p></p>
                            </div>
                    </div>
                    <hr></hr>
                    <div className='col1-id'>
                        <div className='ck-content' dangerouslySetInnerHTML={{__html: post.post_content}}/>
                        <hr></hr>
                        <div className='conteudo-buttons'>
                            <Button variant="contained" id="curtir" onClick={() => Curtir(post)}>{NameButton(post)}</Button>
                            <Button variant="contained" id="comentar" onClick={() => {
                                setModalIdView(post.id)
                                setModalViewPost(true)
                            }}>Comentar</Button>
                        </div>
                    </div>
                </div>
            )))) : <LoadingPage />}
                <div className='carregar-div'>
                        {ButtonLoading()}
                </div>

                    <Snackbar open={modalalert} autoHideDuration={4000} onClose={() => setModalAlert(false)}>
                        <Alert onClose={() => setModalAlert(false)} severity="error" sx={{ width: '100%' }}>
                            {alert}
                        </Alert>
                    </Snackbar>
                        {modalviewpost ? <ViewPost
                                                setModalViewPost={setModalViewPost}
                                                modalviewpost={modalviewpost}
                                                id={modalidview}
                                                iduser={iduser}
                                                user={props.user}
                                                Divdidi={Divdidi}
                                                config={props.config}
                                                navigate={navigate}
                        /> : null}
            </div>
      </div>


    )
}

export default Feed;