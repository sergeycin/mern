import React, { useEffect, useState } from "react";
import { useHttp } from "../hooks/http.hook";
import { useMessage } from "../hooks/message.hook";

export const AuthPage = () =>{
  const message = useMessage()
  const {loading,error,request, clearError} = useHttp() 

    const [form,setForm] = useState({
        email: '', password:''
    })

    useEffect(()=>{
      message(error)
      clearError()
    }, [error,message,clearError])

    const changeHandler = event =>{
        setForm({ ...form, [event.target.name]: event.target.value})
    }

    const registerHandler = async () =>{
      try{
        const data = await request('/api/auth/register','POST',{...form})
        console.log('Data',data)
      }catch (e){}
    }

    return (
        <div className="container">
  <div className="row">
            <div className="col s6 offset-s3">
            <h1>Сократи ссылку</h1>
            <div className="card blue darken-1">
        <div className="card-content white-text">
          <span className="card-title">Авторизация</span>
         
        
        <div className="input-field ">
          <input 
          placeholder="Введите Email" 
          id="email" 
          type="text"
          name="email"
           className="validate"
           onChange={changeHandler}
           />
          {/* <label htmlFor="email">Email</label> */}
        </div>

  
        <div className="input-field ">
          <input 
          placeholder="Введите Password" 
          id="password" 
          type="password"
          name="password"
           className="validate"
           
           onChange={changeHandler}/>
          {/* <label htmlFor="email">Password</label> */}
        </div>
        </div>
        <div className="card-action">
        <button className="btn yellow darken-4 z-depth-2" disabled={loading}  style={{marginRight:10}}>Войти</button>
        <button onClick={registerHandler} disabled={loading} className="btn gray ligten-1 black-text z-depth-2">Регистрация</button>
        </div>
      </div>
            </div>
           
        </div>
        </div>
      
    )
}