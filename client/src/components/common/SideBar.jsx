import React, { useState } from "react";
import { NavLink, useLocation, useParams } from "react-router-dom";
import { Copy, Gem, Pen, Plus, Settings, Menu, X } from "lucide-react";
import QSLogo from "./QSLogo";
import { useMyInfoQuery } from "../../redux/service";

const SideBar = () => {
    const { projectId } = useParams();
    const location = useLocation();
    const activePath = location.pathname;
    const [isOpen, setIsOpen] = useState(false);
    const { data } = useMyInfoQuery();

    const navItems = [
        { to: `/project/upload/${projectId}`, icon: <Plus size={20} />, text: "Add your Podcast(s)" },
        { to: `/project/create-and-response/${projectId}`, icon: <Pen size={16} />, text: "Create & Repurpose" },
        { to: `/project/podcast-widget`, icon: <Copy size={18} />, text: "Podcast Widget" },
        { to: `/account/settings`, icon: <Gem size={18} />, text: "Upgrade" },
    ];

    const renderLinks = () =>
        navItems.map(({ to, icon, text }) => (
            <div key={text} className="w-full rounded-lg mb-2">
                <NavLink
                    to={to}
                    className={({ isActive }) =>
                        `block rounded-lg hover:bg-primary group ${isActive ? "bg-[#f9f3ff]" : ""}`
                    }
                    onClick={() => setIsOpen(false)}
                >
                    <div className="flex gap-3 items-center h-10 pl-4">
                        <span className="group-hover:text-white text-[#646464]">{icon}</span>
                        <p className={`text-sm font-semibold group-hover:text-white ${
                            activePath === to ? "text-primary" : "text-[#646464]"}`}>{text}</p>
                    </div>
                </NavLink>
            </div>
        ));

    const ProfileAvatar = () => {
        const initials = data.me?.userName
            ?.split(" ")
            .map((w) => w[0])
            .join("")
            .toUpperCase();

        if (data.me.profilePic) {
            return (
                <img
                    src={data.me.profilePic}
                    alt="Profile"
                    className="rounded-md w-10 h-10 object-cover"
                />
            );
        }

        return (
            <div className={`rounded-md w-10 h-10 flex justify-center items-center ${
                Math.random() < 0.5 ? "bg-primary" : "bg-orange-500"}`}>
                <h2 className="text-white text-lg font-bold">{initials}</h2>
            </div>
        );
    };

    return (
        <>
            {/* Mobile Menu Toggle */}
            <div className="md:hidden fixed top-4 left-4 z-50">
                <Menu size={28} onClick={() => setIsOpen(true)} className="text-black cursor-pointer" />
            </div>

            {/* Mobile Sidebar */}
            <div className={`fixed top-0 left-0 h-full w-3/4 bg-white z-40 shadow-lg transform transition-transform duration-300 ${
                isOpen ? "translate-x-0" : "-translate-x-full"} md:hidden`}>
                <div className="flex justify-between items-center p-4 border-b">
                    <QSLogo color="#7E22CE" width={30} height={30} />
                    <X size={24} onClick={() => setIsOpen(false)} className="cursor-pointer" />
                </div>
                <div className="flex flex-col p-4">{renderLinks()}</div>
                <NavLink to="/view/settings" onClick={() => setIsOpen(false)}>
                    <div className="flex gap-3 items-center h-10 pl-4 mt-6">
                        <Settings size={20} className="text-black" />
                        <p className="text-sm font-semibold">Help</p>
                    </div>
                </NavLink>
                <NavLink to="/account/settings" onClick={() => setIsOpen(false)}>
                    <div className="flex gap-3 items-center h-14 p-4 mt-6">
                        <ProfileAvatar />
                        <div>
                            <p className="text-sm font-bold">{data.me.userName}</p>
                            <p className="text-xs">{data.me.email}</p>
                        </div>
                    </div>
                </NavLink>
            </div>

            {/* Desktop Sidebar */}
            <div className="hidden md:flex w-1/3 max-h-screen bg-white font-roboto flex-col justify-between">
                <div>
                    <NavLink to="/">
                        <div className="w-full flex justify-center p-6">
                            <QSLogo color="#7E22CE" width={30} height={30} />
                        </div>
                    </NavLink>
                    <div className="w-full flex-col items-start my-1 pl-3">
                        {renderLinks()}
                        <div className="border-t-2 mt-10 w-[85%] mx-auto" />
                    </div>
                </div>
                <div className="mt-28">
                    <div className="w-full pl-3 mt-20">
                        <NavLink to="/view/settings">
                            <div className="flex gap-3 items-center h-10 pl-4">
                                <span className="text-black"><Settings size={20} /></span>
                                <p className="text-sm font-semibold">Help</p>
                            </div>
                        </NavLink>
                    </div>
                    <div className="border-t-2 w-[85%] mx-auto my-4 mb-6" />
                </div>
                <div className="w-full pl-3 mb-2">
                    <NavLink to="/account/settings">
                        <div className="flex gap-3 items-center h-10 pl-4">
                            {data.me.profilePic ? (
                                <img src={data.me.profilePic} alt="Profile" className="rounded-md w-12 h-12 object-cover" />
                            ) : (
                                <div className={`rounded-md w-12 h-12 flex justify-center items-center ${
                                    Math.random() < 0.5 ? "bg-primary" : "bg-orange-500"}`}>
                                    <h2 className="text-white text-2xl font-bold">
                                        {data.me?.userName
                                            ?.split(" ")
                                            .map((w) => w[0])
                                            .join("")
                                            .toUpperCase()}
                                    </h2>
                                </div>
                            )}
                            <div className="flex flex-col">
                                <p className="text-md font-bold">{data.me.userName}</p>
                                <p className="text-xs">{data.me.email}</p>
                            </div>
                        </div>
                    </NavLink>
                </div>
            </div>
        </>
    );
};

export default SideBar;
