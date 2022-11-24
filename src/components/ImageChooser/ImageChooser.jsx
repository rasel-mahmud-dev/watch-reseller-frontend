import React, {useEffect, useRef, useState} from "react";
import validator from "../../utils/validator.js";


const ImageChoose = ({
         name,
         validate,
         labelIcon,
         defaultValue,
         error,
         label,
         imagePreviewClass,
         onChange,
         placeholder
     }) => {
    const [state, setState] = useState({
        value: "",
        base64: "",
    });

    const input = useRef(null);

    useEffect(() => {
        setState({
            base64: "",
            value: defaultValue,
        });
    }, []);

    function handleChange(e) {
        let file = e.target.files[0];
        let error = "";
        if (validate) {
            error = validator(validate, file);
        }

        let reader = new FileReader();
        reader.onload = (evt) => {
            setState((p) => ({
                ...p,
                base64: evt.target.result,
            }));
        };
        reader.readAsDataURL(file);

        setState((p) => ({
            ...p,
            value: file,
        }));
        onChange({target: {name, value: file}}, error);
    }

    function chooseImage() {
        input.current.click();
    }

    return (
        <div className="flex flex-col mt-2">
            {label && (
                <label className="cursor-pointer font-medium text-dark-500 " htmlFor={name}>
                    {label}
                </label>
            )}

            <div onClick={chooseImage} className="input-group">
                <div className="flex w-full items-center gap-x-2 mb-2">
                    {labelIcon}

                    <span className="bg-transparent text-dark-200 px-0">{placeholder}</span>
                </div>

                <input
                    ref={input}
                    id={name}
                    name={name}
                    onChange={handleChange}
                    hidden={true}
                    className="input"
                    placeholder={placeholder}
                    type="file"
                    accept="image/png,image/jpeg,image/jpg,image/svg"
                />
            </div>

            {error && <div className="text-red-400 text-sm mt-1">{error}</div>}

            <div className={imagePreviewClass}>
                {state.base64 ? (
                    <img src={state.base64} className="w-full mt-2" alt=""/>
                ) : (
                    defaultValue && <img src={defaultValue} className="w-full mt-2" alt=""/>
                )}
            </div>
        </div>
    );
};

export default ImageChoose;
