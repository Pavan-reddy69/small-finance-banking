import React from "react";
import { Routes, Route } from 'react-router-dom'
import Land from "../Home/Home";
import Withdraw from '../Transaction/Withdraw'
import Transfer from '../Transaction/Transfer'
import Transactions from '../Transaction/Transaction' 
import Deposit from "../Deposit/Deposit";
import Loan from "../Loans/Loan";
import DepositDetailsPage from "../../../components/DepositTable/DepositDetailsPage";

const Routers = () => {
    return( ( <Routes>
          <Route path="/customer-home" element={<Land />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/withdraw" element={<Withdraw/>} />
          <Route path="/transfer" element={<Transfer/>} />
          <Route path="/deposit" element={<Deposit/>} />
          <Route path="/loan" element={<Loan/>} />
          <Route path="/deposit/:id" element={<DepositDetailsPage/>} />
    </Routes>))
  }
  export default Routers