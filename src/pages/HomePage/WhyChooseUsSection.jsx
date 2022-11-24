import React from 'react';
import "./homePage.css"
import {Link} from "react-router-dom";


const WhyChooseUsSection = () => {


    const data = [
        { id: 1, label: "Fast Delivery", para: "Elit. Nullana integer sagittis, eleifend consectetur adipiscing", icon: "/fast-time.png" },
        { id: 2, label: "Safe", para: "We provide safe money payment system. customer easily buy products", icon: "/shield.png" },
        { id: 3, label: "Low Pricing", para: "We provide money back grantee if. our watch are bug", icon: "/lowest-price.png" },
        { id: 4, label: "Good Condition", para: "We promise money back granety", icon: "/check.png" },
    ]


    return (
        <section className="section bg-whit80">

            <div className="container">

                <h6 className="section_sub-title">Why Choose Us</h6>
                <h1 className="section_title">We provide trusted services</h1>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
                    {data.map(category => (
                        <Link to="/" key={category.id}>
                            <div className="card ">
                                <div className="w-12 mx-auto">
                                    <img src={category.icon} className="w-full" alt={category.label} />
                                </div>

                                <h4 className="font-medium text-dark-500 text-center mt-2">{category.label}</h4>
                                <p className="font-normal text-sm text-dark-200 text-center mt-1">{category.para}</p>


                            </div>
                        </Link>
                    ))}
                </div>
            </div>

        </section>
    );
};

export default WhyChooseUsSection;