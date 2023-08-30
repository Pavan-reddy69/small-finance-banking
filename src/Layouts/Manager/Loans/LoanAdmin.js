import React from "react";
import LoanTable from "./LoanTable/LoanTable";
import { AdminHeader } from "../../../components/AdminHeader/AdminHeader";
import './LoanAdmin.css';

const LoanAdmin = () => {
    return (
        <div className="Home">
            <div className="sidebar-and-details">
                <AdminHeader />
                <LoanTable />
            </div>
        </div>
    );
};

export default LoanAdmin;