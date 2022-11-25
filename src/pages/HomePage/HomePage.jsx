import React from 'react';
import "./homePage.css"
import SliderSection from "./SliderSection";
import CategorySection from "./CategorySection";
import WhyChooseUsSection from "./WhyChooseUsSection";
import Testimonials from "./Testimonials";


const HomePage = () => {
    return (
        <div>
            <SliderSection />
            <CategorySection />

            <WhyChooseUsSection />
            <Testimonials />
        </div>
    );
};

export default HomePage;