import React from "react";
import useStore from "hooks/useStore";
import Loader from "components/Loader/Loader";
import { Navigate } from "react-router-dom";

import useCookieTokenValidate from "hooks/useCookieTokenValidate";

const ProtectedRoute = (props) => {
    const { roles } = props;

    const [
        {
            state: { auth, isAuthLoaded },
            actions: { signOutAction }
        },
    ] = useStore();

    let [tokenData, isServerLoading] = useCookieTokenValidate(auth, signOutAction);

    if (!isAuthLoaded || isServerLoading) {
        return (
            <Loader
                title="Please wait your role checking. Soon redirect"
                size={40}
                className="fixed top-1/4 left-1/2 transform -translate-x-1/2"
            />
        );
    }

    if (auth && tokenData && roles.includes(tokenData.role)) {
        return props.children;
    } else {
        return <Navigate to="/login" state={location.pathname} />;
    }
};

export default ProtectedRoute;
