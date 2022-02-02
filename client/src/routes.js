import React from "react"
import {Routes ,Route , NavLink, Navigate } from 'react-router-dom'
import { CreatePage } from "./pages/CreatePage"
import { DetailPage } from "./pages/DetailPage"
import { LinksPage } from "./pages/LinksPage"
import {AuthPage} from "./pages/AuthPage"

export const useRoutes = isAuthenticated =>{
 if(isAuthenticated){
     return(
        <>
      <Routes>

          
            <Route path="/links" element={<LinksPage/>}/> 
           
            <Route path="/create" element={<CreatePage/>}/> 
            <Route path="/detail/:id" element={<DetailPage/>}/> 
         
            
            
             </Routes>
              <Navigate to="/create" replace={true} />
              </>
     )
 }

 return(
        <>
        
 <Routes>
    <Route path="/" element={<AuthPage/>}/> 

  </Routes>
  <Navigate to="/" replace={true} />
 </>

       
   
 )
}