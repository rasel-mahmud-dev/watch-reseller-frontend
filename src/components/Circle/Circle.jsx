import React from 'react';

const Circle = ({className, ...other}) => {
    return (
        <div {...other} className={`rounded-full w-7 bg-primary-100 h-7 flex justify-center items-center cursor-pointer ${className}`} />
    );
};

export default Circle;