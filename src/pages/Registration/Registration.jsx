import {useState} from "react";
import validator from "../../utils/validator";
import {BsGoogle, FiLock, FiMail} from "react-icons/all";
import {HiOutlineUser} from "react-icons/hi";
import {Link} from "react-router-dom";

import HttpResponse from "../../components/HttpResponse/HttpResponse";
import InputGroup from "../../components/InputGroup/InputGroup";
import Button from "../../components/Button/Button";
import useStore from "../../hooks/useStore";
import Modal from "../../components/Modal/Modal";
import SocialLogin from "../../components/SocialLogin/SocialLogin";


const Registration = () => {
    const [state, dispatch] = useStore();

    const [httpResponse, setHttpResponse] = useState({
        isSuccess: false,
        message: "",
        loading: false,
    });

    const data = {
        firstName: {
            name: "firstName",
            placeholder: "First Name",
            onChange: handleChange,
            validate: {
                required: "firstName Required",
            },
            labelIcon: <HiOutlineUser className="text-dark-400 text-lg"/>,
        },

        lastName: {
            name: "lastName",
            placeholder: "Last Name",
            onChange: handleChange,
            labelIcon: <HiOutlineUser className="text-dark-400 text-lg"/>,
        },

        email: {
            name: "email",
            placeholder: "Enter email",
            type: "email",
            onChange: handleChange,
            validate: {
                required: "Email Required",
            },
            labelIcon: <FiMail className="text-dark-400 text-lg"/>,
        },

        password: {
            type: "password",
            name: "password",
            placeholder: "Enter password",
            onChange: handleChange,
            validate: {
                required: "Password required",
                minLength: {value: 5, message: "Password should be min 5 character"},
            },
            labelIcon: <FiLock className="text-dark-400 text-lg"/>,
        },
        confirmPassword: {
            type: "password",
            name: "confirmPassword",
            placeholder: "Confirm Password",
            onChange: handleChange,
            validate: {
                required: "Confirm Password Password required",
                minLength: {value: 5, message: "Confirm Password should be min 5 character"},
            },
            labelIcon: <FiLock className="text-dark-400 text-lg"/>,
        },
    };

    const [userInput, setUserInput] = useState({email: "", password: ""});
    const [errors, setErrors] = useState({});

    function handleChange(e, error) {
        const {name, value} = e.target;
        setErrors((prev) => ({...prev, [name]: error}));
        setUserInput((prev) => ({...prev, [name]: value}));
    }

    function handleLogin(e) {
        e.preventDefault();
        setHttpResponse((p) => ({...p, loading: false, message: ""}));

        let isCompleted = true;
        // check validation before submit form
        let tempErrors = {...errors};
        for (let key in data) {
            if (data[key]?.validate) {
                let validate = validator(data[key]?.validate, userInput[key]);
                if (validate) {
                    isCompleted = false;
                }
                tempErrors[key] = validate;
            }
        }

        if (!isCompleted) {
            setErrors(tempErrors);
            setHttpResponse((p) => ({...p, loading: false, message: ""}));
            return;
        }
        setHttpResponse((p) => ({...p, loading: true}));


    }


    return (
        <div className="container">
            <div className="mt-12">
                <div className="max-w-md mx-auto shadow-xxs rounded p-4 bg-white m-3 mt-4 rounded-xl">
                    <form onSubmit={handleLogin}>
                        <h1 className="text-center text-3xl text-dark-900 font-semibold">
                            Login
                        </h1>

                        <HttpResponse state={httpResponse}/>
                        {Object.keys(data).map((key, i) => (
                            <InputGroup error={errors[key]} {...data[key]} className="mt-3"/>
                        ))}


                        <div className="text-dark-100 text-sm font-normal mt-5">
                            <div className="form-control">
                                <label className="flex gap-x-1 items-center cursor-pointer">
                                    <input type="radio" name="role" checked={true} className="radio radio-primary radio-sm " />
                                    <span className="label-text">Create account as customer</span>
                                </label>
                            </div>
                            <div className="form-control mt-2">
                                <label className="flex gap-x-1 items-center cursor-pointer">
                                    <input type="radio" name="role" className="radio radio-primary radio-sm " />
                                    <span className="label-text">Create account as seller </span>
                                </label>
                            </div>
                        </div>


                        <Button className="mt-4 w-full">Register</Button>


                        <div className="divider text-dark-100 text-sm py-5">OR</div>

                        <SocialLogin/>

                        <p className="text-center  mb-4 mt-6 text-dark-300">
                            Have an account?
                            <Link to="/login" className="font-medium !text-primary-500 text-link ml-2 ">
                                Login
                            </Link>
                        </p>

                    </form>
                </div>
            </div>
        </div>
    );
};


export default Registration;
