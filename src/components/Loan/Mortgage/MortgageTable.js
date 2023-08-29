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

const PersonalHistoryTable = ({ tableRefresh, refreshTable }) => {
  const [personalHistory, setPersonalHistory] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const storedUserData = JSON.parse(localStorage.getItem("userDetails"));

  useEffect(() => {
    fetchPersonalHistory(); 
  }, [tableRefresh]);

  
    const fetchPersonalHistory = async () => {
      try {
        const response = await fetch(api + "loan/getByType?accNo=" + storedUserData.accNo +"&type=PERSONAL_LOAN");;
        const data = await response.json();
        setPersonalHistory(data);
      } catch (error) {
        console.error("Error fetching Personal history:", error);
      }
    };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const displayedPersonalHistory = personalHistory.slice(
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
          {displayedPersonalHistory.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} style={{textAlign:'center'}}>No Personal Loan Applied</TableCell>
            </TableRow>
          ) : (
            displayedPersonalHistory.map((personal) => (
              <TableRow key={personal.loanId}>
                <TableCell>{personal.loanId}</TableCell>
                <TableCell>{personal.appliedDate}</TableCell>
                <TableCell>{personal.loanedAmount}</TableCell>
                <TableCell>{personal.isActive ? "Active" : "Inactive"}</TableCell>
                <TableCell>{personal.interest}%</TableCell>
                <TableCell>{personal.loanEndDate}</TableCell>
                <TableCell>{personal.monthlyInterestAmount}</TableCell>
                <TableCell>{personal.status}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={personalHistory.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );  
};

export default PersonalHistoryTable;
