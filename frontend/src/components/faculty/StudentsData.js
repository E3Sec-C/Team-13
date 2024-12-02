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
  Typography,
  IconButton,
  Box,
  Avatar,
  Grid,
  Container,
  TextField,
  InputAdornment,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import VisibilityIcon from "@mui/icons-material/Visibility";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch } from "react-redux";
import { setSnackBar } from "../../store/features/snackbar/snackbar";

const StudentsData = () => {
  const dispatch = useDispatch();
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isViewModalOpen, setViewModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  // Fetch students from the backend
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(process.env.REACT_APP_API_STUDENT_GET_ALL);
        setStudents(response.data);
        setFilteredStudents(response.data);
      } catch (error) {
        console.error("Error fetching students:", error);
        dispatch(
          setSnackBar({
            message: "Failed to fetch students data",
            variant: "error",
          })
        );
      }
    };
    
    fetchStudents();
  }, [dispatch]);

  // Handle search
  useEffect(() => {
    const filtered = students.filter(student => 
      student.ID.toString().toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredStudents(filtered);
  }, [searchQuery, students]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleView = (student) => {
    setSelectedStudent(student);
    setViewModalOpen(true);
  };

  const handleModalClose = () => {
    setSelectedStudent(null);
    setViewModalOpen(false);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 12, mb: 4 }}>
      <Typography variant="h4" component="h2" gutterBottom color="primary" align="center" sx={{ mb: 4 }}>
        Students Data
      </Typography>

      {/* Search Bar */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
        <TextField
          placeholder="Search by ID or Name"
          variant="outlined"
          size="small"
          value={searchQuery}
          onChange={handleSearchChange}
          sx={{ width: '300px' }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {/* Students Table */}
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
            {filteredStudents.map((student) => (
              <TableRow key={student.id} hover>
                <TableCell>{student.ID}</TableCell>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.email}</TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    color="info"
                    startIcon={<VisibilityIcon />}
                    onClick={() => handleView(student)}
                    size="small"
                  >
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {filteredStudents.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No students found matching your search.
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
          Student Details
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
        {selectedStudent && (
          <DialogContent>
            <Box sx={{ textAlign: "center", mb: 3 }}>
              <Avatar
                src={`http://localhost:5000/api/v1/student/image/${selectedStudent.ID}/student`}
                sx={{ width: 100, height: 100, mx: "auto", mb: 2 }}
              />
              <Typography variant="h6">{selectedStudent.ID}</Typography>
            </Box>
            
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="subtitle1" color="text.secondary">
                  Name: <Box component="span" sx={{ color: "text.primary" }}>{selectedStudent.name}</Box>
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1" color="text.secondary">
                  Email: <Box component="span" sx={{ color: "text.primary" }}>{selectedStudent.email}</Box>
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1" color="text.secondary">
                  Department: <Box component="span" sx={{ color: "text.primary" }}>{selectedStudent.department}</Box>
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1" color="text.secondary">
                  Year: <Box component="span" sx={{ color: "text.primary" }}>{selectedStudent.year}</Box>
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1" color="text.secondary">
                  Section: <Box component="span" sx={{ color: "text.primary" }}>{selectedStudent.section}</Box>
                </Typography>
              </Grid>
            </Grid>
          </DialogContent>
        )}
        <DialogActions>
          <Button onClick={handleModalClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default StudentsData;
