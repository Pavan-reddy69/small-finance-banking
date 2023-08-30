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
import api from "../../../Api/api";


const HomeHistoryTable = ({ tablRefresh, refreshTable }) => {
  const [homeHistory, setHomeHistory] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const storedUserData = JSON.parse(localStorage.getItem("userDetails"));


  useEffect(() => {
    fetchHomeHistory(); 
  }, [tablRefresh]);

  const fetchHomeHistory = async () => {
    try {
      const response = await fetch(api + "loan/getByType?accNo=" + storedUserData.accNo + "&type=HOME_LOAN");
      const data = await response.json();
      setHomeHistory(data);
    } catch (error) {
      console.error("Error fetching Home history:", error);
    }
  };



  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const displayedHomeHistory = homeHistory.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box textAlign="center">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Applied Date</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Activity Status</TableCell>
            <TableCell>Interest</TableCell>
            <TableCell>End Date</TableCell>
            <TableCell>Monthly Interest</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {displayedHomeHistory.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} style={{ textAlign: 'center' }}>No Home Loan Applied</TableCell>
            </TableRow>
          ) : (
            displayedHomeHistory.map((home) => (
              <TableRow key={home.loanId}>
                <TableCell>{home.loanId}</TableCell>
                <TableCell>{home.appliedDate}</TableCell>
                <TableCell>{home.loanedAmount}</TableCell>
                <TableCell>{home.isActive ? "Active" : "Inactive"}</TableCell>
                <TableCell>{home.interest}%</TableCell>
                <TableCell>{home.loanEndDate}</TableCell>
                <TableCell>{home.monthlyInterestAmount}</TableCell>
                <TableCell>{home.status}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={homeHistory.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};

export default HomeHistoryTable;
