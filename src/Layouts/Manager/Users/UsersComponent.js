import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import './UsersComponent.css';

const columns = [
  { field: 'id', headerName: 'Account Number', flex: 1 },
  { field: 'name', headerName: 'Name', flex: 1 },
  { field: 'balance', headerName: 'Balance', flex: 1 },
];

const UsersComponent = () => {
  const [users, setUsers] = useState([]);
  const [selectedUserIds, setSelectedUserIds] = useState([]);

  useEffect(() => {
    // Fetch user data from the API
    axios.get('https://api.example.com/users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  const handleDeleteUsers = () => {
    const updatedUsers = users.filter(user => !selectedUserIds.includes(user.id));
    setUsers(updatedUsers);

    // TODO: Send updated user list to the API using axios.post or axios.put
    // Example: axios.post('https://api.example.com/updateUsers', updatedUsers);

    setSelectedUserIds([]);
  };

  return (
    <div className="users-container">
      <h2>Users</h2>
      {users.length === 0 ? (
        <p>No users available.</p>
      ) : (
        <div className="datagrid-container">
          <DataGrid
            rows={users}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5, 10, 20]}
            pagination
            autoHeight
            checkboxSelection
            onSelectionModelChange={(selection) => setSelectedUserIds(selection)}
          />
          {selectedUserIds.length > 0 && (
            <button className="delete-button" onClick={handleDeleteUsers}>
              Delete Selected Users
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default UsersComponent;
