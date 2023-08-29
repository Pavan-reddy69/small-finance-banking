import React from "react";
import UsersComponent from "./UsersComponent";
import { AdminHeader } from "../../../components/AdminHeader/AdminHeader";
import './Users.css';

const Users = () => {
    return (
        <div className="Home">
            <div className="sidebar-and-details">
                <AdminHeader />
                <UsersComponent />
            </div>
        </div>
    );
};

export default Users;