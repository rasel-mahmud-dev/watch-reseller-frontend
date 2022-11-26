import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./navigation.css";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { HiBars4 } from "react-icons/hi2";
import usePageScroll from "hooks/usePageScroll";
import Button from "../Button/Button";
import useStore from "hooks/useStore";
import Avatar from "../Avatar/Avatar";
import { MdSpaceDashboard } from "react-icons/all";

const Navigation = () => {
    const navigate = useNavigate();
    const [
        {
            state: { auth },
            actions: { signOutAction },
        },
    ] = useStore();

    const [expandNavigation, setExpandNavigation] = useState(false);
    const windowScroll = usePageScroll();
    const [isHomePage, setHomePage] = useState(true);
    const [openAuthMenu, setOpenAuthMenu] = useState(false);

    const header = useRef();

    function toggleNavigation() {
        setExpandNavigation(!expandNavigation);
    }

    function handleResize() {
        if (window.location.pathname === "/") {
            document.documentElement.style.setProperty("--header-height", 0 + "px");
        } else {
            let h = header.current?.offsetHeight || 0;
            document.documentElement.style.setProperty("--header-height", h + "px");
        }
    }

    // window resize event for set header height
    useEffect(() => {
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        setHomePage(window.location.pathname === "/");
        handleResize();
    }, [location.pathname]);

    function handleLogout(e) {
        signOutAction();
    }

    const items = [
        { path: "/", label: "Home" },
        { path: "/", label: "Courses" },
        {
            path: "/blogs",
            label: "Blogs",
        },
        { path: "/", label: "FAQs" },
    ];

    return (
        <div>
            <div
                ref={header}
                className={`navbar top-0 left-0 fixed shadow-md 
                ${windowScroll < 500 && isHomePage ? "shadow-none navbar-transparent" : "bg-white/40 backdrop-blur-md"}`}
            >
                <div className="container">
                    <div className="flex-1">
                        <Link to="/" className="">
                            {/*<h1 className="text-primary-900 font-bold text-">Reseller-Product</h1>*/}
                            <img src="/logo.png" className="logo" alt="" />
                        </Link>
                    </div>
                    <div className={`flex gap-6 items-center main-nav ${expandNavigation ? "expand" : ""}`}>
                        {items.map((item) => (
                            <NavLink
                                end={true}
                                onClick={() => setExpandNavigation(false)}
                                to={item.path}
                                className="font-medium text-base"
                            >
                                {item.label}
                            </NavLink>
                        ))}
                    </div>
                    <div className="flex-none">
                        {auth && (
                            <div
                                className="relative "
                                onMouseOver={() => setOpenAuthMenu(true)}
                                onMouseLeave={() => setOpenAuthMenu(false)}
                            >
                                <div className="w-14 h-10 flex justify-center items-center">
                                    <Avatar src={auth.avatar} d username={auth.username} className="ml-4" />
                                </div>

                                <ul
                                    tabIndex={0}
                                    className={`absolute opacity-0 z-50 invisible top-7 -right-3 mt-3 p-4 bg-white shadow-sm2 rounded-box w-52 
                            ${openAuthMenu ? "!opacity-100 !visible" : ""}`}
                                >
                                    <li className="pt-1 flex items-center">
                                        <Avatar className="w-8 mr-1" src={auth.avatar} username={auth.username} />
                                        {auth.firstName}
                                    </li>
                                    <div className="mt-2">
                                        <li className="pt-1 flex items-center gap-x-1 hover:text-primary-500">
                                            <MdSpaceDashboard className="text-xl text-dark-400" />
                                            <Link to={`/dashboard`}>Dashboard</Link>
                                        </li>
                                        <li
                                            className="pt-1 flex items-center gap-x-1 cursor-pointer hover:text-primary-500"
                                            onClick={handleLogout}
                                        >
                                            <FaSignOutAlt className="text-xl text-dark-400" />
                                            Logout
                                        </li>
                                    </div>
                                </ul>
                            </div>
                        )}
                    </div>
                    <div className="flex items-center">
                        {!auth && (
                            <Button theme="primary" className="ml-4">
                                <NavLink to="/login" className="flex items-center">
                                    <FaSignInAlt />
                                    <span className="ml-1">Login</span>
                                </NavLink>
                            </Button>
                        )}
                        <div className="pl-8">
                            <div className="flex items-center block sm:hidden fixed top-6 right-4 z-1000">
                                <div className="pl-3">
                                    <img onClick={toggleNavigation} className="bar-icon w-6" src="/Group-3.svg "/>
                                    {/*<HiBars4 className="bar-icon text-dark-700 text-2xl" onClick={toggleNavigation} />*/}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="header-height" />
        </div>
    );
};

export default Navigation;
