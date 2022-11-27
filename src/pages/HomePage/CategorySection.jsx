import React from 'react';
import "./homePage.css"
import {Link} from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import catchErrorMessage from "../../utils/catchErrorMessage";
import {fetchCategories} from "context/actions/categoryAction";


const CategorySection = () => {

    let {data: categories, isLoading, isError, error, } = fetchCategories()

    return (
        <section className="section" id="category-section">

            <div className="container">

                <h6 className="section_sub-title">Most popular categories</h6>
                <h1 className="section_title">Our Product Categories</h1>


                {isLoading &&  <Loader size={30} title="Category are loading..." className="mt-28" /> }
                { isError && (
                    <h1 className="text-center mt-24 text-red-500">Category load fail {catchErrorMessage(error)}</h1>
                ) }

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
                    {categories?.map(category => (
                        <Link to={`/category/${category._id}`} key={category._id}>
                            <div className="card">
                                <div className="w-20 mx-auto">
                                    <img src={category.image} className="w-full" alt={category.name} />
                                </div>
                                <h4 className="font-medium text-dark-500  text-center mt-4">{category.name}</h4>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

        </section>
    );
};

export default CategorySection;