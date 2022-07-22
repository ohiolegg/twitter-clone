import React from 'react'
import {SignIn} from './pages/SignIn'
import { ThemeProvider } from '@emotion/react'
import theme from './theme'
import {Home} from './pages/Home/Home'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { Feed } from './components/Feed'
import { useHomeStyles } from './pages/Home/theme'
import { FullTweet } from './components/fullTweet'
import { useAppDispatch, useAppSelector } from './hooks/redux'
import { fetchAuthMe, selectIsAuth } from './redux/slices/authSlice'
import { LoadingState } from './redux/slices/state'
import TwitterIcon from '@mui/icons-material/Twitter'
import { UserPage } from './pages/User'
import ActivatePage from './pages/ActivatePage'

function App() {
  const homeClasses = useHomeStyles();
  const isAuth = useAppSelector(selectIsAuth)
  const navigate = useNavigate()
  const location = useLocation()
  const { globalLoadingState } = useAppSelector(state => state.auth)
  const loadingStatus = globalLoadingState !== LoadingState.NEVER && globalLoadingState !== LoadingState.LOADING

  const dispatch = useAppDispatch()

  React.useEffect(() => {
    dispatch(fetchAuthMe())
  }, [dispatch])

  React.useEffect(() => {
    
    if(!isAuth && loadingStatus){
      return navigate('/signin')
    } 
    
    if(isAuth && loadingStatus && location.pathname === '/signin'){
      return navigate('/')
    }
  }, [isAuth, loadingStatus, navigate])
  
  return (
    <div className="App">
      {
        loadingStatus ? (        
            <ThemeProvider theme = {theme}>
              <Routes>
                <Route path = '/signin' element = {<SignIn/>}/>
                <Route path = '/' element = {<Home/>}>
                  <Route index element = {<Feed classes = {homeClasses}/>}/>
                  <Route path = '/home/tweet/:id' element = {<FullTweet classes = {homeClasses}/>}/>
                  <Route path = '/user/:id' element = {<UserPage/>}/>
                  <Route path = '/user/activate/:hash' element = {<ActivatePage/>}/>
                </Route>
              </Routes>
            </ThemeProvider>
          ) : (
          <div style = {{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh'}}> <TwitterIcon color="primary" style = {{fontSize: 75}}/> </div>
        )
      }

    </div>
  );
}

export default App;
