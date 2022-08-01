import React from 'react'
import classNames from 'classnames'
import { useHomeStyles } from '../../pages/Home/theme' 
import { Alert, Avatar, Button, CircularProgress, TextareaAutosize, AlertColor, FormControl, FormGroup, TextField, Paper } from '@mui/material'
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';

import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { addTweet, setAddFormState } from '../../redux/slices/tweetSlice'
import { AddFormState, User } from '../../redux/slices/state'
import UploadImages from '../UploadImages'
import { IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { useForm } from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Controller } from "react-hook-form"
import { useStylesSignIn } from '../../pages/SignIn'
import axios from 'axios'
import { Notification } from '../Notification'
import { fetchAuthMe } from '../../redux/slices/authSlice'
import { uploadImage } from '../../utils/uploadImage'

interface changeProfileProps {
  userData?: User,
}

interface changeProfileFormProps{
    fullname: string;
    location?:string
    about?:string
    website?:string,
    avatarUrl?: string;
    bannerUrl?: string;
}
  
const ChangeProfileFormSchema = yup.object().shape({
    fullname:  yup.string().required('Type your name'),
    location: yup.string().max(50, 'Maximal location length is 50 symb'),
    about: yup.string().min(5, 'Minimal about length is 5 symb'),
    website: yup.string().url()
})

export interface imageObj {
    file: File;
    blobUrl: string
}

export const ChangeProfileForm: React.FC<changeProfileProps> = ({userData}): React.ReactElement => {

  const [openNotification, setOpenNotification] = React.useState<boolean>(false);
  const [notificationObj, setNotificationObj] = React.useState<{ text: string; type: AlertColor }>()
  const [avatar, setAvatar] = React.useState<imageObj | null>(null)
  const [banner, setBanner] = React.useState<imageObj | null>(null)

  const inputAvatarRef = React.useRef<HTMLInputElement>(null) 
  const inputBannerRef = React.useRef<HTMLInputElement>(null)

  const handleClickAddImage = () => {
    if(inputAvatarRef.current){
        inputAvatarRef.current.click()
    }
  }

  const handleClickAddImage2 = () => {
    if(inputBannerRef.current){
        inputBannerRef.current.click()
    }
  }

  const removeAvatar = () => {
    setAvatar(null)
  }
  const removeBanner = () => {
    setBanner(null)
  }

  const handleChangeAvatar = React.useCallback((e: Event) => {       
        if(e.target){
            const target = (e.target as HTMLInputElement)
            const file = target.files?.[0]
            if(file){
                const fileObj = new Blob([file])
                setAvatar({
                    blobUrl: URL.createObjectURL(fileObj),
                    file
                })
            }
        }
  }, []) 

  const handleChangeBanner = React.useCallback((e: Event) => {       
    if(e.target){
        const target = (e.target as HTMLInputElement)
        const file = target.files?.[0]
        if(file){
            const fileObj = new Blob([file])
            setBanner({
                blobUrl: URL.createObjectURL(fileObj),
                file
            })
        }
    }
}, []) 

  React.useEffect(() => {
    if(inputAvatarRef.current){
        inputAvatarRef.current.addEventListener('change', handleChangeAvatar)
    }

    if(inputBannerRef.current){
        inputBannerRef.current.addEventListener('change', handleChangeBanner)
    }

    return () => {
        if(inputAvatarRef.current){
            inputAvatarRef.current.removeEventListener('change', handleChangeAvatar)
        }

        if(inputBannerRef.current){
            inputBannerRef.current.removeEventListener('change', handleChangeBanner)
        }
    }
  }, [])

  const handlepenNotification = (text: string, type: AlertColor) => {
    setNotificationObj({
      text,
      type
    });
    setOpenNotification(true);
  }  

  const dispatch = useAppDispatch()

  const classes = useStylesSignIn()

  const { register, handleSubmit, formState: { errors }, control } = useForm<changeProfileFormProps>({
    resolver: yupResolver(ChangeProfileFormSchema)
  })

  const onSubmit = async (formData : changeProfileFormProps) => {

    try{
        if(avatar){
            const avatarFile = avatar.file
            const { url } = await uploadImage(avatarFile)
            formData.avatarUrl = url
        }

        if(banner){
            const bannerFile = banner.file
            const { url } = await uploadImage(bannerFile)
            formData.bannerUrl = url
        }

        console.log(formData)

        const {data} : any = await axios.patch(`/auth/${userData?._id}`, formData)

        if(!data){
            handlepenNotification('Incorrect information', 'error')
            return
        }

        dispatch(fetchAuthMe())
        handlepenNotification('Successfully edited!', 'success')
    }catch(e){
        handlepenNotification('Incorrect information', 'error')
    }
  }

  return (
    <div>
        <Paper className="user__header" style = {{width: '120%', marginLeft: '-10%', background: 'blue', backgroundPosition: 'center', position: 'relative', backgroundImage: `url(${banner ? banner.blobUrl :userData?.bannerUrl})`, backgroundSize: 'cover'}}> 
            {
                banner ? (
                    <>
                        <IconButton onClick = {removeBanner} color="primary" style = {{position: 'absolute', top: '5%', right: '22%', backgroundColor: 'rgba(15, 20, 25, 0.75)'}}>
                            <CloseIcon style={{ fontSize: 26, cursor: 'pointer', fill: '#fff' }} />
                        </IconButton>

                        <IconButton onClick = {handleClickAddImage2} color="primary" style = {{position: 'absolute', top: '5%', right: '12%', backgroundColor: 'rgba(15, 20, 25, 0.75)'}}>
                            <AddAPhotoIcon style={{ fontSize: 26, cursor: 'pointer', fill: '#fff' }} />
                        </IconButton>
                    </>

                ) : (
                    <IconButton onClick = {handleClickAddImage2} color="primary" style = {{position: 'absolute', top: '5%', right: '12%', backgroundColor: 'rgba(15, 20, 25, 0.75)'}}>
                        <AddAPhotoIcon style={{ fontSize: 26, cursor: 'pointer', fill: '#fff' }} />
                    </IconButton>
                )
                
            }
            <input ref = {inputBannerRef} type = "file" id = "upload-input" hidden/>
        </Paper>
        <div style={{width: 550}}>
            <div style = {{position: 'relative'}}>
            <Avatar onClick = {handleClickAddImage} style = {{width: 140, height: 140, border: '4px solid white', marginTop: -70, cursor: 'pointer'}} src = {avatar ? avatar.blobUrl :userData?.avatarUrl}/>
            <input ref = {inputAvatarRef} type = "file" id = "upload-input" hidden/>
            {
                avatar ? (
                    <IconButton onClick = {removeAvatar} color="primary" style = {{position: 'absolute', top: '35%', left: '10%', backgroundColor: 'rgba(15, 20, 25, 0.75)'}}>
                        <CloseIcon style={{ fontSize: 26, cursor: 'pointer', fill: '#fff' }} />
                    </IconButton>
                ) : (
                    <IconButton onClick = {handleClickAddImage} color="primary" style = {{position: 'absolute', top: '35%', left: '10%', backgroundColor: 'rgba(15, 20, 25, 0.75)'}}>
                        <AddAPhotoIcon style={{ fontSize: 26, cursor: 'pointer', fill: '#fff' }} />
                    </IconButton>
                )
                
            }
            </div>
            <form style = {{marginTop: 50}} onSubmit = {handleSubmit(onSubmit)}>
                <FormControl className={classes.loginFormControl} component="fieldset" fullWidth>
                <FormGroup aria-label="position" row>
                    <Controller
                        name = "fullname"
                        control={control}
                        defaultValue = {userData?.fullname}
                        render={({ field}) => 
                            <TextField
                            {...field}
                            className = {classes.loginSideField}
                            id = "fullname"
                            label = "Your fullname"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant = "outlined"
                            type = "text"
                            helperText = {errors.fullname?.message}
                            error = {!!errors.fullname}
                            fullWidth
                            autoFocus
                            />
                        }
                    />

                    <Controller
                        name = "location"
                        control={control}
                        defaultValue = {userData?.location}
                        render={({ field}) => 
                            <TextField
                            {...field}
                            className = {classes.loginSideField}
                            id = "location"
                            label = "Where are you ?"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant = "outlined"
                            type = "text"
                            helperText = {errors.location?.message}
                            error = {!!errors.location}
                            fullWidth
                            autoFocus
                            />
                        }
                    />

                    <Controller
                        name = "about"
                        control={control}
                        defaultValue = {userData?.about}
                        render={({ field}) => 
                            <TextField
                            {...field}
                            className = {classes.loginSideField}
                            id = "about"
                            label = "About"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant = "outlined"
                            type = "text"
                            helperText = {errors.about?.message}
                            error = {!!errors.about}
                            fullWidth
                            autoFocus
                            />
                        }
                    />

                    <Controller
                        name = "website"
                        control={control}
                        defaultValue = {userData?.website}
                        render={({ field }) => 
                            <TextField
                            {...field}
                                className={classes.loginSideField}
                                id="website"
                                label="Your website"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant = "outlined"
                                type="text"
                                helperText = {errors.website?.message}
                                error = {!!errors.website}
                                fullWidth
                                autoFocus
                            />
                        }
                    />

                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        Save changes
                    </Button>
                </FormGroup>
                </FormControl>
            </form>
        </div>
        <Notification open = {openNotification} notificationObj = {notificationObj} setOpen = {setOpenNotification}/>
    </div>
  );
};
