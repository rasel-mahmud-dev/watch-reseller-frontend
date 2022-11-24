import React from "react";
import { FaFacebookF, FaGithub, FaInstagram, FaYoutube } from "react-icons/fa";
import Button from "../../components/Button/Button";
import SocialLinks from "../../components/SocialLinks/SocialLinks";
import {Link} from "react-router-dom";


const Footer = () => {
    return (
        <>
            <footer className="bg-primary-900 text-light-600 font-normal py-10">
                <div className="container grid grid-cols-1 md:grid-cols-8  gap-0 md:gap-10">
                    <div className="col-auto md:col-span-3 lg:col-span-3">
                        <img className="w-64" src="/logo.png" />
                        <p className="pt-4">
                            Watch.reseller is watch selling market there buyer can purchase used watch.
                            And also they create their seller account if they want to sell their used watch,
                        </p>

                        <SocialLinks />

                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-between col-span-5 lg:col-span-5 w-full mt-4 md:mt-0">
                        <div className=" lg:mt-0">
                            <h3 className="font-semibold">Services</h3>
                            <ul className="mt-4  text-sm">
                                <li className="pt-1">Sell used watched</li>
                                <li className="pt-1">Data Engineer</li>
                                <li className="pt-1">Data Analyst</li>
                            </ul>
                        </div>
                        <div className="mt-10 md:mt-0">
                            <h3 className="font-semibold">General Links</h3>
                            <ul className="mt-4 text-sm">
                                <li className="pt-1">
                                <Link to="/" className="hover:text-primary-500">
                                    Shopping
                                </Link>
                            </li>
                                <li className="pt-1">
                                    <Link to="/login" className="hover:text-primary-500">
                                        Login
                                    </Link>
                                </li>
                                <li className="pt-1">
                                    <Link to="/registration" className="hover:text-primary-500">
                                        Registration
                                    </Link>
                                </li>
                                <li className="pt-1">
                                    <a className="hover:text-primary-500">
                                        Support
                                    </a>
                                </li>
                                <li className="pt-1">
                                    <a href="#" className="hover:text-primary-500">
                                        Tech Requirements
                                    </a>
                                </li>
                            </ul>
                        </div>


                        <div className="mt-10 lg:mt-0">
                            <h3 className="font-semibold">GET IN TOUCH!</h3>
                            <p className="mt-4 text-sm">
                                Every Single Updates and Notifications
                            </p>
                            <ul className="mt-4 text-sm">
                                <input
                                    type="text"
                                    placeholder="Your Email"
                                    className="input input-primary placeholder:text-light-600 text-sm  bg-transparent input-bordered w-full"
                                />
                                <Button className="bg-primary-400 mt-4 ">Subscribe Now</Button>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>

            <footer className="bg-primary-700 py-4">
                <div className="container flex flex-col md:flex-row text-center md:text-start gap-4 md:gap-4 justify-between text-white">
                    <h1>© {new Date().getFullYear()} Rasel Mahmud All Rights Reserved.</h1>
                    <img src="/payment-card-2022-09-26-12-59-29-8933 copy.webp" alt=""/>
                </div>
            </footer>
        </>
    );
};

export default Footer;
