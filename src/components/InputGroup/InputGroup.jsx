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
        inputClass="",
        validate,
        type = "text",
        className,
        value,
        disabled = false,
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
        onChange && onChange(e, result);
    }

    return useMemo(() => {
        return (
            <div className={`custom-input-group ${disabled ? "custom-input-group-disabled": ""}  `}>
                {label && (
                    <label htmlFor={name} className="flex items-center  gap-x-1">
                        {labelIcon}
                        {label}
                    </label>
                )}
                <div className={`custom-input mt-1.5 ${error ? "error" : ""}`}>
                    {type === "select" ? (
                        <select
                            onChange={handleChange}
                            name={name}
                            id={name}
                            value={value}
                            className={`${inputClass} `}
                            placeholder={placeholder}
                        >
                            <option value="">{placeholder}</option>
                            {options?.map((opt) => (
                                <option value={opt._id} key={opt._id}>{opt.name}</option>
                            ))}
                        </select>
                    ) : type === "textarea" ? (
                        <textarea
                            onChange={handleChange}
                            name={name}
                            id={name}
                            value={value}
                            className={`${inputClass} `}
                            placeholder={placeholder}
                        />
                    ) : (
                        <input
                            onChange={handleChange}
                            type={type}
                            name={name}
                            value={value}
                            id={name}
                            disabled={disabled}
                            className={`${inputClass} `}
                            placeholder={placeholder}
                        />
                    )}
                </div>
                <span className="text-red-500 font-medium text-xs">{error ? error : ""}</span>
            </div>
        );
    }, [error, defaultValue, options, value]);
};

export default InputGroup;
