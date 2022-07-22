import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { axios } from '../core/axios'
import { useAppDispatch } from '../hooks/redux'
import { fetchAuthMe, setAuthGlobalLoading } from '../redux/slices/authSlice'
import { LoadingState } from '../redux/slices/state'

const ActivatePage = () => {

  const { hash } = useParams()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  React.useEffect(() => {
    dispatch(setAuthGlobalLoading(LoadingState.NEVER))
    axios.get(`/auth/verify?hash=${hash}`).then(({data}) => {
        if(data.token){
            localStorage.setItem('token', data.token)
        }
        dispatch(fetchAuthMe())
        navigate('/')
    }).catch(() => {
        dispatch(setAuthGlobalLoading(LoadingState.LOADED))
    })
  }, [])

  return (
    null
  )
}

export default ActivatePage