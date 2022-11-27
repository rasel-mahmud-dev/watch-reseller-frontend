import React from "react";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, Navigation, Pagination } from "swiper";
import Button from "../../components/Button/Button";

const SliderSection = () => {
    const data = [
        {
            image: "/brandon-romanchuk-4RmyqApaLjw-unsplash2.jpg",
            title: "Modern Fresh condition Smart Watch",
            desc: "Today's smartwatches offer more advanced features, such as detailed 24/7 health and wellness tracking, voice assistants, call and text message support, and a variety of apps and services that extend the power of your smartphone to your wrist.",
        },
        {
            image: "/paul-cuoco-CO2vOhPqlrM-unsplash3.jpg",
            title: "The Rolex Air King took on new look",
            desc: "If you’ve always wanted to own a platinum Rolex but don’t have the budget for a solid platinum watch, the Rolesium Yacht-Master is your next best bet. It pairs Rolex’s proprietary...",
        },
        {
            image: "/regis-hari-bouchard-JCp35SbaEFs-unsplash.jpg",
            title: "The best luxury watch brands of 2022",
            desc: "Luxury watches are destined to never go out of fashion. No phone can beat the exceptional elegance and rich history of a beautifully crafted timepiece. f",
        },
    ];

    return (
        <section className="slider_root">
            <div>
                <Swiper
                    slidesPerView={1}
                    centeredSlides={true}
                    autoplay={{
                        delay: 2000,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[Autoplay, Pagination, Navigation]}
                    navigation={true}
                >
                    {data.map((item, index) => (
                        <SwiperSlide key={index}>
                            <div className="banner-image">
                                <img className="w-full slider-image" src={item.image} alt="" />
                                <div className="banner-caption ">
                                    <h1 className="slider-title leading-tight  max-w-xl font-medium text-5xl text-white">
                                        {item.title}
                                    </h1>
                                    <p className="slider-para max-w-md mt-5 text-light-200">{item.desc}</p>
                                    <div className="mt-10 flex gap-4">
                                        <a href="/#advertise-product">
                                            <Button theme="primary" className="slider-button">
                                                Shop Now
                                            </Button>
                                        </a>
                                        <a href="/#category-section">
                                            <Button theme="primary-outline" className="slider-button ">
                                                Discover More
                                            </Button>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};

export default SliderSection;