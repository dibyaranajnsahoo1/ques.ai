import React from "react";
import logo from "../../assets/Home/QuesLogo-2.png"

const QSLogo = ({ height, width }) => {
    return (
        <div className="flex items-center">
           <img
                src={logo}
                alt="logo"
                // className=" object-contain"
                width={width}
                height={height}
                />



        </div>
    );
};

export default QSLogo;
