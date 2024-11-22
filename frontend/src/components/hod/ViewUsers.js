import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
  IconButton,
  Box,
  Avatar,
  Grid,
  Container,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {useDispatch} from "react-redux";
import {setSnackBar} from "../../store/features/snackbar/snackbar";

const ViewUsers = () => {
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const [roleFilter, setRoleFilter] = useState("student");
  const [isViewModalOpen, setViewModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

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

  const openDeleteConfirm = (userId) => {
    setUserToDelete(userId);
    setDeleteConfirmOpen(true);
  };

  const handleDelete = async () => {
    try {
      const roleEndpoint = roleFilter.toLowerCase();
      await axios.delete(`http://localhost:5000/api/v1/${roleEndpoint}/delete/${userToDelete}`);
      setUsers(users.filter((user) => user.ID !== userToDelete));
      dispatch(setSnackBar({ message: 'User deleted successfully',variant:"success" }));
    } catch (error) {
      console.error("Error deleting user:", error);
      dispatch(setSnackBar({ message: 'Failed to delete user',variant:"error" }));
    } finally {
      setDeleteConfirmOpen(false);
      setUserToDelete(null);
    }
  };

  const handleModalClose = () => {
    setSelectedUser(null);
    setViewModalOpen(false);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 10, mb: 4 }}>
      <Typography variant="h4" component="h2" gutterBottom color="primary" align="center" sx={{ mb: 4 }}>
        View Users
      </Typography>

      {/* Role Filter */}
      <Box sx={{ maxWidth: 400, mx: "auto", mb: 4 }}>
        <FormControl fullWidth>
          <InputLabel id="role-filter-label">Filter by Role</InputLabel>
          <Select
            labelId="role-filter-label"
            value={roleFilter}
            label="Filter by Role"
            onChange={(e) => setRoleFilter(e.target.value)}
          >
            <MenuItem value="student">Student</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="faculty">Faculty</MenuItem>
            <MenuItem value="nonTeachingStaff">Non-Teaching Staff</MenuItem>
            <MenuItem value="hod">HOD</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Users Table */}
      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "primary.main" }}>
              <TableCell sx={{ color: "white" }}>Id</TableCell>
              <TableCell sx={{ color: "white" }}>Name</TableCell>
              <TableCell sx={{ color: "white" }}>Email</TableCell>
              <TableCell sx={{ color: "white" }} align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users && users.map((user) => (
              <TableRow key={user.id} hover>
                <TableCell>{user.ID}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell align="center">
                  <Box sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
                    <Button
                      variant="contained"
                      color="info"
                      startIcon={<VisibilityIcon />}
                      onClick={() => handleView(user)}
                      size="small"
                    >
                      View
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      startIcon={<DeleteIcon />}
                      onClick={() => openDeleteConfirm(user.ID)}
                      size="small"
                    >
                      Delete
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
            {users.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No users found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* View Modal */}
      <Dialog
        open={isViewModalOpen}
        onClose={handleModalClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          User Details
          <IconButton
            aria-label="close"
            onClick={handleModalClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        {selectedUser && (
          <DialogContent>
            <Box sx={{ textAlign: "center", mb: 3 }}>
              <Avatar
                src={`http://localhost:5000/api/v1/${roleFilter}/image/${selectedUser.ID}/${roleFilter}`}
                sx={{ width: 100, height: 100, mx: "auto", mb: 2 }}
              />
              <Typography variant="h6">{selectedUser.ID}</Typography>
            </Box>
            
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="subtitle1" color="text.secondary">
                  Name: <Box component="span" sx={{ color: "text.primary" }}>{selectedUser.name}</Box>
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1" color="text.secondary">
                  Email: <Box component="span" sx={{ color: "text.primary" }}>{selectedUser.email}</Box>
                </Typography>
              </Grid>
              {(roleFilter === "faculty" || roleFilter === 'nonTeachingStaff' || roleFilter==='student') && (
                <Grid item xs={12}>
                  <Typography variant="subtitle1" color="text.secondary">
                    Mobile: <Box component="span" sx={{ color: "text.primary" }}>{selectedUser.mobile}</Box>
                  </Typography>
                </Grid>
              )}
              {roleFilter==='student' && (
                <>
                  <Grid item xs={12}>
                    <Typography variant="subtitle1" color="text.secondary">
                      Studying: <Box component="span" sx={{ color: "text.primary" }}>{selectedUser.year} SEM{selectedUser.sem}</Box>
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="subtitle1" color="text.secondary">
                      Attendance: <Box component="span" sx={{ color: "text.primary" }}>{selectedUser.attendance}</Box>
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="subtitle1" color="text.secondary">
                      BloodGroup: <Box component="span" sx={{ color: "text.primary" }}>{selectedUser.bloodGroup}</Box>
                    </Typography>
                  </Grid>
                </>
              )}
              {(roleFilter === "faculty" || roleFilter === 'hod') && (
                <Grid item xs={12}>
                  <Typography variant="subtitle1" color="text.secondary">
                    Education: <Box component="span" sx={{ color: "text.primary" }}>{selectedUser.education }</Box>
                  </Typography>
                </Grid>
              )}
              {roleFilter === "faculty" && (
                <Grid item xs={12}>
                  <Typography variant="subtitle1" color="text.secondary">
                    Assigned Classes: <Box component="span" sx={{ color: "text.primary" }}>{selectedUser.assignedClasses }</Box>
                  </Typography>
                </Grid>
              )}
            </Grid>
          </DialogContent>
        )}
        <DialogActions>
          <Button onClick={handleModalClose} variant="contained" fullWidth>
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle id="delete-dialog-title">
          Confirm Delete
        </DialogTitle>
        <DialogContent>
          <Typography id="delete-dialog-description">
            Are you sure you want to delete this user? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => setDeleteConfirmOpen(false)}
            color="primary"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleDelete}
            color="error"
            variant="contained"
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ViewUsers;