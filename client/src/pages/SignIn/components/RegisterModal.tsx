import { AlertColor, Button, FormControl, FormGroup, TextField } from '@mui/material'
import React from 'react'
import { useStylesSignIn } from '..'
import { ModalBlock } from '../../../components/Dialog'
import { useForm } from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Controller } from "react-hook-form";
import { useAppDispatch, useAppSelector } from '../../../hooks/redux'
import { fetchRegister } from '../../../redux/slices/authSlice'
import { LoadingState } from '../../../redux/slices/state'
import { Notification } from '../../../components/Notification'

interface RegisterModalProps{
    open: boolean;
    onClose: () => void
}

interface RegisterFormProps{
  fullname: string;
  username: string;
  email: string;
  password: string;
  password2: string;
}

const RegisterFormSchema = yup.object().shape({
    email: yup.string().email('Incorrect email').required('Type your email'),
    fullname:  yup.string().required('Type your name'),
    username: yup.string().required('Type your username'),
    password: yup.string().min(6, 'Minimal password length is 6 symb').required('Type your password'),
    password2: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required('Type matching password')
})

const RegisterModal: React.FC<RegisterModalProps> = ({ open,
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
  const { register, handleSubmit, formState: { errors }, control } = useForm<RegisterFormProps>({
    resolver: yupResolver(RegisterFormSchema)
  })
  const dispatch = useAppDispatch()
  const { loadingState } = useAppSelector(state => state.auth)
  
  const onSubmit = async (formData : RegisterFormProps) => {
    try{
        const {payload} : any = await dispatch(fetchRegister(formData))

        if(!payload){
            handlepenNotification('Incorrect login or password', 'error');
        }
    
    }catch(e){
        handlepenNotification('Incorrect login or password', 'error');
    }
  }

  React.useEffect(() => {
    if(loadingState === LoadingState.LOADED){
        handlepenNotification('successful registration', 'success')
        onClose()
    } else if (loadingState === LoadingState.ERROR) {
        handlepenNotification('Incorrect login or password', 'error')
    }
  }, [onClose, loadingState])
  
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
                    name = "email"
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
                        helperText = {errors.email?.message}
                        error = {!!errors.email}
                        fullWidth
                        autoFocus
                        />
                    }
                />

                <Controller
                    name = "username"
                    control={control}
                    defaultValue = ""
                    render={({ field}) => 
                        <TextField
                        {...field}
                        className = {classes.loginSideField}
                        id = "username"
                        label = "Username"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant = "filled"
                        type = "text"
                        helperText = {errors.username?.message}
                        error = {!!errors.username}
                        fullWidth
                        autoFocus
                        />
                    }
                />

                <Controller
                    name = "fullname"
                    control={control}
                    defaultValue = ""
                    render={({ field}) => 
                        <TextField
                        {...field}
                        className = {classes.loginSideField}
                        id = "fullname"
                        label = "Full Name"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant = "filled"
                        type = "text"
                        helperText = {errors.fullname?.message}
                        error = {!!errors.fullname}
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
                            label="Password"
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

                <Controller
                    name = "password2"
                    control={control}
                    defaultValue = ""
                    render={({ field }) => 
                        <TextField
                        {...field}
                            className={classes.loginSideField}
                            id="password2"
                            label="Repeat your password"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="filled"
                            type="password"
                            helperText = {errors.password2?.message}
                            error = {!!errors.password2}
                            fullWidth
                            autoFocus
                        />
                    }
                />
                <Button disabled = {loadingState === LoadingState.LOADING} type="submit" variant="contained" color="primary" fullWidth>
                Sign Up
                </Button>
            </FormGroup>
            </FormControl>
        </form>
    </ModalBlock>
    <Notification open = {openNotification} notificationObj = {notificationObj} setOpen = {setOpenNotification}/>
    </>

  )
}

export default RegisterModal