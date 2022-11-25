import React, {useEffect} from 'react';
import useStore from "hooks/useStore";
import Loader from "components/Loader/Loader";
import {Navigate} from "react-router-dom";

const ProtectedRoute = (props) => {
    const {role} = props
    let allRoles = ["SELLER", "BUYER", "ADMIN"]

    const [{state: { auth, isAuthLoaded }}] = useStore()

    if(!isAuthLoaded){
        return <Loader title="Please wait your role checking. Soon redirect" size={40} className="fixed top-1/4 left-1/2 transform -translate-x-1/2" />
    }

    if(!role && allRoles.includes(auth?.role)){
        // all authenticate user can access route
        return props.children

    } else if (role === auth?.role) {
        // specific role can access these route
        return props.children

    } else {
        return <Navigate to="/login" state={{ from: location.pathname }} />;
    }
};


export default ProtectedRoute;