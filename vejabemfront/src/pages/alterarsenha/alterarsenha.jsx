import React, {useState, useContext} from 'react'
import { AuthContext } from '../../contexts/auth'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { api } from '../../services/api'
import Navbar from '../../components/NavBar/navbar';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import LoadingPage from '../../components/Loading/loading';
import DadosUser from '../index/components/dadosuser/dadosuser';
import News from '../index/components/news/news';
import './alterarsenha.css'

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

const AlterarSenha = () => {
    const { user, config } = useContext(AuthContext)
    const [password1, setPassword1] = useState("")
    const [password2, setPassword2] = useState("")
    const [alert, setAlert]= useState("")
    const [bolalert, setBolalert] = useState(null)
    const [coralert, setCorAlert] = useState("error")

    if(!user){
        return <LoadingPage/>
    }

    const Enviar = (password1, password2) => {
        const id = user.id
        if (password1 == password2 ) {
            api.put(`/auth/alterar/${id}/`, {"password": password1})
            .then((res) => {
                if (res.status == 200) {
                    setPassword1("")
                    setPassword2("")
                    setCorAlert("success")
                    setAlert("Alterado com sucesso !")
                    setBolalert(true)
                    
                } else {
                    setPassword1("")
                    setPassword2("")
                    setCorAlert("error")
                    setAlert("Algo deu errado com sua requisição ...")
                    setBolalert(true)
                }
            })
            .catch((err) => {
                setPassword1("")
                setPassword2("")
                setCorAlert("error")
                setAlert("Algo deu errado com sua requisição ...")
                setBolalert(true)
            })
        } else {
            setPassword1("")
            setPassword2("")
            setCorAlert("error")
            setAlert("As senhas não são iguais, por favor tente novamente")
            setBolalert(true)
        }

    }

    
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }

        setBolalert(false);
      };



    return (
        <>
        <Navbar user={user} config={config}/>
        <div className="container-page-feed">
            <div className='container-user'>
                <DadosUser data={user}/>
            </div>
            <div className='container-feed'>
                <div className='content-alterar'>
                        <h3>{user.first_name}, deseja alterar sua senha do Veja Bem ?</h3>
                        <p>Se sim, complete os campos abaixo, e clique em Alterar.</p>
                        <div className='form'>
                            <TextField id="outlined-basic" type='password' label="Senha" variant="outlined" onChange={(e) => setPassword1(e.target.value)} value={password1}/>
                        </div>
                        <div className="form">
                            <TextField id="outlined-basic" type='password' security label="Confirme sua Senha" variant="outlined"  onChange={(e) => setPassword2(e.target.value)} value={password2}/>
                        </div>
                            <Button variant="contained" id="buttons" onClick={() => Enviar(password1, password2)}>Alterar</Button>
                </div>
                <Snackbar open={bolalert} autoHideDuration={3000} onClose={handleClose} fullWidth>
                        <Alert onClose={handleClose} severity={coralert} sx={{ width: '100%' }}>
                            {alert}
                        </Alert>
                </Snackbar>
            </div>
            <div className='container-news'>
                <News/>
            </div>
        </div>
        </>
    )
}

export default AlterarSenha;   