import React from "react";
import { Redirect, Route } from "react-router-dom";

function ProtectedRoute({ component: Component, ...restOfProps }) {
  const isAuthenticated = localStorage.getItem("isAuth");
  console.log("this", isAuthenticated);

  return (
    <Route
      {...restOfProps}
      render={(props) => {
        if(isAuthenticated=="true"){
          console.log("yaha tk")
            return <Component {...props} /> 
        }
       else if(isAuthenticated==="false"){ 
         console.log("nahi aaaya")
         return <Redirect to="/error" />
      }
      
    }
} />
  );
}

export default ProtectedRoute;