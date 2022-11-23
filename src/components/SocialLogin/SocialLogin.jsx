import React from 'react';
import {BsGoogle} from "react-icons/all";
import Button from "../Button/Button";

const SocialLogin = () => {
    return (
        <Button className="!bg-red-400 flex gap-x-1 items-center w-full justify-center">
            <BsGoogle className="text-sm"/>
            <span>Login With Google</span>
        </Button>
    );
};

export default SocialLogin;