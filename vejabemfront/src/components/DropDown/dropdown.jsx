import React from 'react';
import './dropdown.css'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { IconButton } from '@mui/material';
import Button from '@mui/material/Button';


const DropDown = ({DeletePost, ID}) => {
  return (
    <div class="dropdown">
        <IconButton className='mainmenubtn'>
            <ArrowDropDownIcon/>
        </IconButton>
        <div class="dropdown-child">
            <Button variant="text" onClick={() => DeletePost(ID)}>Excluir</Button>
        </div>
    </div>
  );
}

export default DropDown;