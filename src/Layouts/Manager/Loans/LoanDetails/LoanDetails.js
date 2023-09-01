import React from "react";
import LoanDetailsPage from "./LoanDetailsPage/LoanDetailsPage";
import { AdminHeader } from "../../../../components/AdminHeader/AdminHeader";
import './LoanDetails.css';

const LoanDetails = () => {
    return (
        <div className="Home">
            <div className="sidebar-and-details">
                <AdminHeader />
                <LoanDetailsPage />
            </div>
        </div>
    );
};

export default LoanDetails;