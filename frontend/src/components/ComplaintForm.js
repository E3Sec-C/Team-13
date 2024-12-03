import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setSnackBar } from '../store/features/snackbar/snackbar';
import { 
  TextField, 
  Button, 
  Container, 
  Paper, 
  Typography,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const ComplaintForm = () => {
  const dispatch = useDispatch();
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const ID = localStorage.getItem('userId');
    const role = localStorage.getItem('role');

    if (!ID || !role) {
      dispatch(
        setSnackBar({
          message: "User is not logged in",
          variant: "warning"
        })
      );
      return;
    }

    try {
      const response = await axios.post(process.env.REACT_APP_API_COMPLAINT_CREATE, {
        ID,
        role,
        description,
      });

      if (response.status === 200) {
        dispatch(
          setSnackBar({
            message: "Complaint registered successfully",
            variant: "success"
          })
        );
        setDescription('');
      } else {
        dispatch(
          setSnackBar({
            message: "Failed to register the Complaint",
            variant: "error"
          })
        );
      }
    } catch (error) {
      console.error('Error submitting complaint:', error);
      dispatch(
        setSnackBar({
          message: "You already submitted the complaint",
          variant: "error"
        })
      );
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4, mt: 12 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center" color="primary" sx={{ mb: 4 }}>
          Submit a Complaint
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            multiline
            rows={6}
            name="description"
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            placeholder="Please provide detailed description of your complaint..."
            sx={{ mb: 3 }}
          />

          <Button
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            endIcon={<SendIcon />}
            sx={{
              py: 1.5,
              backgroundColor: 'primary.main',
              '&:hover': {
                backgroundColor: 'primary.dark',
              },
            }}
          >
            Submit Complaint
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default ComplaintForm;