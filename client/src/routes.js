import React from "react"
import {Routes ,Route , NavLink, Navigate, useNavigate } from 'react-router-dom'
import { CreatePage } from "./pages/CreatePage"
import { DetailPage } from "./pages/DetailPage"
import { LinksPage } from "./pages/LinksPage"
import {AuthPage} from "./pages/AuthPage"

export const useRoutes = isAuthenticated =>{
  const navigate= useNavigate();
 if(isAuthenticated){
     return(
       
        <>
        
         {/* <Navigate to="/create" /> */}
        
      <Routes>

      <Route path="/create" element={<CreatePage/>}/> 
            <Route path="/links" element={<LinksPage/>}/> 
           
            
            <Route path="/detail/:id" element={<DetailPage/>}/> 
         
            
            
             </Routes>
             
              </>
     )
 }

 return(
        <>
        
 <Routes>
    <Route path="/" element={<AuthPage/>}/> 

  </Routes>
  {/* <Navigate to="/" replace={true} /> */}
 </>

       
   
 )
}