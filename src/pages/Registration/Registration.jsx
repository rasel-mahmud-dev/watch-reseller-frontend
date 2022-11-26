import {useState} from "react";
import validator from "utils/validator";
import {BiGlobe, BiLocationPlus, BiPhone, BsGoogle, FcAddImage, FiLock, FiMail} from "react-icons/all";
import {HiOutlineUser} from "react-icons/hi";
import {Link, useLocation, useNavigate} from "react-router-dom";

import HttpResponse from "components/HttpResponse/HttpResponse";
import InputGroup from "components/InputGroup/InputGroup";
import Button from "components/Button/Button";
import useStore from "hooks/useStore";
import SocialLogin from "components/SocialLogin/SocialLogin";
import ImageChooser from "components/ImageChooser/ImageChooser";
import toast from "react-hot-toast";
import imageUpload from "utils/imageUpload";
import catchErrorMessage from "utils/catchErrorMessage";


const Registration = () => {
    const [{state, actions: {registrationAction}}, dispatch] = useStore();

    const location = useLocation()

    const navigate = useNavigate()

    const [httpResponse, setHttpResponse] = useState({
        isSuccess: false,
        message: "",
        loading: false,
    });


    const sellerInfo = {
        phone: {
            label: "Phone",
            name: "phone",
            placeholder: "Your phone",
            onChange: handleChange,
            validate: {
                required: "phone Required",
            },
            labelIcon: <BiPhone className="text-dark-400 text-lg"/>,
        },
        address: {
            label: "Address",
            name: "address",
            type: "textarea",
            placeholder: "Your address",
            onChange: handleChange,
            validate: {
                required: "Address Required",
            },
            labelIcon: <BiGlobe className="text-dark-400 text-lg mt-1"/>,
        },
        location: {
            label: "Location",
            name: "location",
            type: "textarea",
            placeholder: "Your location",
            onChange: handleChange,
            validate: {
                required: "location Required",
            },
            labelIcon: <BiLocationPlus className="text-dark-400 text-lg"/>,
        },
    }
    const basicInfo = {
        firstName: {
            label: "FirstName",
            name: "firstName",
            placeholder: "First Name",
            onChange: handleChange,
            validate: {
                required: "firstName Required",
            },
            labelIcon: <HiOutlineUser className="text-dark-400 text-lg"/>,
        },

        lastName: {
            label: "LastName",
            name: "lastName",
            placeholder: "Last Name",
            onChange: handleChange,
            labelIcon: <HiOutlineUser className="text-dark-400 text-lg"/>,
        },

        email: {
            label: "Email",
            name: "email",
            placeholder: "Enter email",
            type: "email",
            onChange: handleChange,
            validate: {
                required: "Email required",

            },
            labelIcon: <FiMail className="text-dark-400 text-lg"/>,
        },
        avatar: {
            label: "Avatar",
            name: "avatar",
            placeholder: "Choose Avatar",
            imagePreviewClass: "w-32",
            type: "avatar",
            onChange: handleChange,
            validate: {
                required: "Avatar Required",
                maxFileSize: {value: 200, message: "Avatar image size should be max 200kb"},
            },
            labelIcon: <FcAddImage className="text-dark-400 text-lg"/>,
        },

        password: {
            label: "Password",
            type: "password",
            name: "password",
            placeholder: "Enter password",
            onChange: handleChange,
            validate: {
                required: "Password required",
                minLength: {value: 6, message: "Password should be min 6 character"},
            },
            labelIcon: <FiLock className="text-dark-400 text-lg"/>,
        },
        confirmPassword: {
            label: "Confirm Password",
            type: "password",
            name: "confirmPassword",
            placeholder: "Confirm Password",
            onChange: handleChange,
            validate: {
                required: "Confirm Password Password required",
                minLength: {value: 6, message: "Confirm Password should be min 6 character"},
            },
            labelIcon: <FiLock className="text-dark-400 text-lg"/>,
        },
    };


    // user input state
    const [userInput, setUserInput] = useState({
        firstName: "",
        lastName: "",
        avatar: null,
        role: "BUYER",
        phone: "",
        email: "",
        address: "",
        location: "",
    });
    const [errors, setErrors] = useState({});


    function handleChange(e, error) {
        const {name, value} = e.target
        setUserInput((prevState) => ({
            ...prevState,
            [name]: value
        }));
        setErrors((prev) => ({...prev, [name]: error}));
    }

    async function handleLogin(e) {
        e.preventDefault();
        setHttpResponse((p) => ({...p, loading: false, message: ""}));

        let isCompleted = true;
        // check validation before submit form
        let errorMessage = ""
        let tempErrors = {...errors};

        let dataInfo = basicInfo
        if (userInput.role === "SELLER") {
            dataInfo = {...dataInfo, ...sellerInfo}
        }



        // check form validation for field
        for (let key in dataInfo) {
            if (dataInfo[key]?.validate) {
                let validate = validator(dataInfo[key]?.validate, userInput[key]);
                if (validate) {
                    isCompleted = false;
                    if (!errorMessage) {
                        errorMessage = validate
                    }
                }
                tempErrors[key] = validate;
            }
        }
        if (userInput.password && userInput.confirmPassword && (userInput.password !== userInput.confirmPassword)) {
            errorMessage = "Please Check password or confirm password"
            tempErrors['confirmPassword'] = errorMessage
            isCompleted = false
        }

        // if form input has any validation error
        if (!isCompleted) {
            setErrors(tempErrors);
            toast.error(errorMessage)
            return;
        }


        try {

            if (!userInput?.avatar || typeof userInput?.avatar !== "object") {
                toast.error("Please select a valid photo file")
            }

            let uploadResult = await imageUpload(userInput.avatar)
            if (!uploadResult || !uploadResult.data) {
                toast.error("Avatar upload fail please try again")
                return;
            }

            let result = await registrationAction({
                firstName: userInput.firstName,
                lastName: userInput.lastName,
                username: userInput.username,
                avatarUrl: uploadResult.data.url,
                role: userInput.role,
                phone: userInput.phone,
                email: userInput.email,
                address: userInput.address,
                password: userInput.password,
                location: userInput.location
            })

            let redirectPath = location.state?.from || "/"
            navigate(redirectPath, {replace: true})
            setHttpResponse({...httpResponse, loading: false})

        } catch (ex) {
            toast.error(catchErrorMessage(ex))

        } finally {
            setHttpResponse((p) => ({...p, loading: false}));
        }
    }


    return (
        <div className="container">
            <div className="mt-4">
                <div className="max-w-xl mx-auto  rounded p-4 m-3 mt-4 rounded-xl">
                    <form onSubmit={handleLogin}>
                        <h1 className="text-center text-3xl text-dark-900 font-semibold">Registration Form</h1>

                        <HttpResponse state={httpResponse}/>

                        <div className="card !shadow-xxs mt-6">
                            <h3 className="text-md font-semibold text-dark-400">Basic Info</h3>

                            <div className="grid grid-cols-1 gap-4 mt-2">
                                {Object.keys(basicInfo).map((key, i) => (
                                    basicInfo[key].type === "avatar" ? (
                                        <ImageChooser error={errors[key]} {...basicInfo[key]} />
                                    ) : (
                                        <InputGroup error={errors[key]} {...basicInfo[key]} className="mt-3"/>)
                                ))}
                            </div>
                        </div>

                        {userInput.role === "SELLER" && (
                            <div className="card !shadow-xxs mt-6">
                                <h3 className="text-md font-semibold text-dark-400">Seller Info</h3>

                                <div className="grid grid-cols-1 gap-4 mt-2">
                                    {Object.keys(sellerInfo).map((key, i) => (
                                        <InputGroup error={errors[key]} {...sellerInfo[key]} className="mt-3"/>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="text-dark-100 text-sm font-normal mt-5">
                            <div className="form-control">
                                <label className="flex gap-x-1 items-center cursor-pointer">
                                    <input onChange={() => setUserInput(p => ({...p, role: "BUYER"}))} type="radio"
                                           name="role"
                                           checked={userInput.role === "BUYER"}
                                           className="radio radio-primary radio-sm "/>
                                    <span className="label-text">Create account as customer</span>
                                </label>
                            </div>
                            <div className="form-control mt-2">
                                <label className="flex gap-x-1 items-center cursor-pointer">
                                    <input onChange={() => setUserInput(p => ({...p, role: "SELLER"}))} type="radio"
                                           name="role"
                                           checked={userInput.role === "SELLER"}
                                           className="radio radio-primary radio-sm "/>
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
