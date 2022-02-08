import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";


export const Navbar = () =>{  
    const navigate = useNavigate();
    const auth = useContext(AuthContext)
    const logoutHandler = event =>{
        try {
            auth.logout()
            
            navigate("/")
           event.preventDefault()
        }
       catch(e)
       {
           console.log(e)
       }
       
    }
return(
    <nav>
    <div className="nav-wrapper blue datken-1" style={{padding: '0.2rem'}}>
      <span href="/" className="brand-logo">Сокращение ссылок</span>
      <ul id="nav-mobile" className="right hide-on-med-and-down">
        <li><NavLink to="/create">Создать</NavLink></li>
        <li><NavLink to="/links">Ссылки</NavLink></li>
        <li><a onClick={logoutHandler} href="/">Выйти</a></li>
      
      </ul>
    </div>
  </nav>
        
)

}