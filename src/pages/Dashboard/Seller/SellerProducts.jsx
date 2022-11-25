import React, {useEffect, useRef, useState} from "react";
import Avatar from "components/Avatar/Avatar";
import Button from "components/Button/Button";
import { AiFillDelete, RiEditBoxLine } from "react-icons/all";
import Circle from "components/Circle/Circle";
import ActionModal from "components/ActionModal/ActionModal";
import {deleteWatchAction, fetchSellerProducts} from "context/actions/productAction";
import {useLocation} from "react-router-dom";
import toast from "react-hot-toast";

const SellerProducts = () => {

    const {data: products, refetch} = fetchSellerProducts();

    const location = useLocation();

    const deleteWatchId = useRef()


    function prepareDeleteWatch(id){
        deleteWatchId.current = id
    }

    useEffect(()=>{
        if(location.state?.isAddedProduct){
            refetch()
        }
    }, [location.state])


    function handleDeleteActionHandler(isYes){
        if(isYes){
            let isDeleted = deleteWatchAction(deleteWatchId.current)
            if(isDeleted) {
                toast.success("Product has been deleted.")
                refetch().then(r => {}).catch(ex=>{
                    console.log(ex)
                })
            } else {
                toast.error("Product delete fail.")
            }
        } else {
            deleteWatchId.current = null
        }
    }

    const columns = ["SL","image", "title", "status", "original price", "Reseller Price", "condition", "Advertise", "actions"];


    return (
        <div>
            <h1 className="page-section-title">My Products ({products?.length})</h1>

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
                        {products?.map((product, index) => (
                            <tr>
                                <td>{index + 1}</td>
                                <td>
                                    <Avatar imgClass="!rounded-none" className="w-20" src={product.picture} username="" />
                                </td>
                                <td>{product.title}
                                </td>
                                <td>{product.isSold ? "Sold" : "Available" }</td>
                                <td>{product.originalPrice}.Tk</td>
                                <td>{product.resalePrice}.Tk</td>
                                <td>{product.conditionType}</td>
                                <td>
                                    <Button disable={product.isSold}>Select for Advertise</Button>
                                </td>
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
