import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  CircularProgress,
  IconButton,
  Tooltip,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import DescriptionIcon from '@mui/icons-material/Description';
import { useDispatch } from 'react-redux';
import { setSnackBar } from '../../store/features/snackbar/snackbar';
import axios from 'axios';

// Styled components
const DropZone = styled(Paper)(({ theme, isDragActive, hasFile }) => ({
  padding: theme.spacing(6),
  border: `2px dashed ${isDragActive ? theme.palette.primary.main : hasFile ? theme.palette.success.main : theme.palette.grey[300]}`,
  borderRadius: theme.spacing(2),
  backgroundColor: isDragActive ? theme.palette.primary.light + '20' : 'transparent',
  cursor: 'pointer',
  transition: 'all 0.3s ease-in-out',
  textAlign: 'center',
  minHeight: '200px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '&:hover': {
    borderColor: theme.palette.primary.main,
    backgroundColor: theme.palette.primary.light + '10',
  },
}));

const UploadAttendance = () => {
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const [isDragActive, setIsDragActive] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const validateFile = (file) => {
    const validTypes = [
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ];
    if (!validTypes.includes(file.type)) {
      dispatch(
        setSnackBar({
          message: "Please upload only Excel files (.xls or .xlsx)",
          variant: "error"
        })
      );
      return false;
    }
    return true;
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && validateFile(droppedFile)) {
      setFile(droppedFile);
    }
  };

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && validateFile(selectedFile)) {
      setFile(selectedFile);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
  };

  const handleUpload = async () => {
    if (!file) {
      dispatch(
        setSnackBar({
          message: "Please select a file first",
          variant: "warning"
        })
      );
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append('attendance', file);

    try {
      // Dummy API call - Replace with actual endpoint
      const response = await axios.post('http://localhost:5000/api/v1/faculty/upload/attendance', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.status === 200) {
        dispatch(
          setSnackBar({
            message: "Attendance uploaded successfully",
            variant: "success"
          })
        );
        setFile(null);
      }
    } catch (error) {
      dispatch(
        setSnackBar({
          message: "Failed to upload attendance. Please try again.",
          variant: "error"
        })
      );
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 12, mb: 4 }}>
      <Typography variant="h4" component="h1" align="center" color="primary" gutterBottom>
        Upload Student Attendance
      </Typography>
      
      <Typography variant="body1" align="center" color="text.secondary" sx={{ mb: 4 }}>
        Upload an Excel file containing student attendance data. Supported formats: .xls, .xlsx
      </Typography>

      <input
        type="file"
        accept=".xls,.xlsx"
        onChange={handleFileSelect}
        style={{ display: 'none' }}
        id="attendance-file-input"
      />

      <DropZone
        elevation={0}
        onDrop={handleDrop}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        isDragActive={isDragActive}
        hasFile={!!file}
        component="label"
        htmlFor="attendance-file-input"
      >
        {file ? (
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
            <DescriptionIcon color="primary" sx={{ fontSize: 40 }} />
            <Box>
              <Typography variant="subtitle1" color="primary">
                {file.name}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </Typography>
            </Box>
            <Tooltip title="Remove file">
              <IconButton 
                onClick={(e) => {
                  e.preventDefault();
                  handleRemoveFile();
                }}
                size="small"
              >
                <DeleteIcon color="error" />
              </IconButton>
            </Tooltip>
          </Box>
        ) : (
          <Box>
            <CloudUploadIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              Drag and drop your Excel file here
            </Typography>
            <Typography variant="body2" color="text.secondary">
              or click to browse
            </Typography>
          </Box>
        )}
      </DropZone>

      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
        <Button
          variant="contained"
          size="large"
          onClick={handleUpload}
          disabled={!file || isUploading}
          startIcon={isUploading ? <CircularProgress size={20} color="inherit" /> : null}
        >
          {isUploading ? 'Uploading...' : 'Upload Attendance'}
        </Button>
      </Box>
    </Container>
  );
};

export default UploadAttendance;
