import React, { useEffect, useState } from "react";
import { Autoplay, Pagination } from "swiper";

import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import Avatar from "components/Avatar/Avatar";
import Rating from "components/Rating/Rating";
import Loader from "components/Loader/Loader";
import axiosInstance from "app/axios";

const Testimonials = () => {
    const [testimonials, setTestimonials] = useState(null);

    useEffect(() => {
        axiosInstance()
            .get("/api/v1/testimonials")
            .then(({ data, status }) => {
                if (status === 200) {
                    setTestimonials(data);
                }
            })
            .catch((ex) => {
                setTestimonials([]);
            });
    }, []);

    return (
        <section className="section container">
            <h1 className="section_sub-title">What Our Client Says</h1>
            <h5 className="section_title">Our Testimonials</h5>

            {testimonials && (
                <div className="mt-4">
                    <Swiper
                        slidesPerView={1}
                        centeredSlides={false}
                        breakpoints={{
                            640: {
                                slidesPerView: 1,
                            },
                            768: {
                                slidesPerView: 2,
                            },
                            1068: {
                                slidesPerView: 3,
                            },
                        }}
                        autoplay={{
                            delay: 1500,
                            disableOnInteraction: false,
                        }}
                        pagination={{
                            clickable: true,
                        }}
                        modules={[Autoplay, Pagination]}
                    >
                        {testimonials?.length > 0 ? (
                            testimonials.map((item) => (
                                <SwiperSlide key={item._id} className="pb-8">
                                    <div className="card  !shadow-light overflow-hidden px-4 pb-6 pt-4 m-4">
                                        <div className="w-16 mx-auto">
                                            <Avatar
                                                username={item.customerName}
                                                className="w-20"
                                                src={item.customerAvatar}
                                            />
                                        </div>
                                        <h4 className="text-center text-sm font-semibold mt-2 mb-1 ">
                                            {item.customerName}
                                        </h4>
                                        <Rating className="justify-center" rate={item.rate} label={false} />
                                        <p className="whitespace-pre-line font-normal text-center text-dark-200 mt-3">
                                            {item.text}
                                        </p>
                                    </div>
                                </SwiperSlide>
                            ))
                        ) : (
                            <h1 className="text-center py-4">No Testimonial found</h1>
                        )}
                    </Swiper>
                </div>
            )}

            {!testimonials && (
                <div>
                    <Loader title="Testimonials are fetching" className="flex justify-center my-10" />
                </div>
            )}
        </section>
    );
};

export default Testimonials;
