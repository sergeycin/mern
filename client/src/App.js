import React from "react";
import "materialize-css"
import { useRoutes } from "./routes";
import { useAuth } from "./hooks/auth.hook";
import { AuthContext } from "./context/AuthContext";
import { Navbar } from "./components/Navbar";


function App() {
  const {token,login,logout,userId} = useAuth()
  const isAuthenticated = !!token //boolean
  const routes = useRoutes(isAuthenticated)
  return (

    <>
    
    <AuthContext.Provider value={{
      token,login,logout,userId, isAuthenticated
    }}>
      {isAuthenticated && <Navbar/>}
     {routes}

     </AuthContext.Provider>
    </>
  );
}

export default App;