import React, { useEffect, useState } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
  Box
} from "@mui/material";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import api from "../../Api/api";
import DepositDetailsPage from './DepositDetailsPage';

const DepositHistoryTable = () => {
  const navigate = useNavigate();
  const [depositHistory, setDepositHistory] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const storedUserData = JSON.parse(sessionStorage.getItem("userDetails"));

  useEffect(() => {
    const fetchDepositHistory = async () => {
      try {
        const response = await fetch(api + "deposit/get?accNo=" + storedUserData.accNo);
        const data = await response.json();
        setDepositHistory(data);
      } catch (error) {
        console.error("Error fetching deposit history:", error);
      }
    };

    fetchDepositHistory();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const displayedDepositHistory = depositHistory.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleRowClick = (depositId, isRid) => {
    if (isRid) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No More Details of Recurring Deposit',
      });
    } else {
      navigate(`/deposit/${depositId}`);
    }
  };
  return (
    <Box textAlign="center">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Interest</TableCell>
            <TableCell>Maturity Date</TableCell>
            <TableCell>Final Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {displayedDepositHistory.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} style={{ textAlign: 'center' }}>No deposit history available</TableCell>
            </TableRow>
          ) : (
            displayedDepositHistory.map((deposit) => (
              <TableRow
                key={deposit.fdId}
                onClick={() => handleRowClick(deposit.fdId || deposit.rid, !!deposit.rid)}
                style={{ cursor: "pointer" }} 
              >
                <TableCell>{deposit.fdId || deposit.rid}</TableCell>
                <TableCell>{deposit.amount ? deposit.amount : deposit.monthlyPaidAmount}</TableCell>
                <TableCell>{deposit.interestRate ? deposit.interestRate : deposit.interest}%</TableCell>
                <TableCell>{deposit.maturityDate}</TableCell>
                <TableCell>{deposit.totalAmount ? deposit.totalAmount : deposit.maturityAmount}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={depositHistory.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};

export default DepositHistoryTable;
