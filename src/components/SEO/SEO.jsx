import React from "react";
import {Helmet} from "react-helmet";


const SEO = (props) => {
    return (
        <Helmet>
            <meta charSet="utf-8"/>
            <title>{props.title} of Watch.Reseller</title>
            <meta name="description" content={props.description} />
            {props.children}
        </Helmet>
    
    );
};

export default SEO;