import React, { useContext } from 'react';
import DadosUser from '../../index/components/dadosuser/dadosuser';
import News from '../../index/components/news/news';
import NavBar from '../../../components/NavBar/navbar';
import { AuthContext } from '../../../contexts/auth';
import { api } from '../../../services/api'
import LoadingPage from '../../../components/Loading/loading';
import { DataGrid } from '@mui/x-data-grid'
import { Box, TextField } from '@mui/material';


const columns = [
    { field: 'grupo', headerName: 'Marca', },
    { field: 'armacao', headerName: 'Armação' },
    { field: 'solar', headerName: 'Solar'},
    { field: 'observacao', headerName: 'Observação'},
  ];

  const rows = [
    { id: 1, grupo: 'RayBan', armacao: '50 %', solar: 30 },
    { id: 2, grupo: 'Ono Brasil', armacao: '50 %', solar: 30 },
    { id: 3, grupo: 'Atitude', armacao: '50 %', solar: 30 },

  ];

const DescontoFunc = () => {
    const { user } = useContext(AuthContext)


    if (!user) {
        return <LoadingPage/>
    }


    return(
        <>
        <NavBar user={user}/>
        <div className='container-page-feed'>
            
            <div className='container-user'>
                <DadosUser data={user}/>
            </div>

            <div className='container-feedprofile'>
                <TextField label="Pesquisar" variant='outlined' fullWidth/>
                <br/>
                <br/>
                <br/>
                <Box style={{ height: 600, width: '100%' }}>
                    <DataGrid
                        columns={columns}
                        rows={rows}
                        pageSize={10}
                        rowsPerPageOptions={[5]}
                        disableSelectionOnClick
                    />
                </Box>


            </div>
            <div className='container-news'>
                <News/>
            </div>
        </div>
        </>
                
    )
}

export default DescontoFunc;