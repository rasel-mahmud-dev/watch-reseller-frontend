import React from "react";
import { BsStarFill } from "react-icons/all";

const Rating = ({ rate, label=true, className="" }) => {
	return (
		<div className={`flex items-center gap-x-px ${className}`}>
			{Array(5)
				.fill(1)
				.map((_, index) => (
					<BsStarFill
						key={index}
						className={`text-dark-50/50 cursor-pointer text-sm ${
							rate >= index + 1 ? "!text-orange-400" : ""
						}`}
					/>
				))}
			{label && <span className="font-semibold text-sm ml-1 text-dark-200">{rate.toFixed(1)}</span>}
		</div>
	);
};

export default Rating;