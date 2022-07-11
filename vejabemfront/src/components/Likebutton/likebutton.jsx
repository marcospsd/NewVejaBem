import { IconButton } from '@mui/material';
import React, { useState } from 'react'
import Like from '../svgs/like.svg'
import UnLike from '../svgs/unlike.svg'

const LikeButton = ({likestatus, likeclick, data}) => {

    const status = likestatus(data)

    const SelectButton = () => {
        if (status) {
            return <img src={Like} width={60} height={60}/>
        } else {
            return <img src={UnLike} width={55} height={55}/>
        }
    }

    return (
        <IconButton sx={{ padding: 0, margin: 0}} onClick={() => likeclick(data.id)}>
            {SelectButton()}
        </IconButton>
    )
}

export default LikeButton;