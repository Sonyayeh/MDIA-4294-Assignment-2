import { Component } from "react";
import { Navigate } from "react-router";

// This function validates where a user is logged in, if they are they will be allowed to visit the component that gets passed in here
const authRequired = (Component) => {

    // this is the component for create/store 
    const AuthenticatedComponent = (props) => {

        // this is to check for JWT Tokwn
        const token = localStorage.getItem("jwt-token");

        // If there is no token, use the Navigate component to redirect
        if(!token) {
            return <Navigate to="/sign-up" />
        }

        // If the above passes, return the passed in <Component />
        return <Component {...props} />;

    }

    // Regardless of which of the above components is returned, return it.
    return AuthenticatedComponent;

}

export default authRequired;