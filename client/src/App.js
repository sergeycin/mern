import React from "react";
import "materialize-css"
import { useRoutes } from "./routes";


function App() {
  const routes = useRoutes(false)
  return (

    <>
     {routes}

    
    </>
  );
}

export default App;