import React from "react";
import Header from "../../../components/LoginHeader/Loghead";
import { DefaultSidebar } from "../../../components/SideNavbar/Sidebar";
import { TabsCustomAnimation } from "../../../components/TransactionHeader/TransactionHeader";
import TransferTab from "../../../components/Transfer/Trans";
const Transfer = () => {
    return (
        <div className="Home">
            <Header />
            <div className="sidebar-and-details">
                <DefaultSidebar />
               <TabsCustomAnimation/>
               <TransferTab/>
            </div>
        </div>
    );
};
export default Transfer;