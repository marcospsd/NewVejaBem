import React, {useState} from 'react';
import './dropdown.css'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Box, IconButton } from '@mui/material';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';


const DropDown = ({DeletePost, ID}) => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };



  return (
    <div className="dropdown">
        <IconButton className='mainmenubtn' onClick={(event) => handleOpenNavMenu(event)}>
            <ArrowDropDownIcon/>
        </IconButton>
        <Menu 
        open={anchorElNav} 
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
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'flex' } }}>
              <Button id="delete" variant="text" onClick={() => DeletePost(ID)}>Excluir</Button>
          </Box>
        </Menu>

    </div>
  );
}

export default DropDown;