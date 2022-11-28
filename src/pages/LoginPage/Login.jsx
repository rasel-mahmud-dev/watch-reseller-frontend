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
import Loader from "components/Loader/Loader";
import firebaseErrorCatch from "utils/firebaseErrorCatch";

const Login = () => {
    const [
        {
            state: { auth },
            actions: { loginAction, passwordResetEmail },
        },
        dispatch,
    ] = useStore();

    useScrollTop(0);

    const location = useLocation();
    const navigate = useNavigate();

    const loginSession = useRef(null);

    const [requestLoading, setRequestLoading] = useState(false);
    const [openPasswordResetModal, setOpenPasswordResetModal] = useState(false);

    const data = {
        email: {
            label: "Email",
            name: "email",
            type: "email",
            placeholder: "Enter email",
            onChange: handleChange,
            validate: {
                required: "Email Required",
            },
            labelIcon: <FiMail className="text-dark-400 text-lg" />,
        },

        password: {
            label: "Password",
            type: "password",
            name: "password",
            placeholder: "Enter password",
            onChange: handleChange,
            validate: {
                required: "Password required",
                minLength: { value: 6, message: "Password should be min 6 character" },
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
        setRequestLoading(false);

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
            return;
        }

        setRequestLoading(true);
        try {
            let result = await loginAction({
                email: userInput.email.trim(),
                password: userInput.password.trim(),
            });
            loginSession.current = true;
        } catch (ex) {
            toast.error(catchErrorMessage(ex));
            setRequestLoading(false);
        } finally {
            // setRequestLoading(false);
        }
    }

    // after auth change then should be redirected
    useEffect(() => {
        if (auth) {
            let redirectPath = location.state || "/";
            if (loginSession.current) {
                setRequestLoading(false);
                navigate(redirectPath);
                loginSession.current = false;
            } else {
                // console.log("redirect home")
                navigate("/");
            }
        }
    }, [auth, loginSession.current]);


    const [passResetState, setPassResetState] = useState({
        message: "",
        loading: false,
        isSuccess: false,
    });

    function handlePasswordReset(e) {
        e.preventDefault();
        setPassResetState({ message: "", loading: true, isSuccess: true });
        let email = e.target.email.value;
        if (!email) {
            setPassResetState({ message: "Please provide email", loading: false, isSuccess: false });
            return
        }
        passwordResetEmail(email)
            .then(() => {
                setPassResetState({
                    loading: false,
                    message: "Password Reset Mail has been send. Please check your inbox or spam folder",
                    isSuccess: true,
                });
            })
            .catch((ex) => {
                let message = firebaseErrorCatch(ex.code);
                setPassResetState({ loading: false, message: message, isSuccess: false });
            });
    }

    // password reset mail send form
    function renderPasswordResetModal() {
        return (
            <Modal
                title="Reset Password"
                className="!w-11/12 max-w-lg"
                isOpen={openPasswordResetModal}
                onClose={() => setOpenPasswordResetModal(false)}
            >
                <form onSubmit={handlePasswordReset} className="mt-4 text-dark-300">
                    <HttpResponse state={passResetState} />
                    <InputGroup type="email" name="email" placeholder="Your Email" className="w-full" />
                    <Button className="mt-4">Reset Request</Button>
                </form>
            </Modal>
        );
    }

    return (
        <div className="container">
            {renderPasswordResetModal()}

            <SEO title="Login" />

            <Modal className="max-w-sm !top-1/3" isOpen={requestLoading}>
                <Loader size={30} title="Login Processing, Please wait." />
            </Modal>

            <div className="mt-12">
                <div className="max-w-md mx-auto shadow-xxs rounded p-4 bg-white m-3 mt-4 rounded-xl">
                    <form onSubmit={handleLogin}>
                        <h1 className="text-center text-3xl text-dark-900 font-semibold">Login</h1>

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
                                <label
                                    onClick={() => setOpenPasswordResetModal(true)}
                                    className="link ml-2 text-blue-500 "
                                >
                                    Click to reset
                                </label>
                            </h6>
                        </div>

                        <Button className="mt-4 w-full">Login</Button>
                        <div className="divider text-dark-100 text-sm py-2">OR</div>

                        {/**** social login button */}
                        <SocialLogin onCreateLoginSession={() => (loginSession.current = true)} />

                        <p className="text-center  mb-4 mt-6 text-dark-300">
                            Not a member
                            <Link
                                to="/registration"
                                state={location.state}
                                className="font-medium !text-primary-500 text-link ml-2 "
                            >
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
