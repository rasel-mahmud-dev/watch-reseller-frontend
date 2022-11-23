import validator from "../../utils/validator";
import {useMemo, useState} from "react";
import "./style.css"

const Checkbox = (props) => {
    const {
        label,
        onChange,
        validate,
        className,
        name,
        error,
        theme="custom",
        defaultValue,
    } = props;

    function handleChange(e) {
        const target = e.target;
        let result = validator(validate, target.value);
        onChange(e, result);
    }


    return useMemo(() => {
        return (
            <>
                <div className={`${className}`}>
                    <label className="text-dark-100 text-md font-normal flex items-center gap-x-2 cursor-pointer select-none">
                        <input defaultValue={defaultValue} name={name} type="checkbox" checked={defaultValue}
                               onChange={handleChange}
                               className={`checkbox checkbox-${theme}`}/>
                        <span>{label}</span>
                    </label>
                </div>
                <span className="text-red-500 font-medium text-xs">{error ? error : ""}</span>
            </>
        );
    }, [error, props?.defaultValue]);
};

export default Checkbox;