import React, { useEffect, useRef, useState } from "react";
import "./login.css";
import validator from "utils/validator";
import { BsGoogle, FiLock, FiMail } from "react-icons/all";
import { Link, useLocation, useNavigate } from "react-router-dom";

import HttpResponse from "components/HttpResponse/HttpResponse";
import InputGroup from "components/InputGroup/InputGroup";
import Button from "components/Button/Button";
import useStore from "hooks/useStore";
import Modal from "components/Modal/Modal";
import SocialLogin from "components/SocialLogin/SocialLogin";
import toast from "react-hot-toast";
import catchErrorMessage from "utils/catchErrorMessage";
import useScrollTop from "hooks/useScrollTop";
import SEO from "components/SEO/SEO";

const Login = () => {
    const [
        {
            state: { auth },
            actions: { loginAction },
        },
        dispatch,
    ] = useStore();

    useScrollTop(0);

    const location = useLocation();
    const navigate = useNavigate();

    const loginSession = useRef(null);

    const [httpResponse, setHttpResponse] = useState({
        isSuccess: false,
        message: "",
        loading: false,
    });

    const data = {
        email: {
            label: "Email",
            name: "email",
            placeholder: "Enter email",
            onChange: handleChange,
            validate: {
                required: "Email Required",
            },
            labelIcon: <FiMail className="text-dark-400 text-lg" />,
        },

        password: {
            label: "Password",
            name: "password",
            placeholder: "Enter password",
            onChange: handleChange,
            validate: {
                required: "Password required",
                minLength: { value: 5, message: "Password should be min 5 character" },
            },
            labelIcon: <FiLock className="text-dark-400 text-lg" />,
        },
    };

    const [userInput, setUserInput] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({});

    function handleChange(e, error) {
        const { name, value } = e.target;
        setErrors((prev) => ({ ...prev, [name]: error }));
        setUserInput((prev) => ({ ...prev, [name]: value }));
    }

    async function handleLogin(e) {
        e.preventDefault();
        setHttpResponse((p) => ({ ...p, loading: false, message: "" }));

        let isCompleted = true;
        // check validation before submit form
        let errorMessage = "";
        let tempErrors = { ...errors };
        for (let key in data) {
            if (data[key]?.validate) {
                let validate = validator(data[key]?.validate, userInput[key]);
                if (validate) {
                    isCompleted = false;
                    errorMessage = validate;
                }
                tempErrors[key] = validate;
            }
        }

        if (!isCompleted) {
            setErrors(tempErrors);
            toast.error(errorMessage);
            setHttpResponse((p) => ({ ...p, loading: false, message: "" }));
            return;
        }

        setHttpResponse((p) => ({ ...p, loading: true }));
        try {
            let result = await loginAction(userInput);
            loginSession.current = true;
            setHttpResponse((p) => ({ ...p, loading: false }));
        } catch (ex) {
            toast.error(catchErrorMessage(ex));
            setHttpResponse((p) => ({ ...p, loading: false }));
        }
    }

    // after auth change then should be redirect if redirect fail
    useEffect(() => {
        if (auth) {
            console.log(loginSession.current)
            if (auth._id && loginSession.current) {
                let redirectPath = location.state || "/";

                if (redirectPath === "/") {
                    navigate(redirectPath);
                    loginSession.current = null;
                } else {

                    redirectPath = "/";
                    navigate(redirectPath);

                }

                console.log(redirectPath);
            }

            // setTimeout(()=>{
            //     let redirectPath = location.state || "/";
            // navigate(redirectPath, {replace: true});
            // redirectPath = "/"
            // console.log(redirectPath, "---")
            // }, 2000)
            // location.state = "/";
        }
        // return ()=> location.state = "/"
    }, [auth, loginSession.current]);

    console.log(location.state);

    function handlePasswordReset(e) {
        e.preventDefault();
    }

    // password reset mail send form
    function renderPasswordResetModal() {
        return (
            <Modal title="Reset Password" className="max-w-sm" id="password-reset-modal">
                <form onSubmit={handlePasswordReset} className="mt-4 text-dark-300">
                    <HttpResponse state={httpResponse} />

                    <InputGroup
                        type="text"
                        name="email"
                        placeholder="Your Email"
                        defaultValue={userInput.email}
                        className="w-full"
                    />
                    <Button className="mt-4">Reset Request</Button>
                </form>
            </Modal>
        );
    }

    return (
        <div className="container">
            {renderPasswordResetModal()}

            <SEO title="Login" />

            <Link to={"/login"} state={"/dashboard/all-buyers"}>
                Dahsb sdaaaaaaaaaaaaaaaaaaa
            </Link>

            <div className="mt-12">
                <div className="max-w-md mx-auto shadow-xxs rounded p-4 bg-white m-3 mt-4 rounded-xl">
                    <form onSubmit={handleLogin}>
                        <h1 className="text-center text-3xl text-dark-900 font-semibold">Login</h1>

                        <HttpResponse state={httpResponse} />
                        {Object.keys(data).map((key, i) => (
                            <InputGroup error={errors[key]} {...data[key]} className="mt-3" />
                        ))}

                        <div className="form-control mt-4">
                            <label className="flex gap-x-1 items-center cursor-pointer">
                                <input type="checkbox" className="checkbox checkbox-sm checkbox-primary" />
                                <span className="label-text">Remember me</span>
                            </label>
                        </div>

                        <div className="text-dark-100 text-sm font-normal mt-5">
                            <h6>
                                Forgot Password ?
                                <label htmlFor="password-reset-modal" className="link ml-2 text-blue-500 ">
                                    Click to reset
                                </label>
                            </h6>
                        </div>

                        <Button className="mt-4 w-full">Login</Button>
                        <div className="divider text-dark-100 text-sm py-2">OR</div>
                        <SocialLogin />
                        <p className="text-center  mb-4 mt-6 text-dark-300">
                            Not a member
                            <Link to="/registration" className="font-medium !text-primary-500 text-link ml-2 ">
                                Sign up now
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
