import React, { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useHttp } from "../hooks/http.hook";
import { useMessage } from "../hooks/message.hook";


export const AuthPage = () =>{
  const navigate= useNavigate();
  const auth = useContext(AuthContext)
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
        message(data.message)
        console.log('Data',data)

      }catch (e){}
    }

    const loginHandler = async () =>{
      try{
      
        const data = await request('/api/auth/login','POST',{...form})
        auth.login(data.token,data.userId)
        message(data.message)
        console.log('Data',data)
        navigate("/create")
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
        <button onClick={loginHandler} className="btn yellow darken-4 z-depth-2" disabled={loading}  style={{marginRight:10}}>Войти</button>
        <button onClick={registerHandler} disabled={loading} className="btn gray ligten-1 black-text z-depth-2">Регистрация</button>
        </div>
      </div>
            </div>
           
        </div>
        </div>
      
    )
}