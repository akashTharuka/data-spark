import React, { useState, useEffect } from "react";
import { Redirect, Route } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...rest }) => {
    
    const token = sessionStorage.getItem("admin_token");
    
    return (
        <Route 
            {...rest} 
            render = {(props) => {

                if (token){
                    return <Component {...props} />
                }
                else{
                    console.log("else");
                    document.location = '/adminlogin';
                    // return <Redirect to={
                    //     {
                    //         pathname: "/adminlogin",
                    //         state: {
                    //             from: props.location
                    //         }
                    //     }
                    // } />
                }
            }
        } />
    );
}

export default ProtectedRoute;