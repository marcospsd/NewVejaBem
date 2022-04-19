import React, {useState} from 'react';
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


const Feed = props => {
    const { data, mutate } = useAxios('/posts/posts/');
    const [post, setPost] = useState("")
    const { logout } = React.useContext(AuthContext);
    const iduser = localStorage.getItem('iduser')
    const [modalviewpost, setModalViewPost] = useState(null)
    const [modalidview, setModalIdView]= useState("")


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
        post_author: localStorage.getItem('iduser')
    }
    
    const SendPost = async (id) => {
        if (post) {
            await api.post(`/posts/posts/`, id)
            .then((res => {
                mutate()
                setPost("")
            }))
            .catch((err) => {
                console.log(err)
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
        const res = await api.get(`/posts/posts/${post.id}/`)
        const ver = res.data.post_likes.filter(x => x === iduser) 
        if (ver.length === 0) {
            await api.patch(`/posts/posts/${post.id}/`, { post_likes: [ ...post.post_likes, iduser]})
            .then((res) => {
                const alterar = data.map((x) => {
                    if (x.id === post.id) {
                        return {...x, post_likes : [... x.post_likes, 1] }
                    } else { return x}
                })
                mutate(alterar, false)
            })
            .catch((err) => console.log(err))
        } else {
            const arraycheio = res.data.post_likes.filter((x) => x !== iduser)
            await api.patch(`/posts/posts/${post.id}/`, { post_likes: arraycheio })
            .then((res) => {
                const alterar = data.map((x) => {
                    if (x.id === post.id) {
                        return {...x, post_likes : arraycheio }
                    } else { return x}
                })
                mutate(alterar, false)
            })
            .catch((err) => console.log(err))
        }
    }

    const NameButton = (data) => {
        const contar = data.post_likes.map(x => x).length
        const verificar = data.post_likes.filter(x => x === iduser)
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
                }} >Postar</Button>
            </div>
            <hr></hr>
            <div className='container-posts'>
            { data && data.map((post) => (
                <div className='container-id' key={post.id}>
                    {DropDownOptions(post.id)}
                    <div className='content-post'>
                        <img src={post.author_name.img ? post.author_name.img : SemIMG }></img>
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
                </div>

            ))}
                        {modalviewpost ? <ViewPost
                                                setModalViewPost={setModalViewPost}
                                                modalviewpost={modalviewpost}
                                                id={modalidview}
                        /> : null}
            </div>
      </div>


    )
}

export default Feed;