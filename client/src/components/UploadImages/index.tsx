import React from 'react'
import ImageOutlinedIcon from '@mui/icons-material/PhotoCameraBack'
import { IconButton } from '@mui/material'
import { useHomeStyles } from '../../pages/Home/theme'
import { imageObj } from '../AddTweetForm'
import ImageList from '../ImageList'

interface UploadImageProps {
    images: imageObj[];
    onChangeImages: (callback: (images: imageObj[]) => imageObj[]) => void
}

const UploadImages: React.FC<UploadImageProps> = ({onChangeImages, images}) => {
  const classes = useHomeStyles()

  const inputRef = React.useRef<HTMLInputElement>(null)  

  const handleClickUImage = () => {
    if(inputRef.current){
        inputRef.current.click()
    }
  }

  const removeImage = (url: string) => {
    onChangeImages(prev => prev.filter(obj => obj.blobUrl !== url))
  }

  const handleChangeInput = React.useCallback((e: Event) => {       
        if(e.target){
            const target = (e.target as HTMLInputElement)
            const file = target.files?.[0]
            if(file){
                const fileObj = new Blob([file])
                onChangeImages(prev => [...prev, {
                    blobUrl: URL.createObjectURL(fileObj),
                    file
                }])
            }
        }
    }, []) 
 

  React.useEffect(() => {
    if(inputRef.current){
        inputRef.current.addEventListener('change', handleChangeInput)
    }

    return () => {
        if(inputRef.current){
            inputRef.current.removeEventListener('change', handleChangeInput)
        }
    }
  }, [])

  return (
    <div>
        <ImageList images = {images.map(obj => obj.blobUrl)} classes = {classes} removeImage = {removeImage}/>
        <IconButton onClick = {handleClickUImage} color="primary">
            <ImageOutlinedIcon style={{ width: 26, cursor: 'pointer' }} />
        </IconButton>
        <input ref = {inputRef} type = "file" id = "upload-input" hidden/>
    </div>

  )
}
export default UploadImages