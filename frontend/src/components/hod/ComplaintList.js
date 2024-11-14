// ComplaintList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Select, MenuItem, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

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
            <MenuItem value="Filed">Filed</MenuItem>
            <MenuItem value="In Progress">In Progress</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
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
                          complaint.status === 'Completed' ? 'bg-green-100 text-green-800' :
                          complaint.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}
                      >
                        {complaint.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-gray-500 py-6">
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