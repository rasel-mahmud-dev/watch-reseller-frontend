import React from "react";
import Loader from "../Loader/Loader";


const HttpResponse = (props) => {
	const {
		state: {message, isSuccess, loading},
		className = "",
		loaderTitle = ""
	} = props;
	return (
		<div className={`${className} my-2 `}>
			{loading && (
				<div className="!py-3">
					<Loader title={loaderTitle} className="flex justify-center"/>
				</div>
			)}
			
			{message && message !== "" && (
				<div className="!py-0 px-0">
					<div
						className={`alert rounded-md py-3 px-4 ${
							!isSuccess ? "bg-red-500/10 text-red-400 " : "bg-green-500/20 text-green-700"
						} font-medium `}
					>
						<div className="flex gap-x-2 items-center">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="stroke-current flex-shrink-0 h-6 w-6"
								fill="none"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
							</svg>
							<span>{message}</span>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default HttpResponse;
