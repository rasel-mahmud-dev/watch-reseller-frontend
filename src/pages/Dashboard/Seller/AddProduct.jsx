import React, { useEffect, useRef, useState } from "react";
import validator from "utils/validator";
import {
    AiOutlinePhone,
    BiCategoryAlt,
    BsCalendarDate,
    CiLocationOn,
    FcAddImage,
    GrStatusGood,
    IoLocationOutline,
    IoPricetagOutline,
    IoPricetagsOutline,
    MdTitle,
    TbFileDescription,
} from "react-icons/all";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import HttpResponse from "components/HttpResponse/HttpResponse";
import InputGroup from "components/InputGroup/InputGroup";
import Button from "components/Button/Button";
import useStore from "hooks/useStore";
import ImageChooser from "components/ImageChooser/ImageChooser";
import toast from "react-hot-toast";
import imageUpload from "utils/imageUpload";
import catchErrorMessage from "utils/catchErrorMessage";
import { fetchCategoriesAction} from "context/actions/categoryAction";
import { addProductAction, fetchProductDetail } from "context/actions/productAction";
import SidebarButton from "components/SidebarButton/SidebarButton";
import SEO from "components/SEO/SEO";

const AddProduct = () => {
    const [
        {
            state: { categories },
            actions: { registrationAction },
        },
        dispatch,
    ] = useStore();

    const { productId } = useParams();

    const updateProductData = useRef(null);

    const location = useLocation();

    const navigate = useNavigate();

    const [httpResponse, setHttpResponse] = useState({
        isSuccess: false,
        message: "",
        loading: false,
    });

    let conditionType = ["excellent", "good", "fair"].map((item) => ({ name: item, _id: item }));

    const basicInfo = {
        title: {
            label: "Title",
            name: "title",
            placeholder: "Product title",
            onChange: handleChange,
            validate: {
                required: "Title Required",
            },
            labelIcon: <MdTitle className="text-dark-400 text-lg" />,
        },

        categoryId: {
            label: "Category",
            name: "categoryId",
            placeholder: "Choose Category",
            type: "select",
            onChange: handleChange,
            options: categories,
            validate: {
                required: "Category required",
            },
            labelIcon: <BiCategoryAlt className="text-dark-400 text-lg" />,
        },

        purchaseDate: {
            label: "Purchase Date",
            name: "purchaseDate",
            placeholder: "Original Buy Date",
            type: "date",
            onChange: handleChange,
            validate: {
                required: "Original buy date required",
            },
            labelIcon: <BsCalendarDate className="text-dark-400 text-lg" />,
        },
        originalPrice: {
            label: "Market Price",
            name: "originalPrice",
            placeholder: "Original Price",
            type: "number",
            onChange: handleChange,
            validate: {
                required: "Original Price required",
            },
            labelIcon: <IoPricetagsOutline className="text-dark-400 text-lg" />,
        },

        resalePrice: {
            label: "Resale Price",
            name: "resalePrice",
            placeholder: "Resale Price",
            type: "number",
            onChange: handleChange,
            validate: {
                required: "Resale Price required",
            },
            labelIcon: <IoPricetagOutline className="text-dark-400 text-lg" />,
        },

        picture: {
            label: "Product Picture",
            name: "picture",
            placeholder: "Choose Picture",
            imagePreviewClass: "w-40",
            type: "avatar",
            onChange: handleChange,
            validate: {
                required: "picture Required",
                maxFileSize: { value: 200, message: "Picture image size should be max 200kb" },
            },
            labelIcon: <FcAddImage className="text-dark-400 text-lg" />,
        },

        conditionType: {
            label: "Condition",
            name: "conditionType",
            placeholder: "Choose Condition",
            type: "select",
            onChange: handleChange,
            options: conditionType,
            validate: {
                required: "Condition required",
            },
            labelIcon: <GrStatusGood className="text-dark-400 text-lg" />,
        },

        phone: {
            label: "Phone",
            name: "phone",
            placeholder: "Phone number",
            type: "number",
            onChange: handleChange,
            validate: {
                required: "Phone number required",
            },
            labelIcon: <AiOutlinePhone className="text-dark-400 text-lg" />,
        },

        location: {
            label: "Location",
            name: "location",
            placeholder: "Location",
            onChange: handleChange,
            validate: {
                required: "Location required",
            },
            labelIcon: <IoLocationOutline className="text-dark-400 text-lg" />,
        },

        description: {
            label: "Description",
            name: "description",
            placeholder: "Description",
            type: "textarea",
            onChange: handleChange,
            validate: {
                required: "description required",
                minLength: { value: 6, message: "Description should be min 6 character" },
            },
            labelIcon: <TbFileDescription className="!text-dark-100 text-lg " />,
            inputClass: "!h-20",
        },
    };

    // user input state
    const [userInput, setUserInput] = useState({
        title: "",
        categoryId: "",
        resalePrice: 0,
        originalPrice: 0,
        picture: "",
        phone: "",
        location: "",
        conditionType: "",
        mobileNumber: "",
        description: "",
        purchaseDate: "",
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (productId) {
            fetchProductDetail(productId).then((product) => {
            if (product) {
                updateProductData.current = product;
                setUserInput({
                    title: product.title,
                    categoryId: product.categoryId,
                    resalePrice: product.resalePrice,
                    originalPrice: product.originalPrice,
                    picture: product.picture,
                    phone: product.phone,
                    location: product.location,
                    conditionType: product.conditionType,
                    mobileNumber: product.mobileNumber,
                    description: product.description,
                    purchaseDate: product.purchaseDate,
                });
            }
        });
        }
        if (!categories) {
            fetchCategoriesAction(dispatch)
        }
    }, [productId]);

    function handleChange(e, error) {
        const { name, value } = e.target;
        setUserInput((prevState) => ({
            ...prevState,
            [name]: value,
        }));
        setErrors((prev) => ({ ...prev, [name]: error }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setHttpResponse((p) => ({ ...p, loading: false, message: "" }));

        let isCompleted = true;
        // check validation before submit form
        let errorMessage = "";
        let tempErrors = { ...errors };

        // check form validation for field
        for (let key in basicInfo) {
            if (basicInfo[key]?.validate) {
                let validate = validator(basicInfo[key]?.validate, userInput[key]);
                if (validate) {
                    isCompleted = false;
                    if (!errorMessage) {
                        errorMessage = validate;
                    }
                }
                tempErrors[key] = validate;
            }
        }

        // if form input has any validation error
        if (!isCompleted) {
            setErrors(tempErrors);
            toast.error(errorMessage);
            return;
        }

        try {
            if (!userInput?.picture || typeof userInput?.picture !== "object") {
                if (!productId) {
                    toast.error("Please select a valid picture file");
                }
            }

            let uploadResult;
            if (typeof userInput?.picture === "object") {
                uploadResult = await imageUpload(userInput.picture);
                if (!uploadResult || !uploadResult.data) {
                    toast.error("Picture upload fail please try again");
                    return;
                }
            }

            setHttpResponse({ ...httpResponse, loading: true });

            let productData = {
                title: userInput.title,
                resalePrice: userInput.resalePrice,
                originalPrice: userInput.originalPrice,
                categoryId: userInput.categoryId,
                conditionType: userInput.conditionType,
                mobileNumber: userInput.mobileNumber,
                phone: userInput.phone,
                location: userInput.location,
                description: userInput.description,
                purchaseDate: userInput.purchaseDate,
            };

            if (uploadResult) {
                productData.picture = uploadResult.data.url;
            } else if(updateProductData.current.picture) {
                productData.picture = updateProductData.current.picture;
            }

            if (productId) {
                productData.productId = productId;
            }

            let result = await addProductAction(productData);

            if (!result) {
                return toast.error("Product Upload fail, Please try again");
            }
            toast.success("Product Successfully added");
            setTimeout(() => {
                navigate("/dashboard/my-products", { state: { isAddedProduct: true } });
                updateProductData.current = null;
            }, 500);
        } catch (ex) {
            toast.error(catchErrorMessage(ex));
        } finally {
            setHttpResponse((p) => ({ ...p, loading: false }));
        }
    }

    return (
        <div className="page">
            <SEO title={productId ? "Update Product" : "Add Product"} />

            <SidebarButton>
                <h1 className="section_title !my-0">{productId ? "Update Product" : "Add Product"} </h1>
            </SidebarButton>

            <div className="card my-6">
                <form onSubmit={handleSubmit}>
                    <HttpResponse state={httpResponse} title="Please wait your product is added soon" />

                    <div className="mt-6">
                        <h3 className="text-md font-semibold text-dark-400">Product Info</h3>

                        <div className="grid grid-cols-1 gap-4 mt-2">
                            {Object.keys(basicInfo).map((key, i) =>
                                basicInfo[key].type === "avatar" ? (
                                    <ImageChooser
                                        defaultValue={userInput[key]}
                                        error={errors[key]}
                                        {...basicInfo[key]}
                                    />
                                ) : (
                                    <InputGroup
                                        value={userInput[key]}
                                        error={errors[key]}
                                        {...basicInfo[key]}
                                        className={`${key !== "purchaseDate" ? "mt-3" : ""}`}
                                    />
                                )
                            )}
                        </div>
                    </div>

                    <Button className="mt-4">{productId ? "Update Product" : "Add Product"}</Button>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;
