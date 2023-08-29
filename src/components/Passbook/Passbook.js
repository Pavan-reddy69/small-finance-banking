import React, { useState, useEffect } from 'react';
import './Passbook.css';
import axios from 'axios'; 
import api from '../../Api/api';

const itemsPerPage = 8;

function Passbook() {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [transactionTypeFilter, setTransactionTypeFilter] = useState('');
  const [startDateFilter, setStartDateFilter] = useState('');
  const [endDateFilter, setEndDateFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [accountNumberFilter, setAccountNumberFilter] = useState('');
  const storedUserData = JSON.parse(sessionStorage.getItem("userDetails"));

  useEffect(() => {
    fetchAllTransactions();
  }, []);

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setFilteredTransactions(transactions.slice(startIndex, endIndex));
  }, [transactions, currentPage]);

  const fetchAllTransactions = () => {
    const queryParams = new URLSearchParams({
      accNo: storedUserData.accNo,
    });

    axios.get(api + "transaction/allTransactions?" + queryParams)
      .then(response => {
        setTransactions(response.data);
        setCurrentPage(1); // Reset to the first page when transactions change
      })
      .catch(error => {
        console.error('Error fetching transactions:', error);
      });
  };

  const fetchFilteredTransactions = () => {
    const queryParams = new URLSearchParams({
      type: transactionTypeFilter,
      date1: startDateFilter,
      date2: endDateFilter,
      accNo: storedUserData.accNo,
    });

    axios.get(api + "transaction/allTransactions?" + queryParams)
      .then(response => {
        setTransactions(response.data);
        setCurrentPage(1); // Reset to the first page when filters change
      })
      .catch(error => {
        console.error('Error fetching filtered transactions:', error);
      });
  };

  const totalPages = Math.ceil(transactions.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="passbook">
      <h1>Transaction History</h1>
      <div className="filters">
    
        <select
          value={transactionTypeFilter}
          onChange={e => setTransactionTypeFilter(e.target.value)}
        >
          <option value="">All Types</option>
          <option value="DEBITED">Debit</option>
          <option value="CREDITED">Credit</option>
        </select>
        <input
          type="date"
          value={startDateFilter}
          onChange={e => setStartDateFilter(e.target.value)}
        />
        <input
          type="date"
          value={endDateFilter}
          onChange={e => setEndDateFilter(e.target.value)}
        />
        <button onClick={fetchFilteredTransactions}>Apply Filters</button>
      </div>
      <table className="transaction-table">
        <thead>
          <tr className="transaction-header">
            <th>ID</th>
            <th>Amount</th>
            <th>Type</th>
            <th>From Account</th>
            <th>To Account</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.map(transaction => (
            <tr key={transaction.transactionID} className="transaction-row">
              <td>{transaction.transactionID}</td>
              <td>{transaction.amount}</td>
              <td>{transaction.transactionType}</td>
              <td>{transaction.fromAccountNumber}</td>
              <td>{transaction.toAccountNumber}</td>
              <td>{transaction.timestamp}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination-container">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={currentPage === index + 1 ? 'pagination-button active' : 'pagination-button'}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Passbook;
