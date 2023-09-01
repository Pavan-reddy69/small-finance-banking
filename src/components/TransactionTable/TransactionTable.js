import React, { useEffect, useState } from "react";
import { Table, TableHead, TableBody, TableRow, TableCell } from "@mui/material";
import './Transaction.css'
import api from "../../Api/api";

const TransactionTable = () => {
  const [transactions, setTransactions] = useState([]);
  const storedUserData = JSON.parse(sessionStorage.getItem("userDetails"));
  
  useEffect(() => {
   
    const fakeApiCall = async () => {
      try {
        
        const response = await fetch(api+"transaction/allTransactions?accNo="+storedUserData.accNo);
        const data = await response.json();
        setTransactions(data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };
    

    fakeApiCall(); 
  }, []);

  const top10Transactions = transactions.slice(0, 10); 

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>ID</TableCell>
          <TableCell>Amount</TableCell>
          <TableCell>Details</TableCell>
          <TableCell>Type</TableCell>
          <TableCell>From Account</TableCell>
          <TableCell>To Account</TableCell>
          <TableCell>Date</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {top10Transactions.length === 0 ? (
          <TableRow>
            <TableCell colSpan={8} style={{textAlign:'center'}}>No transactions available</TableCell>
          </TableRow>
        ) : (
          top10Transactions.map((transaction) => (
            <TableRow key={transaction.transactionID}>
              <TableCell>{transaction.transactionID}</TableCell>
              <TableCell>{transaction.amount}</TableCell>
              <TableCell>{transaction.transactionType}</TableCell>
              <TableCell>{transaction.whichTransaction}</TableCell>
              <TableCell>{transaction.fromAccountNumber}</TableCell>
              <TableCell>{transaction.toAccountNumber}</TableCell>
              <TableCell>{transaction.timestamp}</TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};

export default TransactionTable;
