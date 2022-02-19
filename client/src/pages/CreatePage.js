import React,{useContext, useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useHttp } from "../hooks/http.hook";

export const CreatePage = () =>{
    const navigate= useNavigate();
    const auth = useContext(AuthContext)
   const [link,setLink] =useState('')
   const {request} = useHttp()

   useEffect(() => {
    window.M.updateTextFields()
  }, [])

   const pressHandler = async event =>{
       if(event.key === 'Enter'){
           
           try{
              const data = await request('/api/link/generate','POST', {from:link},{
                  Authorization: `Bearer ${auth.token}`  // headers которые нужно отправить
              })
              navigate(`/detail/${data.link._id}`)
              console.log(data)
           }catch(e){ console.log('Не удалось создать')}
       }
   }
    return (
        <div className="row">
            <div className="col s8 offset-s2" style={{paddingTop: '2rem'}}>
            <div className="input-field ">
          <input 
          placeholder="Вставьте ссылку" 
          id="link" 
          type="text"
        value={link}
           className="validate"
           onChange={e => setLink(e.target.value)}
           onKeyPress={pressHandler}
           />
          {/* <label htmlFor="email">Email</label> */}
        </div>
            </div>
        </div>
        
    )
}