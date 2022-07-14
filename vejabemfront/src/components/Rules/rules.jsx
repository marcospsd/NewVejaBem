import React, {useState} from 'react';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { Box, IconButton } from '@mui/material';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';
import './rules.css'
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';



const DropRules = ({text, button, block, id, AtualizarImg}) => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };



  return (
    <div className="droprules-icon">
        <IconButton onClick={(event) => handleOpenNavMenu(event)} id={block ? id : "nãoescondido"}>
            <WarningAmberIcon/>
        </IconButton>
        <Menu 
        open={Boolean(anchorElNav)} 
        onClose={handleCloseNavMenu}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        anchorEl={anchorElNav}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        >
        <div className="div-rules">
            {text}
          <br/>
        { button ? (
          <Button variant="contained" component="label" id="upload-photo">
            <PhotoCameraIcon />
          <input hidden type="file" onChange={(event) => {
                AtualizarImg(event)
                setAnchorElNav(null)
            }}/>
          </Button>
        ) : null}
        </div>
        </Menu>

    </div>
  );
}

export default DropRules;