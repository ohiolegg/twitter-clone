import React from 'react'
import classNames from 'classnames'
import { useHomeStyles } from '../../pages/Home/theme' 
import { Alert, Avatar, Button, CircularProgress, TextareaAutosize, AlertColor, FormControl, FormGroup, TextField } from '@mui/material'

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

interface changeProfileProps {
  userData?: User,
}

interface changeProfileFormProps{
    fullname: string;
    location?:string
    about?:string
    website?:string
}
  
const ChangeProfileFormSchema = yup.object().shape({
    fullname:  yup.string().required('Type your name'),
    location: yup.string().max(50, 'Maximal location length is 50 symb'),
    about: yup.string().min(5, 'Minimal about length is 5 symb'),
    website: yup.string().url()
})

const MAX_LENGTH = 160

export const ChangeProfileForm: React.FC<changeProfileProps> = ({userData}): React.ReactElement => {

  const [text, setText] = React.useState<string>('')
  const textLimitPercent = Math.round((text.length / MAX_LENGTH ) * 100)
  const textCount = MAX_LENGTH - text.length 

  const [openNotification, setOpenNotification] = React.useState<boolean>(false);
  const [notificationObj, setNotificationObj] = React.useState<{ text: string; type: AlertColor }>();

  const handlepenNotification = (text: string, type: AlertColor) => {
    setNotificationObj({
      text,
      type
    });
    setOpenNotification(true);
  }  

  const dispatch = useAppDispatch()

  const handleChangeTextare = (e: React.FormEvent<HTMLTextAreaElement>) : void => {
    if(e.currentTarget)(
      setText(e.currentTarget.value)
    )
  }

  const classes = useStylesSignIn()

  const { register, handleSubmit, formState: { errors }, control } = useForm<changeProfileFormProps>({
    resolver: yupResolver(ChangeProfileFormSchema)
  })

  const onSubmit = async (formData : changeProfileFormProps) => {
    try{
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
        <div className="user__header" style = {{width: '150%', marginLeft: '-25%'}}></div>
        <div style={{width: 550}}>
            <div style = {{position: 'relative'}}>
            <Avatar style = {{width: 140, height: 140, border: '4px solid white', marginTop: -70}} src = {userData?.avatarUrl}/>

            <IconButton color="primary" style = {{position: 'absolute', top: '35%', left: '10%', backgroundColor: 'rgba(15, 20, 25, 0.75)'}}>
                <CloseIcon style={{ fontSize: 26, cursor: 'pointer', fill: '#fff' }} />
            </IconButton>
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
