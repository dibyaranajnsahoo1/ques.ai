import React, { useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import QSLogo from "./QSLogo";
import { Bell, LogOut, Settings } from "lucide-react";
import { useLogoutMeMutation } from "../../redux/service";
import { toast } from "sonner";
// import logo from "../../assets/Home/QuesLogo-2.png"

const NavBar = () => {
  const location = useLocation();
  const [logoutMe, logoutStatus] = useLogoutMeMutation();

  const handleLogout = async () => {
    try {
      await logoutMe().unwrap();
      window.location.href = "/";
    } catch (error) {
      toast.error("Logout failed. Please try again.");
    }
  };

  useEffect(() => {
    if (logoutStatus.isSuccess) {
      toast.warning(logoutStatus.data.msg);
    }
  }, [logoutStatus.isSuccess, logoutStatus.data?.msg]);

  const hideLogoutPaths = ["/", "/projects"];
  const shouldShowLogout = !hideLogoutPaths.includes(location.pathname);

  return (
    <div className="w-full bg-white min-h-8 py-4 px-6 md:px-28">
      <div className="flex justify-between items-center">
        {/* Logo Section */}
        <NavLink to="/" aria-label="Home">
          {/* <QSLogo color="#7E22CE" width={40} height={40} /> */}
          <QSLogo width={170} height={170} />

         
        </NavLink>

        {/* Icons Section */}
        <div className="flex items-center gap-4">
          <NavLink to="/account/settings" aria-label="Settings">
            <Settings size={24} color="#12100f" />
          </NavLink>
          <NavLink to="/Notifications" aria-label="Notifications">
            <Bell size={24} color="#12100f" />
          </NavLink>

          {shouldShowLogout && (
            <button
              className="w-10 h-10 p-2 flex items-center justify-center rounded-full hover:bg-gray-100 transition"
              onClick={handleLogout}
              aria-label="Logout"
            >
              <LogOut size={22} color="red" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
