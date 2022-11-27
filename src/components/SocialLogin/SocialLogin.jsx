import React from 'react';
import {BsGoogle} from "react-icons/all";
import Button from "../Button/Button";
import useStore from "../../hooks/useStore";
import toast from "react-hot-toast";
import catchErrorMessage from "utils/catchErrorMessage";
import {useLocation, useNavigate} from "react-router-dom";

const SocialLogin = ({onCreateLoginSession}) => {
    const [{ state, actions }]  = useStore();

    const location = useLocation();
    const navigate = useNavigate();

    async function handleSocialLogin (){
        try {
            let user = await actions.googleSignInAction()
            if(user) {
                onCreateLoginSession && onCreateLoginSession()
            } else {
                toast.error("Google Login fail");
            }
        } catch (ex) {
            toast.error(catchErrorMessage(ex));
        }
    }

    return (
        <Button type="button" onClick={handleSocialLogin} className="!bg-red-400 flex gap-x-1 items-center w-full justify-center">
            <BsGoogle className="text-sm"/>
            <span>Login With Google</span>
        </Button>
    );
};

export default SocialLogin;