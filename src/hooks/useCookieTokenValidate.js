import { useEffect, useState } from "react";
import axiosInstance from "app/axios";

const useCookieTokenValidate = (auth, signOutAction) => {
    const [isServerLoading, setServerLoading] = useState(true);
    const [tokenData, setTokenData] = useState(null);

    useEffect(() => {
        setServerLoading(true);
        axiosInstance()
            .get("/api/v1/auth/validate-token")
            .then(({ status, data }) => {
                if (status === 200) {
                    setTokenData(data);
                } else {
                    throw Error("Token not valid")
                }
            })
            .catch((ex) => {

                // console.log(ex)

                // token is not valid so. make force user logout
                // signOutAction()
                console.log(auth)
                setTokenData(null);

            })
            .finally(() => {
                setServerLoading(false);

            });
    }, [auth]);

    return [tokenData, isServerLoading];
};

export default useCookieTokenValidate;
