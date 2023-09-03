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

const HomeHistoryTable = ({ tablRefresh, refreshTable }) => {
  const [homeHistory, setHomeHistory] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(false); // Add a loading state
  const storedUserData = JSON.parse(sessionStorage.getItem("userDetails"));

  useEffect(() => {
    fetchHomeHistory();
  }, [tablRefresh]);

  const fetchHomeHistory = async () => {
    const headers = {
      'Authorization': `Bearer ${storedUserData.accessToken}`,
      'ngrok-skip-browser-warning': '69420',
    };

    try {
      setLoading(true); // Set loading to true before making the API call

      const response = await fetch(api + "loan/getByType?accNo=" + storedUserData.accNo + "&type=HOME_LOAN", {
        headers: headers,
      });
      const data = await response.json();
      setHomeHistory(data);
    } catch (error) {
      console.error("Error fetching Home history:", error);
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

  const displayedHomeHistory = homeHistory.slice(
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
