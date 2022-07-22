import axios from 'axios'

axios.interceptors.request.use(config => {
    const token = window.localStorage.getItem('token')
    if(!token){
        return config
    }

    if (config.headers === undefined) {
        return config
    }else{
    
        config.headers['token'] = token
        return config
    }

})

export {axios}