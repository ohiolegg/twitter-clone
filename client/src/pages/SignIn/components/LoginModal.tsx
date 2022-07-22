import { AlertColor, Button, FormControl, FormGroup, TextField } from '@mui/material'
import React from 'react'
import { useStylesSignIn } from '..'
import { ModalBlock } from '../../../components/Dialog'
import { useForm } from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Controller } from "react-hook-form";
import { useAppDispatch, useAppSelector } from '../../../hooks/redux'
import { fetchAuth } from '../../../redux/slices/authSlice'
import { LoadingState } from '../../../redux/slices/state'
import { Notification } from '../../../components/Notification'

interface LoginModalProps{
    open: boolean;
    onClose: () => void
}

interface loginFormProps{
    username: string;
    password: string
}

const loginFormSchema = yup.object().shape({
    username: yup.string().email('Incorrect email').required('Type your email'),
    password: yup.string().min(6, 'Minimal password length is 6 symb').required('Type your password')
})

const LoginModal: React.FC<LoginModalProps> = ({ open,
    onClose,   
}) : React.ReactElement => {

  const [openNotification, setOpenNotification] = React.useState<boolean>(false);
  const [notificationObj, setNotificationObj] = React.useState<{ text: string; type: AlertColor }>();

  const handlepenNotification = (text: string, type: AlertColor) => {
    setNotificationObj({
      text,
      type
    });
    setOpenNotification(true);
  }  

  const classes = useStylesSignIn()
  const { register, handleSubmit, formState: { errors }, control } = useForm<loginFormProps>({
    resolver: yupResolver(loginFormSchema)
  })
  const dispatch = useAppDispatch()
  const { loadingState } = useAppSelector(state => state.auth)
  
  const onSubmit = async (formData : loginFormProps) => {
    try{
        const {payload} : any = await dispatch(fetchAuth(formData))

        if(!payload){
            handlepenNotification('Incorrect login or password', 'error')
        }

        if(payload.token){
            localStorage.setItem('token', payload.token)
        }
        
        console.log(payload)
    }catch(e){
        handlepenNotification('Incorrect login or password', 'error')
    }
  }

  React.useEffect(() => {
    if(loadingState === LoadingState.LOADED){
        handlepenNotification('Successful authorization!', 'success')
        onClose()
    } else if (loadingState === LoadingState.ERROR) {
        handlepenNotification('Incorrect login or password', 'error')
    }
  }, [loadingState, onClose])
  
  return (
    <>
        <ModalBlock
            visible={open}
            onClose={onClose}
            title="Войти в аккаунт">
            <form onSubmit = {handleSubmit(onSubmit)}>
                <FormControl className={classes.loginFormControl} component="fieldset" fullWidth>
                <FormGroup aria-label="position" row>
                    <Controller
                        name = "username"
                        control={control}
                        defaultValue = ""
                        render={({ field}) => 
                            <TextField
                            {...field}
                            className = {classes.loginSideField}
                            id = "email"
                            label = "E-Mail"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant = "filled"
                            type = "email"
                            helperText = {errors.username?.message}
                            error = {!!errors.username}
                            fullWidth
                            autoFocus
                            />
                        }
                    />

                    <Controller
                        name = "password"
                        control={control}
                        defaultValue = ""
                        render={({ field }) => 
                            <TextField
                            {...field}
                                className={classes.loginSideField}
                                id="password"
                                label="Пароль"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="filled"
                                type="password"
                                helperText = {errors.password?.message}
                                error = {!!errors.password}
                                fullWidth
                                autoFocus
                            />
                        }
                    />
                    <Button disabled = {loadingState === LoadingState.LOADING} type="submit" variant="contained" color="primary" fullWidth>
                    Sign In
                    </Button>
                </FormGroup>
                </FormControl>
            </form>
        </ModalBlock>
        <Notification open = {openNotification} notificationObj = {notificationObj} setOpen = {setOpenNotification}/> 
    </>
  )
}

export default LoginModal