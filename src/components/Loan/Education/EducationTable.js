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

const EducationHistoryTable = ({ tableRefresh, refreshTable }) => {
  const [educationHistory, setEducationHistory] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const storedUserData = JSON.parse(localStorage.getItem("userDetails"));

  useEffect(() => {
    fetcheducationHistory(); 
  }, [tableRefresh]);
  
    const fetcheducationHistory = async () => {
      try {
        const response = await fetch(api + "loan/getByType?accNo=" + storedUserData.accNo +"&type=EDUCATION_LOAN");
        const data = await response.json();
        setEducationHistory(data);
      } catch (error) {
        console.error("Error fetching education history:", error);
      }
    };

  

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const displayededucationHistory = educationHistory.slice(
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
          {displayededucationHistory.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} style={{textAlign:'center'}}>No Education Loan Applied</TableCell>
            </TableRow>
          ) : (
            displayededucationHistory.map((education) => (
              <TableRow key={education.loanId}>
                <TableCell>{education.loanId}</TableCell>
                <TableCell>{education.appliedDate}</TableCell>
                <TableCell>{education.loanedAmount}</TableCell>
                <TableCell>{education.isActive ? "Active" : "Inactive"}</TableCell>
                <TableCell>{education.interest}%</TableCell>
                <TableCell>{education.loanEndDate}</TableCell>
                <TableCell>{education.monthlyInterestAmount}</TableCell>
                <TableCell>{education.status}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={educationHistory.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};

export default EducationHistoryTable;
