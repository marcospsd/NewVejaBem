import React, {useContext, useState} from 'react';
import './feed.css'
import './ck-content.css'
import SemIMG from '../../../../assets/sem_foto.png'
import { CKEditor } from "@ckeditor/ckeditor5-react";
import Editor from 'ckeditor5-custom-build/build/ckeditor'
import Button from '@mui/material/Button';
import { api } from '../../../../services/api'
import useAxios from '../../../../hooks/useAxios'
import { AuthContext } from '../../../../contexts/auth'
import IconButton from '@mui/material/IconButton';
import { CircularProgress } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import DropDown from '../../../../components/DropDown/dropdown';
import ViewPost from '../viewpost/ViewPost'
import Avatar from '@mui/material/Avatar';


import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });




const Feed = props => {
    const { config, user } = useContext(AuthContext)
    const { data, mutate } = useAxios('/posts/posts/');
    const [post, setPost] = useState("")
    const { logout } = React.useContext(AuthContext);
    const iduser = localStorage.getItem('iduser')
    const [modalviewpost, setModalViewPost] = useState(null)
    const [modalidview, setModalIdView]= useState("")
    const [alert, setAlert] = useState("")
    const [modalalert, setModalAlert] = useState(null)

    const POST = config?.filter((x) => x.variavel == 'POST_FEED_USERS')

    const handleLogout = () => {
        logout()

    };
    
    if (!data) {
        return (
            <div className='carregando-post'>
                <CircularProgress />
                <p><label>Carregando conteudo ...</label></p>
                <p><label>Caso não carregue dentro de alguns segundos, clique no item abaixo e faça login novamente...</label></p>
                <IconButton onClick={() => handleLogout()}><LogoutIcon/></IconButton>
            </div>
        )

    }

    

    const ContainerPost = {
        post_content: post,
        post_author: user
    }

    const SendPost = async (id) => {
        if (post) {
            await api.post(`/posts/posts/`, id)
            .then((res => {
                mutate()
                setPost("")
            }))
            .catch((err) => {
                setAlert("Erro de Requisição, Por favor, recarregue a pagina !")
                setModalAlert(true)
            })
        }

    }

    const HandleChange = (event, editor) => {
        setPost(editor.getData());

    }

    const Datefunction = (id) => {
        const news = new Date(id);
        return news.toLocaleDateString() + " " + news.getHours() + ":" + news.getMinutes() + ":" + news.getSeconds()
    }

    const Curtir = async (post) => {
        await api.put(`/posts/like/${post.id}/`, { post_likes: [ iduser ]})
        .then((res) => {
            mutate()
        })
    }

    const NameButton = (data) => {
        const contar = data.post_likes.map(x => x).length
        const verificar = data.post_likes.filter(x => x == iduser)
        if (verificar.length === 0) {
            return `Curtir(${contar})`
        } else { return `Descurtir(${contar})`}
    }

    const DropDownOptions = (id) => {
        return <DropDown DeletePost={DeletePost} ID={id} />
    }

    const DeletePost = async (id) => {
        if(window.confirm("Deseja deletar esse post ?")) {
            await api.delete(`/posts/posts/${id}`)
            .then()
            const newdado = data.filter((x) => x.id !== id)
            mutate(newdado, false)
        
        }
    }

    
    return (
        <div className="content-feed">
            { POST && POST[0].status == true ? <div className="post-feed">
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
                }} >Postar</Button>
            </div> : <h5>POSTAGEM DESABILITADA PELO ADMINISTRADOR</h5> }
            <hr></hr>
            <div className='container-posts'>
            { data && data.map((post) => (
                <div className='container-id' key={post.id}>
                    {DropDownOptions(post.id)}
                    <div className='content-post'>
                        <Avatar src={post.author_name.img ? post.author_name.img : SemIMG } sx={{ width: 50, height: 50 }}></Avatar>
                        <div className='text-post'>
                            <h3>{post.author_name.first_name}</h3>
                            <p>{Datefunction(post.post_created_at)}</p>
                        </div>
                    </div>
                    <hr></hr>
                    <div className='col1-id'>
                        <div className='ck-content' dangerouslySetInnerHTML={{__html: post.post_content}}/>
                        <hr></hr>
                        <div className='conteudo-buttons'>
                            <Button variant="contained" id="curtir" onClick={() => Curtir(post)}>{NameButton(post)}</Button>
                            <Button variant="contained" id="comentar" onClick={() => {
                                setModalIdView(post)
                                setModalViewPost(true)
                            }}>Comentar</Button>
                        </div>
                    </div>
                    <Snackbar open={modalalert} autoHideDuration={4000} onClose={() => setModalAlert(false)}>
                        <Alert onClose={() => setModalAlert(false)} severity="error" sx={{ width: '100%' }}>
                            {alert}
                        </Alert>
                    </Snackbar>
                </div>


            ))}
                        {modalviewpost ? <ViewPost
                                                setModalViewPost={setModalViewPost}
                                                modalviewpost={modalviewpost}
                                                id={modalidview}
                                                iduser={iduser}
                        /> : null}
            </div>
      </div>


    )
}

export default Feed;