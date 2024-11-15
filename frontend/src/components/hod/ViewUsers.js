import React, { useState, useEffect } from "react";
import axios from "axios";

const ViewUsers = () => {
  const [users, setUsers] = useState([]);
  const [roleFilter, setRoleFilter] = useState("student"); // Default to "Student"
  const [isViewModalOpen, setViewModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Fetch users from the backend based on the selected role
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const roleEndpoint = roleFilter.toLowerCase();
        const response = await axios.get(`http://localhost:5000/api/v1/${roleEndpoint}/getall`);
        setUsers(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    
    fetchUsers();
  }, [roleFilter]);

  const handleView = (user) => {
    setSelectedUser(user);
    setViewModalOpen(true);
  };

  const handleDelete = async (userId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (confirmDelete) {
      try {
        await axios.delete(`/api/users/${userId}`);
        setUsers(users.filter((user) => user.id !== userId));
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  const handleModalClose = () => {
    setSelectedUser(null);
    setViewModalOpen(false);
  };

  return (
    <div className="flex flex-col items-center p-4 min-h-screen bg-gray-100 mt-16">
    <h2 className="text-3xl font-semibold text-center text-indigo-700 mb-6">View Users</h2>

      {/* Role Filter */}
      <div className="mb-4 w-full max-w-md">
        <label className="block text-sm font-medium text-gray-700">Filter by Role</label>
        <select
          className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
        >
          <option value="student">Student</option>
          <option value="admin">Admin</option>
          <option value="faculty">Faculty</option>
          <option value="nonTeachingStaff">Non-Teaching Staff</option>
          <option value="hod">HOD</option>
        </select>
      </div>

      {/* Users Table */}
      <table className="w-full max-w-4xl bg-white rounded-xl shadow-lg overflow-hidden">
        <thead className="bg-indigo-500 text-white">
          <tr>
            <th className="py-2 px-4">Id</th>
            <th className="py-2 px-4">Name</th>
            <th className="py-2 px-4">Email</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-t text-center">
              <td className="py-2 px-4">{user.ID}</td>
              <td className="py-2 px-4">{user.name}</td>
              <td className="py-2 px-4">{user.email}</td>
              <td className="py-2 px-4 text-center">
                <div className="flex justify-center space-x-2">
                  <button
                    onClick={() => handleView(user)}
                    className="px-4 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="px-4 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </td>

            </tr>
          ))}
        </tbody>
      </table>

      {/* View Modal */}
      {isViewModalOpen && selectedUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="w-full max-w-lg bg-white rounded-xl p-6 shadow-lg relative bg-gradient-to-l from-gray-200 to-gray-400">
            <button
              onClick={handleModalClose}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              &times;
            </button>
            <h3 className="text-xl font-semibold mb-4">{selectedUser.ID}</h3>

            {/* Profile Image */}
            <div className="flex items-center justify-center mb-4">
              <img
                src={selectedUser.profileImage}
                alt="Profile"
                className="w-24 h-24 rounded-full border border-gray-300"
              />
            </div>

            {/* User Details */}
            <div className="mb-4 flex items-center space-x-2">
              <p className="text-sm font-medium text-gray-700">Name:</p>
              <p className="text-lg">{selectedUser.name}</p>
            </div>
            <div className="mb-4 flex items-center space-x-2">
              <p className="text-sm font-medium text-gray-700">Email:</p>
              <p className="text-lg">{selectedUser.email}</p>
            </div>
            {(roleFilter === "faculty" || roleFilter === 'nonTeachingStaff' || roleFilter==='student') && (
              <div className="mb-4 flex items-center space-x-2">
                <p className="text-sm font-medium text-gray-700">Mobile:</p>
                <p className="text-lg">{selectedUser.mobile}</p>
              </div>
            )}
            {roleFilter==='student' && (
              <>
              <div className="mb-4 flex items-center space-x-2">
                <p className="text-sm font-medium text-gray-700">Studying:</p>
                <p className="text-lg">{selectedUser.year} SEM{selectedUser.sem}</p>
              </div>
              <div className="mb-4 flex items-center space-x-2">
                <p className="text-sm font-medium text-gray-700">Attendance:</p>
                <p className="text-lg">{selectedUser.attendance}</p>
              </div>
              <div className="mb-4 flex items-center space-x-2">
                <p className="text-sm font-medium text-gray-700">BloodGroup:</p>
                <p className="text-lg">{selectedUser.bloodGroup}</p>
              </div>
              </>
            )}
            {(roleFilter === "faculty" || roleFilter === 'hod') && (
              <div className="mb-4 flex items-center space-x-2">
                <p className="text-sm font-medium text-gray-700">Education:</p>
                <p className="text-lg">{selectedUser.education }</p>
              </div>
            )}
            {roleFilter === "faculty" && (
              <div className="mb-4 flex items-center space-x-2">
              <p className="text-sm font-medium text-gray-700">Assigned Classes:</p>
              <p className="text-lg">{selectedUser.assignedClasses }</p>
            </div>
            )}
            

            <button
              onClick={handleModalClose}
              className="w-full py-2 mt-4 font-semibold text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewUsers;