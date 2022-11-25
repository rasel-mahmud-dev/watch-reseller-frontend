import "./input-group.css";
import validator from "../../utils/validator";
import { useMemo } from "react";

// label?: string;
// placeholder?: string;
// name?: string;
// defaultValue?: string | number;
// className?: string;
// inputClass?: string;
// onChange: Function;
// type?: "text" | "number" | "textarea"
// error?: any;
// validate: any;
// labelIcon?: ReactNode;
// options?: { name: string, value: string | number }[];

const InputGroup = (props) => {
    const {
        label,
        onChange,
        placeholder,
        name,
        inputClass,
        validate,
        type = "text",
        className,
        defaultValue,
        error,
        labelIcon,
        options = null,
    } = props;

    // const [errorMessage, setErrorMessage] = useState("");

    function handleChange(e) {
        const target = e.target;
        // console.log(validate, target.value)
        let result = validator(validate, target.value);
        onChange(e, result);
    }


    return useMemo(() => {
        return (
            <div>
                {type === "date" && (
                    <div className="flex items-center gap-x-1 my-2">
                        {labelIcon}
                        {placeholder}
                    </div>
                )}

                <div className={`input-group ${className}`}>
                    <div
                        className={`flex w-full ${type === "textarea" ? "items-start" : "items-center"} gap-x-2 ${
                            type !== "date" ? "pb-2" : ""
                        }`}
                    >
                        {type !== "date" && labelIcon}

                        {type === "select" ? (
                            <select
                                onChange={handleChange}
                                name={name}
                                id={name}
                                className={`input ${inputClass} `}
                                placeholder={placeholder}
                            >
                                <option value="">{placeholder}</option>
                                {options?.map((opt) => (
                                    <option value={opt._id}>{opt.name}</option>
                                ))}
                            </select>
                        ) : type === "textarea" ? (
                            <textarea
                                onChange={handleChange}
                                name={name}
                                id={name}
                                className={`input ${inputClass} `}
                                placeholder={placeholder}
                            />
                        ) : (
                            <input
                                onChange={handleChange}
                                type={type}
                                name={name}
                                id={name}
                                className={`input ${inputClass} `}
                                placeholder={placeholder}
                            />
                        )}
                    </div>
                </div>
                <span className="text-red-500 font-medium text-xs">{error ? error : ""}</span>
            </div>
        );
    }, [error, props?.defaultValue, options]);
};

export default InputGroup;
