import React from 'react';
import "./homePage.css"
import {Link} from "react-router-dom";


const CategorySection = () => {

    const categories = [
        {_id: 1, name: "Digital", image: "/1-latest-kids-led-square-digital-chronorex-boys-girls-original-imagjs9wdkaxbyta.webp"},
        {_id: 1, name: "Analog", image: "/m126334-0032.webp"},
        {_id: 1, name: "Smartwatch", image: "/-original-imagg8dddyyzjnxn.webp"},
        {_id: 1, name: "Kids Watch", image: "/led-digital-sport-wristband-fashion-cartoon-silicone-kids-watch-original-imag5sqgsy5fdv8g.webp"},
        {_id: 1, name: "Ledis Watch", image: "/rose-gold-colour-2021-heart-pattern-12-point-diamond-bashful-original-imag2mkqxq6rtggk.webp"},
        {_id: 1, name: "Rolex", image: "/m136660-0003.webp"},
        {_id: 1, name: "Sports Watch", image: "/brand-a-digital-watch-shockproof.webp"},
        {_id: 1, name: "Junghans", image: "/best-mens-watches-2-1628601931.webp"},
        {_id: 1, name: "Gold", image: "/51OreFcV9bLgold.webp"},
        {_id: 1, name: "Army Watch", image: "/army-watches-vigil-original-imafvvy4c7dhgkrg.webp"},
        {_id: 1, name: "Wall Clock", image: "/handpainted-peacock-wall-clock-wc00083-analog-dravin-craft-original-imafu8jqdj683rt4.webp"},
        {_id: 1, name: "Table Watch", image: "/green-table-clock-v2a-digitalclock-green-v2a-original-imaf86z6mynrkswz.webp"},
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