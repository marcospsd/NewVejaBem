import React, {useState} from 'react'
import './criarusuario.css'
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import InputAdornment from '@mui/material/InputAdornment';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import AccountCircle from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import { api } from '../../../../services/api'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });


const ModalCreateUser = ({setOpenCreate, opencreate}) => {
    const [nome, setNome] = useState('')
    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [alert, setAlert] = useState('')
    const [modal, setModal] = useState(false)
    const [typemodal, setTypeModal] = useState('success')




    const CriarLogin = async () => {
        const dados = {
            first_name: nome,
            username: user,
            password: password,
            email: email
        }
        await api.post('/auth/create/', dados)
        .then((res) => {
            setAlert("Parabéns !!! agora você faz parte do Veja Bem !")
            setTypeModal('success')
            setModal(true)
            setNome("")
            setEmail("")
            setPassword("")
            setUser("")
            
        })
        .catch((err) => {
            setAlert('Algo deu errado ... por favor tente mais tarde !')
            setTypeModal('error')
            setModal(true)
            console.log(err)
        })

    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setModal(false);
      };

    return (
        <Modal
        open={opencreate}
        onClose={() => setOpenCreate(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
            <Stack id='box-modal-create-user' component="form" spacing={2} autoComplete="off">
                    <div className='close-modal-create'>
                        <IconButton id="iconclose" onClick={() => setOpenCreate(false)}><CloseIcon/></IconButton>
                    </div>
                    
                    <h1>Cadastre-se</h1>
                    <label>Para se cadastrar no novo Veja-Bem, preencha todos os dados abaixo e clique em criar !</label>
                    <label>Obs: Informar um e-mail válido !</label>
                    <TextField id="create-nome" label="Nome Completo" variant="outlined" fullWidth onChange={(e) => setNome(e.target.value)} value={nome}
                            InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <AccountCircle />
                                </InputAdornment>
                            ),
                            }}/>
                    <TextField id="create-username" label="Usuário" variant="outlined" fullWidth onChange={(e) => setUser(e.target.value)} value={user}
                    InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <AccountCircle />
                        </InputAdornment>
                    ),
                    }}/>
                        <TextField id="create-password" label="Senha" type='password' variant="outlined" fullWidth onChange={(e) => setPassword(e.target.value)} value={password}
                        InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <VpnKeyIcon />
                            </InputAdornment>
                        ),
                        }}/>
                    <TextField id="create-email" label="E-mail" type='email' variant="outlined" fullWidth onChange={(e) => setEmail(e.target.value)} value={email}
                    InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <EmailIcon />
                        </InputAdornment>
                    ),
                    }}/>

                <Button id="button-criar" variant="contained" onClick={CriarLogin}>Criar</Button>
            <Snackbar open={modal} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center'}}>
                <Alert onClose={handleClose} severity={typemodal} sx={{ width: '100%' }}>
                    {alert}
                </Alert>
            </Snackbar>
                    
            </Stack>

        </Modal>
    )
}

export default ModalCreateUser;