import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination
} from '@mui/material';
import './LoanTable.css';

const LoanTable = () => {
  const [pendingLoans, setPendingLoans] = useState([]);
  const [approvedLoans, setApprovedLoans] = useState([]);
  const [rejectedLoans, setRejectedLoans] = useState([]);
  const itemsPerPage = 5;
  const [currentPagePending, setCurrentPagePending] = useState(0);
  const [currentPageApproved, setCurrentPageApproved] = useState(0);

  useEffect(() => {
    // Fetch pending loans from API and update the state
    // Fetch approved loans from API and update the state
    // Fetch rejected loans from API and update the state
  }, []);

  const handlePageChangePending = (_, newPage) => {
    setCurrentPagePending(newPage);
  };

  const handlePageChangeApproved = (_, newPage) => {
    setCurrentPageApproved(newPage);
  };

  const getLoansForPage = (loans, currentPage) => {
    const startIndex = currentPage * itemsPerPage;
    return loans.slice(startIndex, startIndex + itemsPerPage);
  };

  return (
    <div className="loan-admin">
      <div className="loan-container">
        <h2>Pending Loans</h2>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Loan ID</TableCell>
                <TableCell>Account Number</TableCell>
                <TableCell>Loan Type</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Tenure</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {getLoansForPage(pendingLoans, currentPagePending).map(loan => (
                <TableRow key={loan.loanId}>
                  <TableCell>{loan.loanId}</TableCell>
                  <TableCell>{loan.accountNumber}</TableCell>
                  <TableCell>{loan.loanType}</TableCell>
                  <TableCell>{loan.amount}</TableCell>
                  <TableCell>{loan.tenure}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[itemsPerPage]}
            component="div"
            count={pendingLoans.length}
            page={currentPagePending}
            onPageChange={handlePageChangePending}
          />
        </TableContainer>
      </div>

      <div className="loan-container">
        <h2>Approved/Rejected Loans</h2>
        <TableContainer component={Paper}>
          {/* Render your approved and rejected loans here */}
          <TablePagination
            rowsPerPageOptions={[itemsPerPage]}
            component="div"
            count={approvedLoans.length + rejectedLoans.length}
            page={currentPageApproved}
            onPageChange={handlePageChangeApproved}
          />
        </TableContainer>
      </div>
    </div>
  );
};

export default LoanTable;
