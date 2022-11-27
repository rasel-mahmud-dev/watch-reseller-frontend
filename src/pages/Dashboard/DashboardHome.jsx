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
                    <div className="relative ">
                        <Avatar className="w-28" src={auth.avatar} />

                        {auth.isVerified && (
                            <div className="absolute right-0 top-20">
                                <svg
                                    stroke="currentColor"
                                    fill="currentColor"
                                    stroke-width="0"
                                    viewBox="0 0 24 24"
                                    className="text-green-600"
                                    height="1.5em"
                                    width="1.5em"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path fill="none" d="M0 0h24v24H0z"></path>
                                    <path d="M23 12l-2.44-2.79.34-3.69-3.61-.82-1.89-3.2L12 2.96 8.6 1.5 6.71 4.69 3.1 5.5l.34 3.7L1 12l2.44 2.79-.34 3.7 3.61.82L8.6 22.5l3.4-1.47 3.4 1.46 1.89-3.19 3.61-.82-.34-3.69L23 12zm-12.91 4.72l-3.8-3.81 1.48-1.48 2.32 2.33 5.85-5.87 1.48 1.48-7.33 7.35z"></path>
                                </svg>
                            </div>
                        )}
                    </div>

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
                            <h1 className="min-w-[120px]">Admin Approve: </h1>
                            <h1>{auth.isVerified ? "YES" : "NO"}</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardHome;
