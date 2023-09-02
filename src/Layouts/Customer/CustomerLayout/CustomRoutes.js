import React, { useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Land from "../Home/Home";
import Withdraw from "../Transaction/Withdraw";
import Transfer from "../Transaction/Transfer";
import Transactions from "../Transaction/Transaction";
import Deposit from "../Deposit/Deposit";
import Loan from "../Loans/Loan";
import DepositDetailsPage from "../../../components/DepositTable/DepositDetailsPage";
import ProfileComp from "../Profile/ProfileComponent";
import Swal from "sweetalert2";

const Routers = () => {
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem("userDetails")) || {};
  const location = useLocation();

  const checkKYCStatus = () => {
    if (location.pathname !== "/customer-home" && location.pathname !== "/login" && location.pathname !== "/profile" && !user.kyc) {
      Swal.fire({
        icon: "error",
        title: "KYC Not Verified",
        text: "You must Wait until your KYC is verified before accessing this page.",
      }).then(() => {
        navigate("/customer-home");
      });
    }
  };

  useEffect(() => {
    // Check KYC status on each route change (page navigation)
    checkKYCStatus();
  }, [location.pathname]); // This effect runs whenever the pathname changes

  return (
    <Routes>
      <Route
        path="/customer-home"
        element={<Land />}
      />
      <Route
        path="/transactions"
        element={<Transactions />}
      />
      <Route
        path="/withdraw"
        element={<Withdraw />}
      />
      <Route
        path="/transfer"
        element={<Transfer />}
      />
      <Route
        path="/deposit"
        element={<Deposit />}
      />
      <Route
        path="/loan"
        element={<Loan />}
      />
      <Route
        path="/profile"
        element={<ProfileComp />}
      />
      <Route
        path="/deposit/:id"
        element={<DepositDetailsPage />}
      />
    </Routes>
  );
};

export default Routers;
