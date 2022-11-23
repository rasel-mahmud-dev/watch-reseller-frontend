import {useState} from "react";
import "./login.css";
import validator from "../../utils/validator";
import {FiLock, FiMail} from "react-icons/all";
import {Link} from "react-router-dom";

import HttpResponse from "../../components/HttpResponse/HttpResponse";
import InputGroup from "../../components/InputGroup/InputGroup";
import Button from "../../components/Button/Button";
import useStore from "../../hooks/useStore";
import Checkbox from "../../components/CheckboxGroup/CheckboxGroup";


const Login = () => {
    const [state, dispatch] = useStore();

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
            labelIcon: <FiMail className="text-dark-400 text-lg"/>,
        },

        password: {
            label: "Password",
            name: "password",
            placeholder: "Enter password",
            onChange: handleChange,
            validate: {
                required: "Password required",
                minLength: {value: 5, message: "Password should be min 5 character"},
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
            <div>
                <div className="max-w-lg mx-auto shadow-xxs rounded p-4 bg-white m-3 mt-4 rounded-xl">
                    <form onSubmit={handleLogin}>
                        <h1 className="text-center text-3xl text-dark-900 font-semibold">
                            Login
                        </h1>

                        <HttpResponse state={httpResponse}/>
                        {Object.keys(data).map((key, i) => (
                            <InputGroup error={errors[key]} {...data[key]} className="mt-4"/>
                        ))}


                            <Checkbox name="na" label="Remember this account"  className="mt-5"/>





                        <Button className="btn-primary mt-4 w-full">Login</Button>

                        <div className="flex justify-between mt-5 text-dark-100 text-sm font-normal">
                            <Link to="/forgot-password">
                                <h6>Forgot Password</h6>
                            </Link>
                            <Link to="/registration">
                                <h6>Create Account</h6>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};


export default Login;
