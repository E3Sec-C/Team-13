import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, MenuItem, Select } from '@mui/material';

const ComplaintList = () => {
  const [complaints, setComplaints] = useState([]);
  const [filteredComplaints, setFilteredComplaints] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    // Fetch complaints from the backend
    const fetchComplaints = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/v1/complaint/getall');
        setComplaints(response.data);
        setFilteredComplaints(response.data); // Initialize with all complaints
      } catch (error) {
        console.error("Error fetching complaints:", error);
      }
    };

    fetchComplaints();
  }, []);

  const handleFilterChange = (e) => {
    setStatusFilter(e.target.value);
  };

  const handleSearch = () => {
    const filtered = complaints.filter(complaint => 
      statusFilter === '' || complaint.status === statusFilter
    );
    setFilteredComplaints(filtered);
  };

  const upgradeStatus = async (id, currentStatus) => {
    let updatedStatus = '';
    if (currentStatus === 'filed') {
      updatedStatus = 'pending';
    } else if (currentStatus === 'pending') {
      updatedStatus = 'completed';
    }

    try {
      await axios.put(`http://localhost:5000/api/v1/complaint/update/${id}`, { status: updatedStatus });
      // Update the complaint list after successful update
      setComplaints(prevComplaints =>
        prevComplaints.map(complaint =>
          complaint.ID === id ? { ...complaint, status: updatedStatus } : complaint
        )
      );
      setFilteredComplaints(prevFiltered =>
        prevFiltered.map(complaint =>
          complaint.ID === id ? { ...complaint, status: updatedStatus } : complaint
        )
      );
    } catch (error) {
      console.error("Error updating complaint status:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center w-11/12 mx-auto mt-16">
      <div className="w-full max-w-7xl mb-8">
        <h2 className="text-3xl font-semibold text-center text-indigo-700 mb-6">Complaint Management</h2>

        {/* Filter Section */}
        <div className="flex justify-between items-center gap-4 mb-6">
          <Select
            value={statusFilter}
            onChange={handleFilterChange}
            displayEmpty
            className="bg-white"
            sx={{ minWidth: 200 }}
          >
            <MenuItem value=""><em>All Statuses</em></MenuItem>
            <MenuItem value="filed">Filed</MenuItem>
            <MenuItem value="pending">In Progress</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
          </Select>

          <Button
            variant="contained"
            color="primary"
            onClick={handleSearch}
            className="bg-indigo-500 hover:bg-indigo-600 text-white"
          >
            Search
          </Button>
        </div>

        {/* Complaints Table */}
        <TableContainer component={Paper} className="shadow-lg rounded-lg overflow-x-auto w-full max-auto">
          <Table className="w-full table-auto">
            <TableHead className="bg-gradient-to-r from-indigo-500 to-blue-600">
              <TableRow>
                <TableCell className="text-white font-semibold">Complaint #</TableCell>
                <TableCell className="text-white font-semibold">User ID</TableCell>
                <TableCell className="text-white font-semibold">Role</TableCell>
                <TableCell className="text-white font-semibold w-3/5">Description</TableCell>
                <TableCell className="text-white font-semibold">Status</TableCell>
                <TableCell className="text-white font-semibold">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredComplaints.length > 0 ? (
                filteredComplaints.map((complaint, index) => (
                  <TableRow key={index} className="hover:bg-gray-100">
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{complaint.ID}</TableCell>
                    <TableCell>{complaint.role}</TableCell>
                    <TableCell className="whitespace-normal break-words max-w-xs">
                      {complaint.description}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          complaint.status === 'completed' ? 'bg-green-100 text-green-800' :
                          complaint.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}
                      >
                        {complaint.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      {(complaint.status === 'filed' || complaint.status === 'pending') && (
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => upgradeStatus(complaint.ID, complaint.status)}
                          className="bg-blue-500 hover:bg-blue-600 text-white text-[10px] px-1.5 py-0.5 rounded-sm"
                        >
                          {complaint.status === 'filed' ? 'Mark as Pending' : 'Mark as Completed'}
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-gray-500 py-6">
                    No complaints found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default ComplaintList;