import React, { useState } from "react";

export const AuthPage = () =>{
    const [form,setForm] = useState({
        email: '', password:''
    })

    const changeHandler = event =>{
        setForm({ ...form, [event.target.name]: event.targer.value})
    }

    return (
        <div className="container">
  <div classNameName="row">
            <div classNameName="col s6 offset-s3">
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
        <button className="btn yellow darken-4 z-depth-2" style={{marginRight:10}}>Войти</button>
        <button className="btn gray ligten-1 black-text z-depth-2">Регистрация</button>
        </div>
      </div>
            </div>
           
        </div>
        </div>
      
    )
}