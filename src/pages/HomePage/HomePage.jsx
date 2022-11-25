import React from 'react';
import "./homePage.css"
import SliderSection from "./SliderSection";
import CategorySection from "./CategorySection";
import WhyChooseUsSection from "./WhyChooseUsSection";
import Testimonials from "./Testimonials";
import AdvertiseProducts from "pages/HomePage/AdvertiseProducts";

const HomePage = () => {
    return (
        <div>
            <SliderSection />
            <CategorySection />
            <AdvertiseProducts />
            <WhyChooseUsSection />
            <Testimonials />
        </div>
    );
};

export default HomePage;