    import React from "react";
    import { DefaultSidebar } from "../../../components/SideNavbar/Sidebar";
    import { DepositHeader } from "../../../components/DepositHeader/DepositHeader";
    import '../Home/home.css'
    const Deposit = () => {
        return (
            <div className="Home">
                <div className="sidebar-and-details">
                    <DefaultSidebar />
                <DepositHeader/>
                </div>
            </div>
        );
    };
    export default Deposit;