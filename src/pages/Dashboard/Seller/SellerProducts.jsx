import React, {useRef, useState} from "react";
import Avatar from "components/Avatar/Avatar";
import Button from "components/Button/Button";
import { AiFillDelete, RiEditBoxLine } from "react-icons/all";
import Circle from "components/Circle/Circle";
import ActionModal from "components/ActionModal/ActionModal";
import {deleteWatchAction} from "context/actions/productAction";

const SellerProducts = () => {
    const [products] = useState([
        {
            _id: "1",
            title: "new products",
            location: "new products",
            isSold: "false",
            resalePrice: 123,
            originalPrice: 100,
            picture: "new products",
            conditionType: "Good",
            mobileNumber: "0123123798123",
            description: `
            Pellentesque in ipsum id orci porta dapibus. Pellentesque in ipsum id orci porta dapibus. Vivamus suscipit tortor eget felis porttitor volutpat.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Vivamus suscipit tortor eget felis porttitor volutpat.
        Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Proin eget tortor risus. Proin eget tortor risus.
            `,
            purchaseDate: new Date(),
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            _id: "1",
            title: "new products",
            location: "new products",
            isSold: "false",
            resalePrice: 123,
            originalPrice: 100,
            picture: "new products",
            conditionType: "Good",
            mobileNumber: "0123123798123",
            description: `
            Pellentesque in ipsum id orci porta dapibus. Pellentesque in ipsum id orci porta dapibus. Vivamus suscipit tortor eget felis porttitor volutpat.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Vivamus suscipit tortor eget felis porttitor volutpat.
        Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Proin eget tortor risus. Proin eget tortor risus.
            `,
            purchaseDate: new Date(),
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    ]);

    const deleteWatchId = useRef()


    function prepareDeleteWatch(id){
        deleteWatchId.current = id
    }


    function handleDeleteActionHandler(isYes){
        if(isYes){
            let isDeleted = deleteWatchAction(deleteWatchId.current)

        } else {
            deleteWatchId.current = null
        }
    }

    const columns = ["SL", "title", "isSold", "original price", "Reseller Price", "picture", "condition", "actions"];


    return (
        <div>
            <h1 className="page-section-title">My Products</h1>

            <ActionModal title="Are your sure to delete this?" id="deleteConfirmationModal">
                <div className="mt-4 flex items-center gap-x-2 justify-end">
                    <label htmlFor="deleteConfirmationModal" onClick={()=>handleDeleteActionHandler(true)}><Button className="pointer-events-none" theme="danger">Yes</Button></label>
                    <label htmlFor="deleteConfirmationModal" onClick={()=>handleDeleteActionHandler(false)}><Button className="pointer-events-none" >No</Button></label>
                </div>
            </ActionModal>

            <div className="overflow-x-auto">
                <table className="table table-compact w-full">
                    <thead>
                        <tr>
                            {columns.map((th) => (
                                <th>{th}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product, index) => (
                            <tr>
                                <td>{index + 1}</td>
                                <td>
                                    <Avatar imgClass="!rounded-none" src={product.picture} username="" />
                                </td>
                                <td>{product.title}</td>
                                <td>{product.isSold}</td>
                                <td>{product.originalPrice}</td>
                                <td>{product.resalePrice}</td>
                                <td>{product.conditionType}</td>
                                <td>
                                    <div className="flex items-center gap-x-2">
                                        <Circle className="" >
                                            <RiEditBoxLine className="text-white" />
                                        </Circle>
                                        <label htmlFor="deleteConfirmationModal">
                                            <Circle className="!bg-red-300 " onClick={()=>prepareDeleteWatch(product._id)}>
                                                <AiFillDelete className="text-white" />
                                            </Circle>
                                        </label>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SellerProducts;
