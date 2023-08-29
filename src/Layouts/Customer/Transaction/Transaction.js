import React from "react";
import { DefaultSidebar } from "../../../components/SideNavbar/Sidebar";
import { TabsCustomAnimation } from "../../../components/TransactionHeader/TransactionHeader";
import '../Home/home.css'
const Transactions = () => {
    return (
        <div className="Home">
            <div className="sidebar-and-details">
                <DefaultSidebar />
               <TabsCustomAnimation/>
            </div>
        </div>
    );
};
export default Transactions;
