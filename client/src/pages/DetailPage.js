import React, { useCallback, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { LinkCard } from "../components/LinkCard";
import { AuthContext } from "../context/AuthContext";
import { useHttp } from "../hooks/http.hook";

export const DetailPage = () =>{
    const {token} = useContext(AuthContext)
    const {request} =useHttp()
    const [link,setLink]=useState(null)
    const linkId = useParams().id

    const getLink = useCallback(async()=>{
        try{
          const fetched =  await request(`/api/link/${linkId}`, 'GET',null,{
                Authorization: `Bearer ${token}`
            })
            setLink(fetched)
        }catch(e){
            console.log('ne udalos')
        }
    },[token,linkId,request]) 
    
    useEffect(()=>{
        getLink()
    },[getLink])



    return ( 
        <>
        { link && <LinkCard link={link}/>}
            <h1>Detail Page</h1>
        </>
    )
}