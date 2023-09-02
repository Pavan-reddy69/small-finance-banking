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
import './EducationTable.css'

const EducationHistoryTable = ({ tableRefresh, refreshTable }) => {
  const [educationHistory, setEducationHistory] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const storedUserData = JSON.parse(sessionStorage.getItem("userDetails"));

  useEffect(() => {
    fetcheducationHistory();
  }, [tableRefresh]);

  const fetcheducationHistory = async () => {
    const headers = {
      'Authorization': `Bearer ${storedUserData.accessToken}`,
      'ngrok-skip-browser-warning': '69420',
    };
  
    try {
      const response = await fetch(api + "loan/getByType?accNo=" + storedUserData.accNo + "&type=EDUCATION_LOAN", {
        headers: headers,
      });
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
      <Table className="custom-font-size-table">
        <TableHead>
          <TableRow>
            <TableCell className="custom-font-size-cell">ID</TableCell>
            <TableCell className="custom-font-size-cell">Applied Date</TableCell>
            <TableCell className="custom-font-size-cell">Amount</TableCell>
            <TableCell className="custom-font-size-cell">Activity Status</TableCell>
            <TableCell className="custom-font-size-cell">Interest</TableCell>
            <TableCell className="custom-font-size-cell">End Date</TableCell>
            <TableCell className="custom-font-size-cell">Monthly Interest</TableCell>
            <TableCell className="custom-font-size-cell">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {displayededucationHistory.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} style={{ textAlign: 'center' }}>No Education Loan Applied</TableCell>
            </TableRow>
          ) : (
            displayededucationHistory.map((education) => (
              <TableRow key={education.loanId} >
                <TableCell className="custom-font-size-cell">{education.loanId}</TableCell>
                <TableCell className="custom-font-size-cell">{education.appliedDate}</TableCell>
                <TableCell className="custom-font-size-cell">{education.loanedAmount}</TableCell>
                <TableCell className="custom-font-size-cell">{education.isActive ? "Active" : "Inactive"}</TableCell>
                <TableCell className="custom-font-size-cell">{education.interest}%</TableCell>
                <TableCell className="custom-font-size-cell">{education.loanEndDate}</TableCell>
                <TableCell className="custom-font-size-cell">{education.monthlyInterestAmount}</TableCell>
                <TableCell className="custom-font-size-cell"><span
                  className={`status-cell ${education.status === "APPROVED" ? "APPROVED" : "REJECTED"
                    }`}
                >
                  {education.status}
                </span></TableCell>
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
