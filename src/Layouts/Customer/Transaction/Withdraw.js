import React from "react";
import Header from "../../../components/LoginHeader/Loghead";
import { DefaultSidebar } from "../../../components/SideNavbar/Sidebar";
import { TabsCustomAnimation } from "../../../components/TransactionHeader/TransactionHeader";
import WithdrawTab from "../../../components/Withdraw/WithdrawTab";
const Withdraw = () => {
    return (
        <div className="Home">
            <Header />
            <div className="sidebar-and-details">
                <DefaultSidebar />
               <TabsCustomAnimation/>
               <WithdrawTab/>
            </div>
        </div>
    );
};
export default Withdraw;