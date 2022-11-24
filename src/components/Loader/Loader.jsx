import React from 'react';
import {BeatLoader} from "react-spinners"

const Loader = ({className="", size, title="", loaderOptions={}}) => {
	if(!loaderOptions?.color){
		loaderOptions.color = "#38B1EDFF"
	}
	return (
		<div className={className}>
			<div className="flex flex-col justify-center items-center">
				<BeatLoader {...loaderOptions} size={size}  />
				{title && <h2 className="mt-2 font-medium text-sm text-dark-400">{title}...</h2> }
			</div>
  </div>
	);
};

export default Loader;