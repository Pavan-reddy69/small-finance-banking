import React from "react";
import UserDetailsPage from "./UserDetailsPage/UserDetailsPage";
import { AdminHeader } from "../../../components/AdminHeader/AdminHeader";
import './Users.css';

const UserDetails = () => {
    return (
        <div className="Home">
            <div className="sidebar-and-details">
                <AdminHeader />
                <UserDetailsPage />
            </div>
        </div>
    );
};

export default UserDetails;