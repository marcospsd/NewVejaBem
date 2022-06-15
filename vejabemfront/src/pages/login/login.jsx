import React, {useState, useContext} from 'react';
import './login.css'
import TextField from '@mui/material/TextField'

import FormControl from '@mui/material/FormControl';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircle from '@mui/icons-material/AccountCircle';
import IMGRed from '../../assets/logo-n.png'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import ModalCreateUser from './components/criarusuario/criarusuario';
import { AuthContext } from '../../contexts/auth'
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const { authenticated, login} = useContext(AuthContext);
    const [ opencreate, setOpenCreate ] = useState(false)
    const [ openreset, setOpenReset ] = useState(false)
    const [ username, setUsername] = useState('')
    const [ password, setPassword] = useState('')
    const navigate = useNavigate()

    if (authenticated) {
        return navigate('/')
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        login(username.toLowerCase(), password.toLowerCase())
    };

    return (
        <div className='container-login'>
            <div className='caixa-login'>
                <img src={IMGRed}/>
                <Stack id="box-login" component="form" spacing={2} autoComplete="off">
                        <TextField id="login-usuario" label="Usuário" variant="outlined" fullWidth onChange={(e) => setUsername(e.target.value)} value={username}
                            InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <AccountCircle />
                                </InputAdornment>
                            ),
                            }}/>

                        <TextField id="login-senha" label="Password" type='password' variant="outlined" fullWidth onChange={(e) => setPassword(e.target.value)} value={password}
                            InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <VpnKeyIcon />
                                </InputAdornment>
                            ),
                            }}/>
                        <div className="buttons-login">
                        <Button variant="contained" onClick={handleSubmit}>Entrar</Button>
                        <Button variant="contained" onClick={() => setOpenCreate(true)}>Cadastre-se</Button>
                         {opencreate && <ModalCreateUser setOpenCreate={setOpenCreate} opencreate={opencreate}/>}   
                        </div>
                        <div className="esquecisenha-login">
                        <Button variant="text" id="buttonesqueceusenha">Esqueceu sua senha ?</Button>
                        </div>
                </Stack>
            </div>
        </div>
    )
}

export default Login;