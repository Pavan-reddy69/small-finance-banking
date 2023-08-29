import React from "react";
import { DefaultSidebar } from "../../../components/SideNavbar/Sidebar";
import { LoanHeader } from "../../../LoanHeader/LoanHeader";


import '../Home/home.css'
const Loan = () => {
    return (
        <div className="Home">
            <div className="sidebar-and-details">
                <DefaultSidebar />
               <LoanHeader/>
            </div>
        </div>
    );
};
export default Loan;