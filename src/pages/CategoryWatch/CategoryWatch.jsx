import React from 'react';
import {useParams} from "react-router-dom";
import axios from "../../axios";
import {useQuery} from "@tanstack/react-query";

const CategoryWatch = () => {

    const {categoryId} = useParams()

    const watches = [
        {
            picture: "asad",
            name: "ASDsad",
            location: "ASDsad", // (Chittagong, Dhaka, etc.)
            resalePrice: 231,
            originalPrice: "123",
            conditionType: ["excellent", "good", "fair"],
            mobileNumber: 123213,
            description: "",
            postedDate: "",
            purchaseDate: "",
            isAvailable: true
        }
    ]


    const {isLoading, error, data} = useQuery({
        queryKey: ['watch', categoryId],
        queryFn: () => axios.get(`/api/v1/watch?categoryId=${categoryId}`)
            .then(res => {
                return res.data
            }).catch(ex => {
                return null
            })
    })

    if (isLoading) return 'Loading...'

    if (error) return 'An error has occurred: ' + error.message

    console.log(data)

    return (
        <div>
            <h1>Category Watch</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium alias, dolorem esse est, in nam non
                numquam officia, quaerat quibusdam quod repudiandae sed sit totam velit. A atque autem eligendi et
                exercitationem facilis ipsam iste magnam, modi mollitia, natus, odio qui sit velit voluptatem. Adipisci
                amet animi aut blanditiis dolore dolorem ducimus, fugit labore maxime natus nesciunt nihil non, optio
                placeat praesentium provident qui quod, ut voluptatem voluptatum. Aperiam, dolore, doloremque enim eos
                fugiat harum id iure maxime natus numquam praesentium quaerat sint soluta suscipit ut! Debitis illum
                saepe veritatis voluptatem voluptatum. Ad animi assumenda at aut dicta dolore est ex fugit illo illum
                ipsa laudantium, mollitia nesciunt porro ut? Adipisci animi consectetur cumque dolore dolorem dolorum
                eos ex, fugit, illum ipsa laudantium molestiae optio, possimus quam quisquam quos repudiandae! A alias
                amet, aperiam aut debitis distinctio dolore esse fugit, harum ipsa ipsam laboriosam porro quasi unde ut
                veniam veritatis voluptas. Architecto dignissimos dolorum ipsam labore odit officia perspiciatis
                quisquam sapiente totam ullam? Cupiditate fuga repellendus voluptatum. Accusantium enim fugit harum
                illo, impedit labore maxime nostrum. Alias doloremque, dolorum eos est labore neque non nostrum,
                pariatur quaerat qui repellat sint suscipit voluptatum? A aut debitis eaque explicabo fuga praesentium
                veritatis?</p>

        </div>
    );
};


export default CategoryWatch;