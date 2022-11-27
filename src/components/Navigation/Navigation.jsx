import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import "./navigation.css";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import usePageScroll from "hooks/usePageScroll";
import Button from "../Button/Button";
import useStore from "hooks/useStore";
import Avatar from "../Avatar/Avatar";
import { BiSearch, MdSpaceDashboard } from "react-icons/all";
import Dropdown from "components/Dropdown/Dropdown";
import SearchProduct from "components/SearchProduct/SearchProduct";
import { searchProductAction } from "context/actions/productAction";

const Navigation = () => {
    const [
        {
            state: { auth },
            actions: { signOutAction },
        },
        dispatch,
    ] = useStore();

    const navigate = useNavigate();

    const [expandNavigation, setExpandNavigation] = useState(false);
    const windowScroll = usePageScroll();
    const [isHomePage, setHomePage] = useState(true);
    const [openAuthMenu, setOpenAuthMenu] = useState(false);

    const [isOpenMobileSearchbar, setOpenMobileSearchbar] = useState(false);

    const header = useRef();
    const location = useLocation();

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
        // { path: "/", label: "Courses" },
        {
            path: "/blogs",
            label: "Blogs",
        },
        { path: "/dashboard", label: "Dashboard", private: true },
    ];

    function closeAuthDropdown() {
        setOpenAuthMenu(false);
    }

    function handleOpenMobileSearchbar() {
        setOpenMobileSearchbar(!isOpenMobileSearchbar);
    }

    async function handleSearch(e, value) {
        try {
            let { status, data } = await searchProductAction(value);
            if (status === 200) {
                dispatch({
                    type: "SET_SEARCH_RESULT",
                    payload: {
                        searchProducts: data,
                        searchValue: value,
                    },
                });
                navigate("/search");
            }
        } catch (ex) {}
        finally {
            setOpenMobileSearchbar(false)
        }
    }

    return (
        <div>
            <div
                ref={header}
                className={`navbar top-0 left-0 fixed shadow-md 
                ${
                    windowScroll < 500 && isHomePage ? "shadow-none navbar-transparent" : "bg-white/40 backdrop-blur-md"
                }`}
            >
                <div className="container">
                    <div className="flex">
                        <Link to="/" className="w-52">
                            {/*<h1 className="text-primary-900 font-bold text-">Reseller-Product</h1>*/}
                            <img src="/logo.png" className="logo" alt="" />
                        </Link>
                    </div>

                    <div className="flex justify-center w-full">
                        <SearchProduct
                            onEnter={handleSearch}
                            onClose={() => setOpenMobileSearchbar(false)}
                            isOpenMobileSearchbar={isOpenMobileSearchbar}
                        />
                    </div>

                    <div className={`flex gap-6 items-center main-nav ${expandNavigation ? "expand" : ""}`}>
                        {items.map((item) =>
                            item.private ? (
                                auth && (
                                    <NavLink
                                        end={true}
                                        onClick={() => setExpandNavigation(false)}
                                        to={item.path}
                                        className="font-medium text-base"
                                    >
                                        {item.label}
                                    </NavLink>
                                )
                            ) : (
                                <NavLink
                                    end={true}
                                    onClick={() => setExpandNavigation(false)}
                                    to={item.path}
                                    className="font-medium text-base"
                                >
                                    {item.label}
                                </NavLink>
                            )
                        )}
                    </div>


                    <a className="block md:hidden cursor-pointer pl-4" onClick={handleOpenMobileSearchbar}>
                        <BiSearch className="text-2xl" />
                    </a>


                    <div className="flex-none">
                        {auth && (
                            <div
                                className="relative "
                                onMouseOver={() => setOpenAuthMenu(true)}
                                onMouseLeave={closeAuthDropdown}
                                onClick={() => setOpenAuthMenu(!openAuthMenu)}
                            >
                                <div className=" flex justify-center items-center">
                                    <Avatar imgClass="w-9 h-9" src={auth.avatar} username={auth.username} className="ml-2" />
                                </div>

                                <Dropdown isOpen={openAuthMenu}>
                                    <a className="pt-1 flex items-center">
                                        <Avatar className="w-8 mr-1" src={auth.avatar} username={auth.username} />
                                        <div className="flex flex-col">
                                            <span className="text-sm font-semibold text-dark-400">{auth.username}</span>
                                            <span className="text-light-100 text-xs font-medium">{auth.role}</span>
                                        </div>
                                    </a>
                                    <div className="mt-2">
                                        <li className="pt-1 flex items-center gap-x-1 hover:text-primary-500">
                                            <MdSpaceDashboard className="text-xl text-dark-400" />
                                            <Link onClick={closeAuthDropdown} to={`/dashboard`}>
                                                Dashboard
                                            </Link>
                                        </li>
                                        <li
                                            className="pt-1 flex items-center gap-x-1 cursor-pointer hover:text-primary-500"
                                            onClick={handleLogout}
                                        >
                                            <FaSignOutAlt
                                                onClick={closeAuthDropdown}
                                                className="text-xl text-dark-400"
                                            />
                                            Logout
                                        </li>
                                    </div>
                                </Dropdown>
                            </div>
                        )}
                    </div>
                    <div className="flex items-center">
                        {!auth && (
                            <div>
                                <Button theme="primary" className="ml-4 login-btn">
                                    <Link to="/login" state={location.pathname} className="flex items-center">
                                        <FaSignInAlt />
                                        <span className="ml-1">Login</span>
                                    </Link>
                                </Button>
                                <a href="" className="px-1 ml-2 login-icon block">
                                    <FaSignInAlt className="text-xl" />
                                </a>
                            </div>
                        )}
                        <div className="block sm:hidden pl-8">
                            <div className="flex items-center fixed top-6 right-4 z-1000">
                                <div className="pl-3">
                                    <img
                                        onClick={toggleNavigation}
                                        className="bar-icon w-6"
                                        src="/Group-3.svg "
                                        alt=""
                                    />
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
