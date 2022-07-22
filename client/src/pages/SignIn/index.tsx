// @ts-nocheck
import React from 'react'
import { Button, Typography } from '@mui/material'
import TwitterIcon from '@mui/icons-material/Twitter'
import SearchIcon from '@mui/icons-material/Search'
import PeopleIcon from '@mui/icons-material/PeopleOutline'
import PublicOutlinedIcon from '@mui/icons-material/PublicOutlined'
import LoginModal from './components/LoginModal'
import { makeStyles } from '@mui/styles'
import { Theme } from '@mui/system'
import RegisterModal from './components/RegisterModal'


export const useStylesSignIn = makeStyles((theme: Theme) => ({
  wrapper: {
    display: 'flex',
    height: '100vh',
  },
  blueSide: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#71C9F8',
    flex: '0 0 50%',
    overflow: 'hidden',
    position: 'relative',
  },
  blueSideBigIcon: {
    position: 'absolute !important',
    left: '50% !important',
    top: '53% !important',
    transform: 'translate(-50%, -50%) !important',
    width: '250% !important',
    height: '250% !important',
  },
  loginFormControl: {
    marginBottom: 10,
  },
  blueSideListInfo: {
    position: 'relative',
    listStyle: 'none',
    padding: 0,
    margin: 0,
    width: 380,
    '& h6': {
      display: 'flex',
      alignItems: 'center',
      color: 'white',
      marginBottom: 50,
      fontWeight: 600,
      fontSize: 20,
    },
  },
  blueSideListInfoItem: {
    marginBottom: 40,
  },
  blueSideListInfoIcon: {
    width: '40px !important',
    height: '40px !important',
    marginRight: 15,
  },
  loginSide: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: '0 0 50%',
  },
  loginSideTwitterIcon: {
    fontSize: '55px !important',
  },
  loginSideWrapper: {
    width: 380,
  },
  loginSideTitle: {
    fontWeight: '700 !important',
    fontSize: '48px !important',
    marginBottom: '60px !important',
    marginTop: '20px !important',
  },
  registerField: {
    marginBottom: '30px !important',
    background: 'none'
  },
  loginSideField: {
    marginBottom: '30px !important',
    background: 'none'
  },
  modalTitle: {
    fontSize: 24
  }
}));

export const SignIn: React.FC = (): React.ReactElement => {
  const classes = useStylesSignIn()
  const [visibleModal, setVisibleModal] = React.useState<'signIn' | 'signUp'>()

  const handleClickOpenSignIn = (): void => {
    setVisibleModal('signIn')
  };

  const handleClickOpenSignUp = (): void => {
    setVisibleModal('signUp')
  };

  const handleCloseModal = (): void => {
    setVisibleModal(undefined);
  } 

  return (
    <div className= {classes.wrapper}>
      <section className= {classes.blueSide}>
      <TwitterIcon color="primary" className = {classes.blueSideBigIcon}/>
        <ul className = {classes.blueSideListInfo}>
          <li><Typography variant = "h6"><SearchIcon className = {classes.blueSideListInfoIcon}/>Read about interesting things for you</Typography></li>
          <li><Typography variant = "h6"><PeopleIcon className = {classes.blueSideListInfoIcon}/>Get into conversations all over the world</Typography></li>
          <li><Typography variant = "h6"><PublicOutlinedIcon className = {classes.blueSideListInfoIcon}/>Know what's happening in the world now</Typography></li>
        </ul>
      </section>
      <section className={classes.loginSide}>
        <div className={classes.loginSideWrapper}>
          <TwitterIcon color="primary" className = {classes.loginSideTwitterIcon}/>
          <Typography className = {classes.loginSideTitle} variant = "h3">Knowing what's going on</Typography>
          <Typography><b>Join Twitter now!</b></Typography>
          <br/>
          <Button
              onClick={handleClickOpenSignUp}
              style={{ marginBottom: 20 }}
              variant="contained"
              color="primary"
              fullWidth>
              Sign Up
          </Button>
          <Button 
            onClick={handleClickOpenSignIn}
            variant="outlined" 
            color="primary" 
            fullWidth>
            Sign In
          </Button>

          <LoginModal onClose={handleCloseModal} open = {visibleModal === 'signIn'}/>

          <RegisterModal onClose={handleCloseModal} open = {visibleModal === 'signUp'}/>
        </div>
      </section>
    </div>
  )
}

