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
import Loader, { TailSpin } from 'react-loader-spinner'; // Import the Loader component

const PersonalHistoryTable = ({ tableRefresh, refreshTable }) => {
  const [personalHistory, setPersonalHistory] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(false); // Add a loading state
  const storedUserData = JSON.parse(sessionStorage.getItem("userDetails"));

  useEffect(() => {
    fetchPersonalHistory();
  }, [tableRefresh]);

  const fetchPersonalHistory = async () => {
    const headers = {
      'Authorization': `Bearer ${storedUserData.accessToken}`,
      'ngrok-skip-browser-warning': '69420',
    };

    try {
      setLoading(true); // Set loading to true before making the API call

      const response = await fetch(api + "loan/getByType?accNo=" + storedUserData.accNo + "&type=PERSONAL_LOAN", {
        headers: headers,
      });
      const data = await response.json();
      setPersonalHistory(data);
    } catch (error) {
      console.error("Error fetching Personal history:", error);
    } finally {
      setLoading(false); // Set loading to false after the API call is complete
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
      {loading && (
        <div className='loader-container'>
          <TailSpin
            type="TailSpin"
            color="red"
            height={100}
            width={150}
          />
        </div>
      )}
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
              <TableCell colSpan={8} style={{ textAlign: 'center' }}>No Personal Loan Applied</TableCell>
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
