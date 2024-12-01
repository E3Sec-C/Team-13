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
  Paper,
  Grid,
  Input
} from '@mui/material';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({});
  const [role, setRole] = useState('');
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    if (!selectedFile) {
      return;
    }

    if (!selectedFile.type.includes("jpeg")) {
      dispatch(setSnackBar({
        message: "Please select a JPG file.",
        variant: "error"
      }));
      event.target.value = "";
      return;
    }

    if (selectedFile.size > 10 * 1024 * 1024) {
      dispatch(setSnackBar({
        message: "File size must be less than 10MB.",
        variant: "error"
      }));
      event.target.value = "";
      return;
    }

    setFile(selectedFile);
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
    setFormData({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    let url = '';
    switch (role) {
      case 'admin':
        url = 'http://localhost:5000/api/v1/admin';
        break;
      case 'faculty':
        url = 'http://localhost:5000/api/v1/faculty';
        break;
      case 'student':
        url = 'http://localhost:5000/api/v1/student';
        break;
      case 'nonTeachingStaff':
        url = 'http://localhost:5000/api/v1/nonTeachingStaff';
        break;
      case 'hod':
        url = 'http://localhost:5000/api/v1/hod';
        break;
      default:
        dispatch(setSnackBar({
          message: "Please select a valid role",
          variant: "warning"
        }));
        return;
    }

    try {
      console.log("started registration");
      const response = await axios.post(url, formData);

      console.log("data uploaded successfully");

      if (file) {
        const imageFormData = new FormData();
        imageFormData.append(role, file);

        const params = {
          ID: formData.ID,
          role: role,
        };
        await axios.post(
          `${url}/upload/image`,
          imageFormData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            params: params,
          }
        );
      }
  
      if (response.status === 200) {
        console.log('Registration successful!', formData);
        dispatch(setSnackBar({
          message: `Registration successful for ${role}!`,
          variant: "success"
        }));
        window.location.reload();
      } else {
        console.error('Error registering user:', response.data);
        dispatch(setSnackBar({
          message: "Failed to register. Please try again.",
          variant: "error"
        }));
      }
    } catch (error) {
      console.error('An error occurred:', error);
      dispatch(setSnackBar({
        message: "An error occurred. Please try again.",
        variant: "error"
      }));
    }
  };

  const renderFormFields = () => {
    const commonFields = {
      ID: { label: 'ID', type: 'text' },
      name: { label: 'Name', type: 'text' },
      email: { label: 'Email', type: 'email' },
      mobile: { label: 'Mobile', type: 'tel' },
      education: { label: 'Education', type: 'text' },
      bloodGroup: { label: 'Blood Group', type: 'text' },
      address: { label: 'Address', type: 'text' }
    };

    const roleFields = {
      admin: ['ID', 'name', 'email', 'mobile', 'education'],
      faculty: ['ID', 'name', 'email', 'mobile', 'education'],
      student: ['ID', 'name', 'email', 'mobile', 'bloodGroup', 'address'],
      nonTeachingStaff: ['ID', 'mobile', 'email'],
      hod: ['ID', 'name', 'email', 'education']
    };

    if (!role || !roleFields[role]) return null;

    return roleFields[role].map((fieldName) => (
      <Grid item xs={12} sm={6} key={fieldName}>
        <TextField
          fullWidth
          label={commonFields[fieldName].label}
          name={fieldName}
          type={commonFields[fieldName].type}
          value={formData[fieldName] || ''}
          onChange={handleChange}
          variant="outlined"
          required
        />
      </Grid>
    ));
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
        py: 4
      }}
    >
      <Container maxWidth="md">
        <Paper
          elevation={6}
          sx={{
            p: { xs: 2, sm: 4 },
            background: 'linear-gradient(to right, #f3f4f6, #e0f2fe)',
            borderRadius: 2,
            mt: { xs: 2, sm: 4 }
          }}
        >
          <Typography
            variant="h4"
            component="h2"
            align="center"
            sx={{
              mb: 4,
              color: '#1976d2',
              fontWeight: 600
            }}
          >
            User Registration
          </Typography>

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel id="role-label">Select Role</InputLabel>
                  <Select
                    labelId="role-label"
                    value={role}
                    label="Select Role"
                    onChange={handleRoleChange}
                  >
                    <MenuItem value="">Select Role</MenuItem>
                    <MenuItem value="admin">Admin</MenuItem>
                    <MenuItem value="faculty">Faculty</MenuItem>
                    <MenuItem value="student">Student</MenuItem>
                    <MenuItem value="nonTeachingStaff">Non-Teaching Staff</MenuItem>
                    <MenuItem value="hod">HOD</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              {role && (
                <Grid item xs={12} sm={6}>
                  <Box>
                    <Typography variant="subtitle2" sx={{ mb: 1 }}>
                      Upload Image (JPG only, max 10MB)
                    </Typography>
                    <Input
                      type="file"
                      onChange={handleFileChange}
                      fullWidth
                      accept=".jpg"
                      sx={{
                        '&::file-selector-button': {
                          border: '1px solid #1976d2',
                          padding: '0.5rem 1rem',
                          borderRadius: '4px',
                          backgroundColor: '#fff',
                          color: '#1976d2',
                          cursor: 'pointer',
                          '&:hover': {
                            backgroundColor: '#f5f5f5'
                          }
                        }
                      }}
                    />
                  </Box>
                </Grid>
              )}

              {renderFormFields()}
            </Grid>

            <Box sx={{ mt: 4, textAlign: 'center' }}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                sx={{
                  px: 6,
                  py: 1.5,
                  background: 'linear-gradient(to right, #1976d2, #1565c0)',
                  '&:hover': {
                    background: 'linear-gradient(to right, #1565c0, #0d47a1)',
                  },
                  fontWeight: 600
                }}
              >
                Submit
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default RegistrationForm;