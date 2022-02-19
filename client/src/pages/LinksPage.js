import React, { useCallback, useContext, useEffect, useState } from "react";
import { LinksList } from "../components/LinksList";
import { AuthContext } from "../context/AuthContext";
import { useHttp } from "../hooks/http.hook";

export const LinksPage = () =>{
    const [links,setLinks] = useState([])
    const {request} = useHttp()
    const {token} = useContext(AuthContext)

    const fetchLinks = useCallback(async () =>{
        try{ 
            const fetched = await request('/api/link/','GET',null,{
                Authorization: `Bearer ${token}`
            })
            setLinks(fetched)
        
        }catch(e){
               
        }
    },[token,request])

    useEffect(()=>{
        fetchLinks()
    },[fetchLinks])
    
    return (
      <>
      <LinksList links={links}/>
      </>
    )
}