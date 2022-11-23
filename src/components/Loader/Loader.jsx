import React from 'react';
import {BeatLoader} from "react-spinners"

const Loader = ({className="", title="", loaderOptions={}}) => {
	if(!loaderOptions?.color){
		loaderOptions.color = "#38B1EDFF"
	}
	return (
		<div className={className}>
			<div className="flex flex-col justify-center items-center">
				<BeatLoader {...loaderOptions}  />
				{title && <h2 className="mt-2 font-medium text-dark-600">{title}...</h2> }
			</div>
  </div>
	);
};

export default Loader;