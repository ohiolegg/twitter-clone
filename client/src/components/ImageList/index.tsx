import { IconButton } from '@mui/material'
import React from 'react'
import { useHomeStyles } from '../../pages/Home/theme'
import CloseIcon from '@mui/icons-material/Close'

interface ImageListProps {
    classes: ReturnType<typeof useHomeStyles>;
    images: string[];
    removeImage?: (url: string) => void;
}

const ImageList : React.FC<ImageListProps> = ({images, classes, removeImage}) => {

  if(!images.length){
    return null
  }    

  return (
    <div className={classes.imagesList}>
        {
            images.map(url => 
                <div key = {url} style ={{position: 'relative'}}> 
                    <div className = {classes.imagesListItem}>
                        <img src={url} alt='uploaded'/>
                        {
                            removeImage && <IconButton onClick = {(): void => removeImage(url) } color="primary" style = {{position: 'absolute', top: '2%', left: '2%', backgroundColor: 'rgba(15, 20, 25, 0.75)'}}>
                                <CloseIcon style={{ fontSize: 26, cursor: 'pointer', fill: '#fff' }} />
                            </IconButton>
                        }
                    </div>
                </div>
            )
        }
    </div>
  )
}

export default ImageList