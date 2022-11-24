import React from 'react';


// Import Swiper React components
import {Swiper, SwiperSlide} from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import {Autoplay, Navigation, Pagination} from "swiper";
import Button from "../../components/Button/Button";


const SliderSection = () => {

    const data = [
        {
            image: "/brandon-romanchuk-4RmyqApaLjw-unsplash2.jpg",
            title: "Modern Fresh condition brand watch",
            desc: "A sofa is a piece of furniture that a few people can comfortably sit on together.Sofas are typically upholstered, with a high back and arms. The word originated from Turkish, from an Arabic root, suffa, bench of stone or wood.",
        },
        {
            image: "/paul-cuoco-CO2vOhPqlrM-unsplash3.jpg",
            title: "sadfasdf sadf asdf asdf asd f",
            desc: "SDfsdfsdf sdfsdfdsfsdfsdfdsf SDfsdfsdfsdf SDfsdfs dfsdf  sdfdsfsdfsdfdsf sdfdsfsdfsdfdsf",
        },
        {
            image: "/regis-hari-bouchard-JCp35SbaEFs-unsplash.jpg",
            title: "sadfasdf sadf asdf asdf asd f",
            desc: "SDfsdfsdf sdfsdfdsfsdfsdfdsf SDfsdfsdfsdf SDfsdfs dfsdf  sdfdsfsdfsdfdsf sdfdsfsdfsdfdsf",
        }
    ]

    return (
        <div className="slider_root">

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
                    {data.map((item => (
                        <SwiperSlide>
                            <div className="banner-image">
                                <img className="w-full slider-image" src={item.image} alt=""/>
                                <div className="banner-caption ">
                                    <h1 className="slider-title leading-tight  max-w-xl font-medium text-5xl text-white">{item.title}</h1>
                                    <p className="slider-para max-w-md mt-5 text-light-200">{item.desc}</p>
                                    <div className="mt-10 flex gap-4">
                                        <Button theme="primary" className="slider-button">Shop Now</Button>
                                        <Button theme="primary-outline" className="slider-button ">Discover
                                            More</Button>
                                    </div>

                                </div>
                            </div>
                        </SwiperSlide>
                    )))}

                </Swiper>
            </div>

        </div>
    );
};

export default SliderSection;