import React, {useState} from 'react'
import { Modal, Button, Box } from '@mui/material'
import './editprofile.css'
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { api } from '../../../../services/api'
import InputMask from 'react-input-mask';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import IOSSwitch from '../../../../components/iosswitch/iosswitch'
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';



import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });


const EditProfileModal = (props) => {
    const [alert, setAlert] = useState("")
    const [modalalert, setModalAlert] = useState(null)
    const [first_name, setFirst_Name] = useState(props.user.first_name)
    const [filial, setFilial] = useState(props.user.filial)
    const [email, setEmail] = useState(props.user.email)
    const [cargo, setCargo] = useState(props.user.cargo)
    const [setor, setSetor] = useState(props.user.setor)
    const [cep, setCep] = useState(props.user.cep)
    const [rua, setRua] = useState(props.user.rua)
    const [bairro, setBairro] = useState(props.user.bairro)
    const [cidade, setCidade] = useState(props.user.cidade)
    const [celular, setCelular] = useState(props.user.celular)
    const [datenasc, setDateNasc] = useState(props.user.datenasc)
    const [dateadmicao, setDateAdm] = useState(props.user.dateadmicao)
    const [estciv, setEstCivil] = useState(props.user.estciv)
    const [biografia, setBiografia] = useState(props.user.biografia)
    const [travabutton, setTravaButton] = useState(null)
    const [possuifilhos, setPossuiFilhos] = useState(props.user.filhos[0] ? true : false)
    const [filhos, setFilhos] = useState(props.user.filhos[0] ? props.user.filhos : [])
    const [nomefilho, setNomeFilho] = useState("")
    const [datanascfilho, setDataNascFilho] = useState("")
    const [sexofilho, setSexoFilho] = useState('M')

    console.log(filial)
    const AtualizarUser = () => {
        setTravaButton(true)
        const newUser = {
            first_name: first_name,
            email: email,
            cargo: cargo,
            setor: setor,
            cep: cep,
            rua: rua,
            filial: filial,
            bairro: bairro,
            cidade: cidade,
            celular: celular,
            dateadmicao: dateadmicao,
            datenasc: datenasc,
            estciv: estciv,
            biografia: biografia
        }
        api.patch(`/auth/create/${props.user.id}/`, newUser)
        .then((res) => {
            console.log(res.data)
            props.setUser(res.data)
            window.alert("Atualizado com Sucesso ! ")
            props.setOpenEditModal(null)
            setTravaButton(false)
            
        })
        .catch((e) => {
            console.log(e)
            setAlert("Ocorreu um erro durante sua solicitação, verifique os dados e tente novamente !")
            setModalAlert(true)
            setTravaButton(null)
        })
    }
    

    const BuscaCep = (e) => {
        const ncep = e?.replace('-', '')
        setCep(e)
        if (ncep.length === 8) {
            api.get(`https://viacep.com.br/ws/${ncep}/json/`)
            .then((res) => {
                setRua(res.data.logradouro)
                setBairro(res.data.bairro)
                setCidade(res.data.localidade)
            })
        }
    }

    const AcertaCelular = (e) => {
        const n = e?.replace(/[^0-9]/g, '')
        setCelular(n)
    }

    const addFilho = () => {
        const state = {
            nome: nomefilho,
            datanasc: datanascfilho,
            sexo: sexofilho,
            user: props.user.id
        }
        if (nomefilho && datanascfilho){
            api.post('/auth/filhos/', state)
            .then((res) => {
                setFilhos([...filhos, res.data])
                api.get(`/auth/create/${props.user.id}/`)
                .then((res) => {
                    props.setUser(res.data)
                })
                setNomeFilho("")
                setSexoFilho("M")
                setDataNascFilho("")
            })
        } else {
            setAlert("Ocorreu um erro durante sua solicitação, verifique os dados e tente novamente !")
            setModalAlert(true)
        }
    }

    const removeFilho = (id) => {
        const novodado = filhos.filter((x) => x.id !== id)
        api.delete(`/auth/filhos/${id}`)
        .then((res) => {
            setFilhos(novodado)
            api.get(`/auth/create/${props.user.id}/`)
            .then((res) => {
                props.setUser(res.data)
        })
        }
        )
        .catch((res) => {
            setAlert("Ocorreu um erro durante sua solicitação, por favor tente novamente !")
            setModalAlert(true)
        })
    }

    return (
        <Modal
        open={props.openeditmodal}
        onClose={() => props.setOpenEditModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
            <Box id='box-modal-profile-edit'      
            component="form"
            sx={{
                '& .MuiTextField-root': { m: '1rem 0 0 0', width: '100%' },
            }}
            noValidate
            autoComplete="off">
            <div className="title-editprofile">
                        <IconButton id='button-close' onClick={() => {props.setOpenEditModal(false)}}>
                            <CloseIcon/>
                        </IconButton>
                <h1>Edite seu perfil...</h1>
                <p>Mantenha seu perfil sempre atualizado para receber todas as novidades ..</p>
            </div>
            <div className="texts-edit">
                <TextField size="small" id="outlined-basic" label="Nome Completo" variant="outlined" value={first_name} onChange={(e) => setFirst_Name(e.target.value)}/>
                <TextField size="small" id="outlined-basic" label="E-mail" variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)} />
                <TextField size="small" id="outlined-basic" label="Cargo" variant="outlined" value={cargo} onChange={(e) => setCargo(e.target.value)}/>
                <TextField
                    id="outlined-select-currency"
                    size="small"
                    select
                    label="Setor"
                    value={setor}
                    onChange={(e) => setSetor(e.target.value)}
                    // helperText="Please select your currency"
                    >
                        <MenuItem value={1}>Diretoria</MenuItem>
                        <MenuItem value={2}>Recursos Humanos</MenuItem>
                        <MenuItem value={3}>Televendas</MenuItem>
                        <MenuItem value={4}>Financeiro</MenuItem>
                        <MenuItem value={5}>Tecnologia da Informação</MenuItem>
                        <MenuItem value={6}>Estoque</MenuItem>
                        <MenuItem value={7}>Laboratório</MenuItem>
                        <MenuItem value={8}>Lojas</MenuItem>
                        <MenuItem value={9}>Marketing</MenuItem>
                </TextField>
                <TextField
                    id="outlined-select-currency"
                    size="small"
                    select
                    label="Filial"
                    value={filial}
                    onChange={(e) => setFilial(e.target.value)}
                    // helperText="Please select your currency"
                    >
                        <MenuItem value="0001">Administrativo</MenuItem>
                        <MenuItem value="0101">Loja 01</MenuItem>
                        <MenuItem value="0201">Loja 02</MenuItem>
                        <MenuItem value="0401">Loja 05</MenuItem>
                        <MenuItem value="0501">Loja 06</MenuItem>
                        <MenuItem value="1201">Loja 07</MenuItem>
                        <MenuItem value="0302">Loja 08</MenuItem>
                        <MenuItem value="0601">Loja 09</MenuItem>
                        <MenuItem value="0701">Loja 10</MenuItem>
                        <MenuItem value="0801">Loja 11</MenuItem>
                        <MenuItem value="0901">Loja 12</MenuItem>
                        <MenuItem value="0802">Loja 13</MenuItem>
                        <MenuItem value="1001">Loja 14</MenuItem>
                        <MenuItem value="1101">Loja 15</MenuItem>
                        <MenuItem value="2001">Loja 30</MenuItem>
                        <MenuItem value="2002">Loja 31</MenuItem>

                </TextField>
                <InputMask
                mask="(99) 99999-9999"
                maskChar=" "
                name="celular"
                value={celular}
                onChange={(e) => AcertaCelular(e.target.value)}
                >
                { () => <TextField
                id="text-field-cel" 
                label="Celular" 
                variant="outlined"
                autoComplete='off'
                name="cel"
                type="tel"
                size="small"
              
                /> }
                </InputMask>
                <InputMask
                mask="99/99/9999"
                maskChar=" "
                name="datanasci"
                value={datenasc}
                onChange={(e) => setDateNasc(e.target.value)}
                >
                { () => <TextField
                id="text-field-cel" 
                label="Data de Nascimento" 
                variant="outlined"
                autoComplete='off'
                name="datanasci"
                type="tel"
                size="small"
              
                /> }
                </InputMask>
                <InputMask
                mask="99/99/9999"
                maskChar=" "
                name="celular"
                value={dateadmicao}
                onChange={(e) => setDateAdm(e.target.value)}
                >
                { () => <TextField
                id="text-field-cel" 
                label="Data de Admissão" 
                variant="outlined"
                autoComplete='off'
                name="datanasci"
                type="tel"
                size="small"
              
                /> }
                </InputMask>
                <TextField size="small" id="outlined-basic" label="Cep" margin="dense" variant="outlined" value={cep} onChange={(e) => BuscaCep(e.target.value)} inputProps={{ maxLength: '8', }}/>
                <TextField size="small" id="outlined-basic" label="Rua" variant="outlined" value={rua ? rua : "..."} onChange={(e) => setRua(e.target.value)} />
                <TextField size="small" id="outlined-basic" label="Bairro" variant="outlined" value={bairro ? bairro : "..."} onChange={(e) => setBairro(e.target.value)}  />
                <TextField size="small" id="outlined-basic" label="Cidade" variant="outlined" value={cidade ? cidade : "...."} onChange={(e) => setCidade(e.target.value)} />
            </div>
            <div className="textareabio">
                <TextField
                        id="outlined-multiline-flexible"
                        label="Biografia"
                        multiline
                        maxRows={4}
                        value={biografia}
                        inputProps={{ maxLength: '254' }}
                        onChange={(e) => setBiografia(e.target.value)}
                        />
                <div className='divfilhos'>
                    <p>Possui filhos ?</p>
                    <p>Não</p>
                    <IOSSwitch checked={possuifilhos} onClick={ () => {setPossuiFilhos(!possuifilhos)}}/>
                    <p>Sim</p>
                </div>
                {possuifilhos ? 
                    <>
                    <div className="divfilhos">
                        <h4>Adicionar Filho</h4>
                        <IconButton sx={{ position: 'absolute', right: '10px',}} onClick={() => addFilho()}><PersonAddIcon /></IconButton>
                    </div>
                    <div className='divfilhos'>
                         <TextField size="small" id="outlined-basic" label="Nome" variant="outlined" value={nomefilho} onChange={(e) => setNomeFilho(e.target.value)}/>
                         <InputMask
                                mask="99/99/9999"
                                maskChar=" "
                                name="datanasc"
                                value={datanascfilho}
                                onChange={(e) => setDataNascFilho(e.target.value)}
                                >
                                { () => <TextField
                                id="text-field-cel" 
                                label="Data de Nascimento" 
                                variant="outlined"
                                autoComplete='off'
                                name="datanasci"
                                type="tel"
                                size="small"
                            
                                /> }</InputMask>
                         <TextField
                                id="outlined-select-currency"
                                size="small"
                                select
                                label="Sexo"
                                value={sexofilho}
                                onChange={(e) => setSexoFilho(e.target.value)}
                                // helperText="Please select your currency"
                                >
                                    <MenuItem value="M">Masculino</MenuItem>
                                    <MenuItem value="F">Feminino</MenuItem>
                            </TextField>


                    </div> </>: null }
                    {filhos[0] ? 
                        <>
                    <h4>Filhos:</h4>
                    {filhos.map((filho) => (
                        <div className="divfilhos-1" key={filho.id}>
                                <TextField size="small" id="outlined-basic" label="Nome" variant="outlined" value={filho.nome} disabled/>
                                <TextField size="small" id="outlined-basic" label="Nome" variant="outlined" value={filho.datanasc} disabled/>
                                <TextField size="small" id="outlined-basic" label="Nome" variant="outlined" value={filho.sexo == 'M' ? "Masculino" : "Feminino"} disabled/>
                                <IconButton onClick={() => removeFilho(filho.id)}><PersonRemoveIcon/></IconButton>
                        </div>
                    
                    ))} </>: null}
            </div>
            <div className="button-editprofile">
                <Button variant="contained" id="button-post" onClick={() => {AtualizarUser()}} disabled={travabutton}>Atualizar Perfil</Button>
            </div>
            
            <Snackbar open={modalalert} autoHideDuration={4000} onClose={() => setModalAlert(false)}>
                        <Alert onClose={() => setModalAlert(false)} severity="error" sx={{ width: '100%' }}>
                            {alert}
                        </Alert>
            </Snackbar>
            </Box>
        </Modal>
    )
}

export default EditProfileModal;