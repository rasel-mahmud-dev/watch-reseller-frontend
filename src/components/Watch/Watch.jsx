import React from "react";
import Avatar from "components/Avatar/Avatar";
import { BiCurrentLocation } from "react-icons/all";
import Button from "components/Button/Button";
import { compareDate } from "utils/date";

const Watch = ({ watch, onClick }) => {
    const {
        title,
        picture,
        resalePrice,
        originalPrice,
        conditionType,
        purchaseDate,
        createdAt,
        description,
        location,
        address,
    } = watch;

    return (
        <div className="card">
            <div className="mx-auto">
                <Avatar src={picture} className="!w-24" alt={title} />
            </div>
            <h2 className="font-semibold text-sm text-dark-900  mt-4">
                {title?.length > 50 ? title?.substring(0, 50) + "..." : title}
            </h2>

            <div className="text-dark-400 text-sm">
                <div className="gap-x-2 py-2 font-normal">
                    <h3 className="">
                        Resale Price: <span className="text-red-400 font-medium">{resalePrice}.Tk</span>
                    </h3>
                    <h3 className="">
                        Market Price: <span className="line-through font-medium">{originalPrice}.Tk</span>
                    </h3>
                </div>
                <h3 className="">
                    Condition: <span className="text-800 font-medium">{conditionType}</span>
                </h3>
                <h3 className="">
                    Added on: <span className=" font-medium">{new Date(createdAt).toDateString()}</span>
                </h3>

                <h3 className="flex items-center gap-x-1">
                    Used
                    <span className=" font-medium">{compareDate(purchaseDate)}</span>
                </h3>

                <h3 className="flex items-center gap-x-1 mt-1">
                    <BiCurrentLocation className="" />
                    <span className=" font-medium">{location}</span>
                </h3>
            </div>

            <Button
                onClick={onClick}
                className="w-full !bg-opacity-20 !text-primary-600 hover:!bg-primary-700 hover:!text-white mt-4"
            >
                Book Now
            </Button>
        </div>
    );
};

export default Watch;
