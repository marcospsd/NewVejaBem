import React, {useState} from 'react'
import { Modal, Button, Box } from '@mui/material'
import './editprofile.css'
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { api } from '../../../../services/api'
import InputMask from 'react-input-mask';


const EditProfileModal = (props) => {
    const [first_name, setFirst_Name] = useState(props.user.first_name)
    const [last_name, setLast_Name] = useState(props.user.last_name)
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


    const AtualizarUser = () => {
        setTravaButton(true)
        const newUser = {
            first_name: first_name,
            last_name: last_name,
            email: email,
            cargo: cargo,
            setor: setor,
            cep: cep,
            rua: rua,
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
            props.setUser(res.data)
            alert("Atualizado com Sucesso ! ")
            props.setOpenEditModal(null)
            setTravaButton(false)
            
        })
        .catch((e) => {
            
            alert("Erro de conexão com servidor ... por favor tente novamente mais tarde")
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
                '& .MuiTextField-root': { m: 1.2, width: '50ch' },
            }}
            noValidate
            autoComplete="off">
            <div className="title-editprofile">
                <h1>Edite seu perfil...</h1>
                <p>Mantenha seu perfil sempre atualizado para receber todas as novidades ..</p>
            </div>
            <div className="texts-edit">
                <TextField size="small" id="outlined-basic" label="Nome Completo" variant="outlined" value={first_name} onChange={(e) => setFirst_Name(e.target.value)}/>
                <TextField size="small" id="outlined-basic" label="Apelido (Não é Obrigatório)" variant="outlined" value={last_name} onChange={(e) => setLast_Name(e.target.value)}/>
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
                    onChange={(e) => setBiografia(e.target.value)}
                    />
            </div>
            <div className="button-editprofile">
                <Button variant="contained" id="button-post" onClick={() => {AtualizarUser()}} inputProps={{ maxLength: '254' }} disabled={travabutton}>Atualizar Perfil</Button>
            </div>


            </Box>
        </Modal>
    )
}

export default EditProfileModal;