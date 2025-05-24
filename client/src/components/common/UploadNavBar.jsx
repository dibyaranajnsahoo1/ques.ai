/**
 * UploadNavBar Component
 * 
 * A responsive navigation bar used in the upload pages that displays breadcrumb navigation,
 * project and page names, and icons for notifications and logout.
 * 
 * @component
 * @example
 * <UploadNavBar projectName="MyProject" pageName="Upload Documents" />
 * 
 * @param {Object} props - Props passed to the component.
 * @param {string} props.projectName - Name of the current project shown in the breadcrumb.
 * @param {string} props.pageName - Name of the current page shown in the breadcrumb.
 * 
 * @returns {JSX.Element} The rendered navigation bar component.
 */

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, House, LogOut } from "lucide-react";
import { useLogoutMeMutation } from "../../redux/service";
import { toast } from "sonner";

const UploadNavBar = ({ projectName, pageName }) => {
    const navigate = useNavigate();

    const [logoutMe, logoutMeData] = useLogoutMeMutation();

    /**
     * Handles the logout process and navigates to the homepage.
     */
    const handleLogout = async () => {
        try {
            await logoutMe().unwrap();
            window.location.href = "/";
        } catch (error) {
            toast.error("Logout failed");
        }
    };

    // Show toast notification after successful logout
    useEffect(() => {
        if (logoutMeData.isSuccess) {
            toast.warning(logoutMeData.data.msg);
        }
    }, [logoutMeData.isSuccess]);

    return (
        <div className="w-full flex flex-col md:flex-row justify-between p-4 md:pr-12 mt-4 gap-4 md:gap-0">
            {/* Left: Breadcrumb Navigation */}
            <section>
                <div className="flex flex-wrap md:flex-nowrap justify-start items-center font-roboto text-sm md:text-md font-semibold cursor-pointer">
                    <div
                        onClick={() => navigate("/")}
                        className="pt-1 flex items-center gap-1 text-gray-500"
                    >
                        <House size={18} />
                        <span>Home Page</span>
                    </div>
                    <span
                        onClick={() => navigate(`/projects`)}
                        className="text-center px-1 pt-1 text-gray-500"
                    >
                        / {projectName}
                    </span>
                    <span className="text-center px-1 pt-1 text-primary">
                        / {pageName}
                    </span>
                </div>
            </section>

            {/* Right: Notification & Logout Icons */}
            <section className="flex justify-start md:justify-end items-center">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 p-2 flex justify-center items-center rounded-full border-2 border-gray-400 cursor-pointer">
                        <Bell size={20} />
                    </div>
                    <div
                        className="w-9 h-9 p-2 flex justify-center items-center rounded-full border-2 border-gray-400 cursor-pointer"
                        onClick={handleLogout}
                    >
                        <LogOut size={20} color="red" />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default UploadNavBar;