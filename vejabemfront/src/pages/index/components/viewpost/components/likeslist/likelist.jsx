import React from 'react'
import './likelist.css'
import { Box } from '@mui/material';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';


const LikeList = (props) => {
  
    const handleCloseNavMenu = () => {
        props.setlikesAnchorElNav(null);
        props.setLikesList(null)
    };
  

    return (
        <Menu 
        open={props.likeslist} 
        onClose={() => handleCloseNavMenu()}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        anchorEl={props.likesanchorElNav}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        >
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'flex' } }} id="boxlikes">
            {props.likes && props.likes.usuarios.map((likes) => (
                <div key={likes.first_name}>
                  <p><Avatar src={likes.img} sx={{ width: 30, height: 30 }} id="avatar-likes" />
                    <b>{likes.first_name.split(' ').slice(0, 2).join(' ')}</b>
                  </p>
                </div>
            ))}
            
          </Box>
        </Menu>
    )
}

export default LikeList;
