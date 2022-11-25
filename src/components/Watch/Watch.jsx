import React from "react";
import Avatar from "components/Avatar/Avatar";
import {BiCurrentLocation} from "react-icons/all";
import { compareDesc } from 'date-fns'
import Button from "components/Button/Button";
const Watch = ({ watch }) => {
    const { title, picture, resalePrice, originalPrice, conditionType, purchaseDate, createdAt, description, location, address } = watch;


    const usedDate = new Date(createdAt) - new Date(purchaseDate)
        // let a = compareDesc(new Date(createdAt), new Date(purchaseDate))

    let h = Date.parse(purchaseDate)
    let h2 = Date.parse(createdAt)
    let purchaseYear = new Date(h).getFullYear()
    let purchaseMonth = new Date(h).getMonth()
    let purchaseDay = new Date(h).getDay()
    let now = new Date()

    let out = ""
    let year = now.getFullYear() - purchaseYear
    if(year){
        out = year + "y-"
    }
    let month = now.getMonth() - purchaseMonth
    if(month){
        out += month +"m-"
    }
    let day = now.getDay() - purchaseDay
    if(day){
        out += day +"d "
    }
    console.log(out)





    return (
        <div className="card">
            <div className="mx-auto">
                <Avatar src={picture} className="!w-24" alt={title} />
            </div>
            <h2 className="font-semibold text-sm text-dark-900  mt-4">
                {title.length > 50 ? title.substring(0, 50)+"..." : title}
            </h2>
            <div className="gap-x-2 py-2 font-normal">
                <h3 className="text-sm  text-dark-400">Resale Price: <span className="text-red-400">{resalePrice}.Tk</span></h3>
                <h3 className="text-sm  text-dark-400">Market Price: <span className="line-through">{originalPrice}.Tk</span></h3>
            </div>
                <h3 className="text-sm font-medium text-dark-400">Condition: <span className="">{conditionType}</span></h3>

               <div className="flex items-center justify-between flex-wrap mt-4">
                   <h3 className="text-sm font-medium text-dark-300 flex items-center gap-x-1">
                       <BiCurrentLocation className="" />
                       <span className="">{location}</span>
                   </h3>


                   <h3 className="text-sm font-medium text-dark-300 flex items-center gap-x-1">
                       Used
                       <span className="">{out}</span>
                   </h3>
               </div>

            <Button className="!bg-opacity-20 !text-primary-600 hover:!bg-primary-700 hover:!text-white mt-4">Book Now</Button>

            {/*<p className="mt-2 text-dark-300 text-sm"> {description.length > 100 ? description.substring(0, 100) +"..." : description}</p>*/}
        </div>
    );
};

export default Watch;