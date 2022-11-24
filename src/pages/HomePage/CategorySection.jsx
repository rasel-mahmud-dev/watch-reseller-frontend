import React from 'react';
import "./homePage.css"
import {Link} from "react-router-dom";


const CategorySection = () => {

    const categories = [
        {_id: 1, name: "Digital", image: "/brand-a-digital-watch-shockproof.jpg"},
        {_id: 1, name: "Analog", image: "/brand-a-digital-watch-shockproof.jpg"},
        {_id: 1, name: "Smartwatch", image: "/brand-a-digital-watch-shockproof.jpg"},
        {_id: 1, name: "Arrow Analog Watch", image: "/brand-a-digital-watch-shockproof.jpg"},
        {_id: 1, name: "Ledis Watch", image: "/brand-a-digital-watch-shockproof.jpg"},
        {_id: 1, name: "Rolex", image: "/brand-a-digital-watch-shockproof.jpg"},
        {_id: 1, name: "Gold", image: "/brand-a-digital-watch-shockproof.jpg"},
    ]


    return (
        <section className="section">

            <div className="container">

                <h6 className="section_sub-title">Most popular categories</h6>
                <h1 className="section_title">Our Product Categories</h1>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
                    {categories.map(category => (
                        <Link to="/" key={category._id}>
                            <div className="card">
                                <div className="w-20 mx-auto">
                                    <img src={category.image} className="w-full" alt={category.name} />
                                </div>

                                <h4 className="font-medium text-dark-500 text-center mt-4">{category.name}</h4>


                            </div>
                        </Link>
                    ))}
                </div>
            </div>

        </section>
    );
};

export default CategorySection;