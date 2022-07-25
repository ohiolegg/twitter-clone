import React from 'react'
import { Dialog, DialogContent, DialogTitle, IconButton, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/CloseOutlined';

interface ModalBlockProps {
    children: React.ReactNode,
    title?: string,
    visible?: boolean, 
    onClose: () => void
}

export const ModalBlock: React.FC<ModalBlockProps> = ({title, children, visible, onClose}): React.ReactElement | null=> {
  
  if(!visible){
    return null
  }

  return (
    <Dialog open={visible} onClose={onClose} aria-labelledby="form-dialog-title">
    <DialogTitle id="form-dialog-title" style = {{padding: '16px', display: 'flex', alignItems: 'center'}}>
        <IconButton onClick={onClose} color="secondary" aria-label="close">
          <CloseIcon style={{ fontSize: 26, marginRight: 20 }} color="secondary" />
        </IconButton>
        <Typography variant = 'h2' style = {{fontSize: 22, fontWeight: 700}}>
          {title}
        </Typography>
    </DialogTitle>
    <DialogContent>{children}</DialogContent>
  </Dialog>

  )
}
