import React, { useState } from "react";

const ViewUsers = () => {
  const [roleFilter, setRoleFilter] = useState("");
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const users = [
    { id: 1, name: "John Doe", role: "Admin", email: "john@example.com", profileImage: "https://via.placeholder.com/100" },
    { id: 2, name: "Jane Smith", role: "Student", email: "jane@example.com", profileImage: "https://via.placeholder.com/100" },
    // More user data here...
  ];

  const filteredUsers = roleFilter ? users.filter((user) => user.role === roleFilter) : users;

  const handleEdit = (user) => {
    setSelectedUser(user);
    setEditModalOpen(true);
  };

  const handleDelete = (userId) => {
    // Implement delete functionality
    alert(`Deleted user with ID: ${userId}`);
  };

  const handleModalClose = () => {
    setSelectedUser(null);
    setEditModalOpen(false);
  };

  return (
    <div className="flex flex-col items-center p-4 min-h-screen bg-gray-100">
      <h2 className="text-2xl font-bold text-indigo-700 mb-6">View Users</h2>

      {/* Role Filter */}
      <div className="mb-4 w-full max-w-md">
        <label className="block text-sm font-medium text-gray-700">Filter by Role</label>
        <select
          className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
        >
          <option value="">All Roles</option>
          <option value="Admin">Admin</option>
          <option value="Faculty">Faculty</option>
          <option value="Student">Student</option>
          <option value="NonTeachingStaff">Non-Teaching Staff</option>
          <option value="HOD">HOD</option>
        </select>
      </div>

      {/* Users Table */}
      <table className="w-full max-w-4xl bg-white rounded-xl shadow-lg overflow-hidden">
        <thead className="bg-indigo-500 text-white">
          <tr>
            <th className="py-2 px-4">Name</th>
            <th className="py-2 px-4">Email</th>
            <th className="py-2 px-4">Role</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id} className="border-t">
              <td className="py-2 px-4">{user.name}</td>
              <td className="py-2 px-4">{user.email}</td>
              <td className="py-2 px-4">{user.role}</td>
              <td className="py-2 px-4 flex space-x-2">
                <button
                  onClick={() => handleEdit(user)}
                  className="px-4 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(user.id)}
                  className="px-4 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Modal */}
      {isEditModalOpen && selectedUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="w-full max-w-lg bg-white rounded-xl p-6 shadow-lg relative">
            <button
              onClick={handleModalClose}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              &times;
            </button>
            <h3 className="text-xl font-semibold mb-4">Edit User</h3>
            
            {/* Profile Image */}
            <div className="flex items-center justify-center mb-4">
              <img
                src={selectedUser.profileImage}
                alt="Profile"
                className="w-24 h-24 rounded-full border border-gray-300"
              />
            </div>

            <form>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  value={selectedUser.name}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500"
                  onChange={(e) => setSelectedUser({ ...selectedUser, name: e.target.value })}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  value={selectedUser.email}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500"
                  onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Role</label>
                <select
                  value={selectedUser.role}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500"
                  onChange={(e) => setSelectedUser({ ...selectedUser, role: e.target.value })}
                >
                  <option value="Admin">Admin</option>
                  <option value="Faculty">Faculty</option>
                  <option value="Student">Student</option>
                  <option value="NonTeachingStaff">Non-Teaching Staff</option>
                  <option value="HOD">HOD</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full py-2 mt-4 font-semibold text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewUsers;