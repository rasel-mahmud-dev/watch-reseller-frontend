import React from "react";
import SidebarButton from "components/SidebarButton/SidebarButton";
import useStore from "hooks/useStore";
import Avatar from "components/Avatar/Avatar";

const DashboardHome = () => {
    const [
        {
            state: { auth },
        },
    ] = useStore();

    return (
        <div>
            <SidebarButton>
                <h1 className="section_title !my-0">Dashboard </h1>
            </SidebarButton>

            <div className="card">
                <h1 className=" text-xl text-dark-400 font-semibold">Welcome {auth.username}</h1>

                <div className="flex items-start gap-x-5 mt-5 flex-col md:flex-row">
                    <Avatar className="w-28" src={auth.avatar} />

                    <div>
                        <div className="flex justify-start gap-x-4 border-b border-primary-100/10 py-2">
                            <h1 className="min-w-[120px]">First Name: </h1>
                            <h1>{auth.firstName}</h1>
                        </div>
                        <div className="flex justify-start gap-x-4 border-b border-primary-100/10 py-2">
                            <h1 className="min-w-[120px]">Last Name: </h1>
                            <h1>{auth.lastName}</h1>
                        </div>
                        <div className="flex justify-start gap-x-4 border-b border-primary-100/10 py-2">
                            <h1 className="min-w-[120px]">Username: </h1>
                            <h1>{auth.username}</h1>
                        </div>
                        <div className="flex justify-start gap-x-4 border-b border-primary-100/10 py-2">
                            <h1 className="min-w-[120px]">Email: </h1>
                            <h1>{auth.email}</h1>
                        </div>
                        <div className="flex justify-start gap-x-4 border-b border-primary-100/10 py-2">
                            <h1 className="min-w-[120px]">Role: </h1>
                            <h1>{auth.role}</h1>
                        </div>
                        <div className="flex justify-start gap-x-4 border-b border-primary-100/10 py-2">
                            <h1 className="min-w-[120px]">Username: </h1>
                            <h1>{auth.username}</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardHome;