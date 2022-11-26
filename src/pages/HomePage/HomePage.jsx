import React, {lazy, useEffect} from 'react';
import "./homePage.css"
import SliderSection from "./SliderSection";


const  CategorySection = lazy(()=>import("./CategorySection"));
const  WhyChooseUsSection = lazy(()=>import("./WhyChooseUsSection"));
const  Testimonials = lazy(()=>import("./Testimonials"));
const  AdvertiseProducts = lazy(()=>import("pages/HomePage/AdvertiseProducts"));

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