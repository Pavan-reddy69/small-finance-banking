import React from "react";
import { DefaultSidebar } from "../../../components/SideNavbar/Sidebar";
import Profile from "./Profile";
import './ProfileComp.css'
const ProfileComp = () => {
    return (
        <div className="Home">
            <div className="sidebar-and-details">
                <DefaultSidebar />
               <Profile/>
            </div>
        </div>
    );
};
export default ProfileComp;