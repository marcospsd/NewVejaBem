import React, {useState} from 'react'
import { Modal, Button, Box, Avatar } from '@mui/material'
import './modal.css'
import { CKEditor } from "@ckeditor/ckeditor5-react";
import Editor from 'ckeditor5-custom-build/build/ckeditor'
import { api } from '../../../services/api';
import {useAxios} from '../../../hooks/useAxios';
import DropDown from '../../../components/DropDown/dropdown';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';

const ModalDidi = (props) => {
    const { data, mutate } = useAxios(`/posts/postsuser/${props.data.valor2}`)
    const [post, setPost] = useState("")
    const [travaButton, setTravaButton] = useState(null)


    const HandleChange = (event, editor) => {
        setPost(editor.getData());

    }

    const ContainerPost = {
        post_content: post,
        post_author: props.data.valor2
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
                alert("Erro de requisição, por favor tente novamente !")
                setTravaButton(null)
            })
        }

    }

    const DeletePost = async (id) => {
        if(window.confirm("Deseja deletar esse post ?")) {
            await api.delete(`/posts/posts/${id}`)
            mutate()
        }
    }

    
    const Datefunction = (id) => {
        const news = new Date(id);
        return news.toLocaleDateString() + " " + news.getHours() + ":" + news.getMinutes() + ":" + news.getSeconds()
    }

    return (
        <Modal
        open={props.open}
        onClose={() => props.setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
            <Box id='box-modal-didi'      
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1.2, width: '50ch' },
            }}
            noValidate
            autoComplete="off">
                <div className="content-didi">                       
                        <IconButton id='button-close' onClick={() => {props.setOpen(null)}}>
                            <CloseIcon/>
                        </IconButton>
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
                    <div className='container-posts'>
                        { data ? data.results.map((post) => (
                            <div className='container-id-didi' key={post.id}>
                                <DropDown DeletePost={DeletePost} ID={post.id} />
                                <div className='content-post' >
                                        <Avatar id="mousepass" alt={post.author_name.first_name} src={post.author_name.img ? post.author_name.img : '/broken.jpg' } sx={{ width: 50, height: 50 }}></Avatar>
                                        <div className='text-post'>
                                            <a id="mousepass" ><h3>{post.author_name.first_name}</h3></a>
                                            <p>{Datefunction(post.post_created_at)}</p>
                                        </div>
                                </div>
                                <hr></hr>
                                <div className='col1-id'>
                                    <div className='ck-content' dangerouslySetInnerHTML={{__html: post.post_content}}/>
                                    <hr></hr>
                                </div>
                            </div>
                        )): null}
                        </div>

                </div>
            </Box>
        </Modal>
    )
}


export default ModalDidi;