import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import './UsersComponent.css';
import api from '../../../Api/api';
import {TailSpin} from 'react-loader-spinner'; // Import the Loader component
import { CleaningServices } from '@mui/icons-material';

const columns = [
  { field: 'accountNumber', headerName: 'Account Number', flex: 1 }, 
  { field: 'userId', headerName: 'User ID', flex: 1 },
  { field: 'firstName', headerName: 'First Name', flex: 1 },
  { field: 'lastName', headerName: 'Last Name', flex: 1 },
  { field: 'panCardNumber', headerName: 'PAN Card', flex: 1 },
  {
    field: 'kyc',
    headerName: 'KYC Status',
    flex: 1,
    renderCell: (params) => {
      const status = params.value;
      const statusClass = status ? 'approved' : 'pending';
      return (
        <div className={`kyc-status ${statusClass}`}>
          {status ? 'Approved' : 'Pending'}
        </div>
      );
    },
  },
];

const UsersComponent = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); // Add a loading state and set it to true initially
  const storedUserDetails =  JSON.parse(sessionStorage.getItem("userDetails"))

  const generateUniqueId = () => {
    return Math.random().toString(36).substr(2, 9); 
  };
  
  useEffect(() => {
    const headers = {
      'Authorization': `Bearer ${storedUserDetails.accessToken}`,
      'ngrok-skip-browser-warning': '69420',
    };
    
    axios.get(api + 'user/getAll', { headers })
      .then(response => {
        const usersWithIds = response.data.map(user => ({ ...user, id: generateUniqueId() }));
        setUsers(usersWithIds);
        setLoading(false); 
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
        setLoading(false);
      });
  }, []);
  

  const handleRowClick = (params) => {
    const userId = params.row.userId;
    window.location.href = `/admin-home/${userId}`; 
  };

  return (
    <div className="users-container">
      <h2>Users List</h2>
      {loading ? ( // Render the Loader component while loading is true
          <div className='loader-container'>
          <TailSpin
            type="TailSpin"
            color="red"
            height={100}
            width={150}
          />
        </div>
      ) : (
        users.length === 0 ? (
          <p>No users available.</p>
        ) : (
          <div className="datagrid-container">
            <DataGrid
              rows={users}
              columns={columns}
              pageSize={10} 
              pagination
              autoHeight
              onRowClick={handleRowClick} 
            />
          </div>
        )
      )}
    </div>
  );
};

export default UsersComponent;
