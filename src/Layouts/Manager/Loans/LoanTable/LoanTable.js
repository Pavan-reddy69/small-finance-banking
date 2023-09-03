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
import { TailSpin } from 'react-loader-spinner'; // Import the Loader component

const LoanTable = () => {
  const [pendingLoans, setPendingLoans] = useState([]);
  const [approvedLoans, setApprovedLoans] = useState([]);
  const [rejectedLoans, setRejectedLoans] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(true); // Add loading state
  const storedUserData = JSON.parse(sessionStorage.getItem("userDetails"));

  useEffect(() => {
    const headers = {
      'Authorization': `Bearer ${storedUserData.accessToken}`,
      'ngrok-skip-browser-warning': '69420',
    };
  
    const fetchData = async () => {
      try {
        setLoading(true); // Set loading to true before making the API call

        const pendingResponse = await axios.get(api + 'loan/getAllByStatus?status=UNDER_REVIEW', { headers });
        setPendingLoans(pendingResponse.data);
  
        const approvedResponse = await axios.get(api + 'loan/getAllByStatus?status=APPROVED', { headers });
        setApprovedLoans(approvedResponse.data);
  
        const rejectedResponse = await axios.get(api + 'loan/getAllByStatus?status=REJECTED', { headers });
        setRejectedLoans(rejectedResponse.data);

        setLoading(false); // Set loading to false when the API call is complete
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false); // Set loading to false in case of an error
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
          {loading ? ( 
               <div className='loader-container'>
               <TailSpin
                   type="TailSpin"
                   color="red"
                   height={100}
                   width={150}
               />
           </div>
          ) : pendingLoans.length > 0 ? (
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
                    <TableRow
                      key={loan.loanId}
                      component={Link}
                      to={`/loans/${loan.loanId}`}
                    >
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
          {loading ? null : approvedLoans.concat(rejectedLoans).length > 0 ? (
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
