import React from "react"
import {Switch} from 'react-router-dom'
import { CreatePage } from "./pages/CreatePage"
import { DetailPage } from "./pages/DetailPage"
import { LinksPage } from "./pages/LinksPAge"
export const useRoutes = isAuthenticated =>{
 if(isAuthenticated){
     return(
         <Switch>
             <Route path="/links" exact>
            <LinksPage/>

             </Route>
             <Route path="/create" exact>
             <CreatePage/>

             </Route>
             <Route path="/detail/:id" >
             <DetailPage/>

             </Route>
         </Switch>
     )
 }

 return(
    <Switch>

    </Switch>
 )
}