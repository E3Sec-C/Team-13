import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setSnackBar } from '../../store/features/snackbar/snackbar';
import {
  TextField,
  Button,
  Container,
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper
} from '@mui/material';

const GenerateCredentials = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    userId: '',
    password: '',
    role: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(process.env.REACT_APP_API_AUTH_SIGNUP, formData);

      if (response.status === 200) {
        dispatch(setSnackBar({
          message: `User login information stored for role: ${formData.role}`,
          variant: "success"
        }));
        setFormData({ userId: '', password: '', role: '' });
        // Reload the page to clear form data and reset state
        window.location.reload();
      } else {
        dispatch(setSnackBar({
          message: "Failed to store login data. Please try again.",
          variant: "error"
        }));
      }
    } catch (error) {
      dispatch(setSnackBar({
        message: "An error occurred. Please try again.",
        variant: "error"
      }));
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
        py: 4
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={6}
          sx={{
            p: { xs: 3, sm: 4 },
            background: 'linear-gradient(to right, #f3f4f6, #e0f2fe)',
            borderRadius: 2
          }}
        >
          <Typography
            variant="h4"
            component="h2"
            align="center"
            sx={{
              mb: 4,
              color: '#4338ca',
              fontWeight: 600
            }}
          >
            Generate Credentials
          </Typography>

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="User ID"
              name="userId"
              value={formData.userId}
              onChange={handleChange}
              required
              margin="normal"
              variant="outlined"
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              margin="normal"
              variant="outlined"
              sx={{ mb: 2 }}
            />

            <FormControl fullWidth margin="normal" sx={{ mb: 3 }}>
              <InputLabel id="role-label">Role</InputLabel>
              <Select
                labelId="role-label"
                label="Role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
              >
                <MenuItem value="" disabled>Select a role</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="faculty">Faculty</MenuItem>
                <MenuItem value="student">Student</MenuItem>
                <MenuItem value="nonTeachingStaff">Non-Teaching Staff</MenuItem>
                <MenuItem value="hod">HOD</MenuItem>
              </Select>
            </FormControl>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 2,
                py: 1.5,
                background: 'linear-gradient(to right, #4f46e5, #3b82f6)',
                '&:hover': {
                  background: 'linear-gradient(to right, #4338ca, #2563eb)',
                },
                fontWeight: 600
              }}
            >
              Generate
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default GenerateCredentials;