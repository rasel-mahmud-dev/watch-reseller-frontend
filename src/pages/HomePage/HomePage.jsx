import React from 'react';
import "./homePage.css"
import SliderSection from "./SliderSection";
import CategorySection from "./CategorySection";
import WhyChooseUsSection from "./WhyChooseUsSection";

const HomePage = () => {
    return (
        <div>
            <SliderSection />
            <CategorySection />
            <WhyChooseUsSection />
        </div>
    );
};

export default HomePage;