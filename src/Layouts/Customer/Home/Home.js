import React from "react";
import { DefaultSidebar } from "../../../components/SideNavbar/Sidebar";
import DetailsComponent from "../../../components/AccDetails/Detail";
import './home.css';

const Land = () => {
    return (
        <div className="Home">
            <div className="sidebar-and-details">
                <DefaultSidebar />
                <DetailsComponent />
            </div>
        </div>
    );
};

export default Land;
