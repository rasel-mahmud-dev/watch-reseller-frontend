import React, {lazy, useEffect} from 'react';
import "./homePage.css"
import SliderSection from "./SliderSection";
import SEO from "components/SEO/SEO";


const  CategorySection = lazy(()=>import("./CategorySection"));
const  WhyChooseUsSection = lazy(()=>import("./WhyChooseUsSection"));
const  Testimonials = lazy(()=>import("./Testimonials"));
const  AdvertiseProducts = lazy(()=>import("pages/HomePage/AdvertiseProducts"));

const HomePage = () => {
    return (
        <div>
            <SEO title="HomePage" />
            <SliderSection />
            <CategorySection />
            <AdvertiseProducts />
            <WhyChooseUsSection />
            <Testimonials />
        </div>
    );
};

export default HomePage;