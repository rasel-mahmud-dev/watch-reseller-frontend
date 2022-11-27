import { useEffect, useState } from "react";
import axios from "app/axios";

const useCookieTokenValidate = (auth) => {
    const [isServerLoading, setServerLoading] = useState(true);
    const [tokenData, setTokenData] = useState(null);

    useEffect(() => {
        setServerLoading(true);
        axios
            .get("/api/v1/auth/validate-token")
            .then(({ status, data }) => {
                if (status === 200) {
                    setTokenData(data);
                }
            })
            .catch((ex) => {
                setTokenData(null);
            })
            .finally(() => {
                setServerLoading(false);
            });
    }, [auth]);

    return [tokenData, isServerLoading];
};

export default useCookieTokenValidate;
