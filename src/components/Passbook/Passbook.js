import React, { useState, useEffect } from 'react';
import './Passbook.css';
import axios from 'axios'; 
import api from '../../Api/api';
import Loader, { TailSpin } from 'react-loader-spinner'; // Import the loader component

const itemsPerPage = 10;
const maxVisiblePages = 5;

function Passbook() {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [transactionTypeFilter, setTransactionTypeFilter] = useState('');
  const [startDateFilter, setStartDateFilter] = useState('');
  const [endDateFilter, setEndDateFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false); // Add a loading state
  const storedUserData = JSON.parse(sessionStorage.getItem("userDetails"));
 
  useEffect(() => {
    fetchFilteredTransactions();
  }, [currentPage, transactionTypeFilter, startDateFilter, endDateFilter]);

  const fetchFilteredTransactions = () => {
    setLoading(true); // Set loading to true before making the API call

    const queryParams = new URLSearchParams({
      type: transactionTypeFilter,
      date1: startDateFilter,
      date2: endDateFilter,
      accNo: storedUserData.accNo,
    });
  
    const headers = {
      headers: {
        'Authorization': `Bearer ${storedUserData.accessToken}`,
        'ngrok-skip-browser-warning': '69420',
      },
    };
  
    axios.get(api + "transaction/allTransactions?" + queryParams, headers)
      .then(response => {
        setTransactions(response.data);
      })
      .catch(error => {
        console.error('Error fetching transactions:', error);
      })
      .finally(() => {
        setLoading(false); // Set loading to false after the API call is complete
      });
  };

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setFilteredTransactions(transactions.slice(startIndex, endIndex));
  }, [transactions, currentPage]);

  const totalPages = Math.ceil(transactions.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const visiblePages = [];

  for (let i = Math.max(currentPage - Math.floor(maxVisiblePages / 2), 1); i <= Math.min(currentPage + Math.floor(maxVisiblePages / 2), totalPages); i++) {
    visiblePages.push(i);
  }

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
      </div>
      {loading ? ( // Render the loader when loading is true
        <div className="loader-container">
          <TailSpin
            type="TailSpin"
            color="red"
            height={100}
            width={150}
          />
        </div>
      ) : (
        filteredTransactions.length === 0 ? (
          <p className="no-history-message" colSpan={7}>No transfer history available</p>
        ) : (
          <table className="transaction-table">
            <thead>
              <tr className="transaction-header">
                <th>ID</th>
                <th>Amount</th>
                <th>Details</th>
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
                  <td>{transaction.whichTransaction}</td>
                  <td>{transaction.fromAccountNumber}</td>
                  <td>{transaction.toAccountNumber}</td>
                  <td>{transaction.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )
      )}
      <div className="pagination-container">
        {visiblePages.map(pageNumber => (
          <button
            key={pageNumber}
            className={currentPage === pageNumber ? 'pagination-button active' : 'pagination-button'}
            onClick={() => handlePageChange(pageNumber)}
          >
            {pageNumber}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Passbook;
