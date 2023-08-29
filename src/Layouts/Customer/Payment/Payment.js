import React from "react";
import { DefaultSidebar } from "../../../components/SideNavbar/Sidebar";
import { PaymentHeader } from "../../../components/PaymentHeader/PaymentHeader";


import '../Home/home.css'
const Payment = () => {
    return (
        <div className="Home">
            <div className="sidebar-and-details">
                <DefaultSidebar />
               <PaymentHeader/>
            </div>
        </div>
    );
};
export default Payment;