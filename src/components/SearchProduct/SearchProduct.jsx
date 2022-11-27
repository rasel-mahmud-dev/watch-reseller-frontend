import React from "react";
import { BiSearch } from "react-icons/all";
import "./style.css";

const SearchProduct = ({ onEnter, isOpenMobileSearchbar, onClose }) => {
    function handleSubmit(e) {
        e.preventDefault();
        onEnter(e, e.target.search.value);
    }

    function searchbar() {
        return (
            <form onSubmit={handleSubmit}>
                <div className="search-input border border-dark-100/40 flex items-center py-2 rounded-lg px-2 gap-x-2 max-w-sm w-full mx-auto">
                    <BiSearch className="text-dark-300 text-xl" />
                    <input
                        name="search"
                        type="text"
                        className="bg-transparent w-full outline-none !border-none"
                        placeholder="Search product..."
                    />
                </div>
            </form>
        );
    }

    return (
        <div>
            <div
                onClick={() => isOpenMobileSearchbar && onClose()}
                className={`search-backdrop ${isOpenMobileSearchbar ? "search-backdrop_open" : ""}`}
            ></div>

            <div className={` ${isOpenMobileSearchbar ? "mobile-searchbar--open" : ""} mobile-searchbar`}>
                {searchbar()}
            </div>

            <div className="desktop-searchbar flex-1 search-input-wrapper">{searchbar()}</div>
        </div>
    );
};

export default SearchProduct;
