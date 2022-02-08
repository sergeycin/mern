//hook для авторизации обрабатываем токен и переводим человека в систтему
import {useState,useCallback,useEffect} from 'react'
const storageName = 'userData'

export const useAuth = () => {
    const [token,setToken] = useState(null)
    const [userId, setUserId] = useState(null)

    const login = useCallback((jwtToken,id) => {
        console.log('kk')
        setToken(jwtToken)
        setUserId(id)

        localStorage.setItem(storageName,JSON.stringify({
            userId: id,token: jwtToken
        }))
    },[])

    const logout = useCallback(() => {
        console.log('logout')
        setToken(null)
        setUserId(null)
        localStorage.removeItem(storageName)
    },[])

    useEffect(()=>{
        const data = JSON.parse(localStorage.getItem(storageName))

        if(data && data.token){
            login(data.token, data.userId)
        }
    },[login])



    return {login,logout,token, userId}
}