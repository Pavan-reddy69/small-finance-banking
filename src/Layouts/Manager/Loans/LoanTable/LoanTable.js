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
import api from '../../../../Api/api';
import axios from 'axios';
import { Link } from 'react-router-dom';

const LoanTable = () => {
  const [pendingLoans, setPendingLoans] = useState([]);
  const [approvedLoans, setApprovedLoans] = useState([]);
  const [rejectedLoans, setRejectedLoans] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  
  const [currentPagePending, setCurrentPagePending] = useState(0);
  const [currentPageApproved, setCurrentPageApproved] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pendingResponse = await axios.get(api + 'loan/getAllByStatus?status=UNDER_REVIEW');
        setPendingLoans(pendingResponse.data);

        const approvedResponse = await axios.get(api + 'loan/getAllByStatus?status=APPROVED');
        setApprovedLoans(approvedResponse.data);

        const rejectedResponse = await axios.get(api + 'loan/getAllByStatus?status=REJECTED');
        setRejectedLoans(rejectedResponse.data);
      } catch (error) {
        // Handle error here
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const getStatusClassName = (status) => {
    if (status === 'APPROVED') {
      return 'status-approved';
    } else if (status === 'REJECTED') {
      return 'status-rejected';
    }
    return 'status-pending';
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };



  const getLoansForPage = (loans, currentPage) => {
    const startIndex = currentPage * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    return loans.slice(startIndex, endIndex);
  };

  return (
    <div className="loan-admin">
      <div className="loan-container">
        <h2>Pending Loans</h2>
        <div className="table-container">
          {pendingLoans.length > 0 ? (
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
                  {getLoansForPage(pendingLoans, page).map(loan => (
                    <TableRow key={loan.loanId}
                    component={Link} 
                    to={`/loans/${loan.loanId}`}>
                      <TableCell>{loan.loanId}</TableCell>
                      <TableCell>{loan.accountNumber}</TableCell>
                      <TableCell>{loan.typeOfLoan}</TableCell>
                      <TableCell>{loan.loanedAmount}</TableCell>
                      <TableCell>{loan.tenure}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <TablePagination
                
                component="div"
                count={pendingLoans.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
           
              />
            </TableContainer>
          ) : (
            <p className="no-data">No pending loans</p>
          )}
        </div>
      </div>

      <div className="loan-container">
        <h2>Loan History</h2>
        <div className="table-container">
          {approvedLoans.concat(rejectedLoans).length > 0 ? (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Loan ID</TableCell>
                    <TableCell>Account Number</TableCell>
                    <TableCell>Loan Type</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Tenure</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {getLoansForPage(approvedLoans.concat(rejectedLoans), page).map(loan => (
                    <TableRow key={loan.loanId}>
                      <TableCell>{loan.loanId}</TableCell>
                      <TableCell>{loan.accountNumber}</TableCell>
                      <TableCell>{loan.typeOfLoan}</TableCell>
                      <TableCell>{loan.loanedAmount}</TableCell>
                      <TableCell>{loan.tenure}</TableCell>
                      <TableCell>
                        <div className={`status-box ${getStatusClassName(loan.status)}`}>
                          {loan.status}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <TablePagination
                
                component="div"
                count={approvedLoans.length + rejectedLoans.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableContainer>
          ) : (
            <p className="no-data">No approved or rejected loans</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoanTable;
