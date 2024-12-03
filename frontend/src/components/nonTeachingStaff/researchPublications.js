import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Checkbox from '@mui/material/Checkbox';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setSnackBar } from '../../store/features/snackbar/snackbar';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:nth-of-type(even)': {
    backgroundColor: theme.palette.common.white,
  },
  '&:hover': {
    backgroundColor: theme.palette.action.focus,
  },
}));

export default function ResearchPublications() {
  const dispatch = useDispatch();

  const [publicationsData, setPublicationsData] = useState([]);
  const [resource, setResource] = useState(null);

  const [openAdd, setOpenAdd] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newDate, setNewDate] = useState('');
  const [deleteMode, setDeleteMode] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    const fetchPublicationsData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/v1/researchPublications/getall`
        );
        setPublicationsData(response.data);
      } catch (error) {
        console.error('Error fetching publications data:', error);
      }
    };

    fetchPublicationsData();
  }, []);

  const handleAddPublication = () => {
    setNewTitle('');
    setNewAuthor('');
    setNewDate('');
    setResource('');
    setOpenAdd(true);
  };

  const handleCloseAdd = () => {
    setOpenAdd(false);
  };

  const handleSaveAdd = async () => {
    const data = {
      title: newTitle,
      authorName: newAuthor,
      dateOfPublishing: newDate,
      resource: resource,
    };
    try {
      const response = await axios.post('http://localhost:5000/api/v1/researchPublications/', data);
      dispatch(
        setSnackBar({
          message: 'Publication Added Successfully',
          variant: 'success',
        })
      );
      setPublicationsData((prevData) => [...prevData, response.data]);
    } catch (error) {
      dispatch(
        setSnackBar({
          message: 'Error adding the publication',
          variant: 'error',
        })
      );
    }

    handleCloseAdd();
  };

  const toggleDeleteMode = () => {
    setDeleteMode((prev) => !prev);
    setSelectedItems([]);
  };

  const handleDelete = async () => {
    try {
      console.log(selectedItems);
      await Promise.all(
        selectedItems.map(async (title) => {
          console.log(title)
          await axios.delete(`http://localhost:5000/api/v1/researchPublications/delete/${title}`);
        })
      );
      setPublicationsData((prevData) =>
        prevData.filter((row) => !selectedItems.includes(row.title))
      );
      dispatch(
        setSnackBar({
          message: 'Publications Deleted Successfully',
          variant: 'success',
        })
      );
    } catch (error) {
      dispatch(
        setSnackBar({
          message: 'Error deleting publications',
          variant: 'error',
        })
      );
    }
    toggleDeleteMode();
  };

  const toggleItemSelection = (title) => {
    setSelectedItems((prev) =>
      prev.includes(title) ? prev.filter((item) => item !== title) : [...prev, title]
    );
  };

  return (
    <div className="pt-16 p-4 transition-all duration-300">
      <div className="flex items-center gap-3 mb-6">
        <LibraryBooksIcon fontSize="large" className="text-gray-700" />
        <h1 className="text-2xl font-semibold">Research Publications</h1>
      </div>

      <TableContainer component={Paper} className="shadow-lg rounded-lg">
        <Table sx={{ minWidth: 700 }} aria-label="research publications table">
          <TableHead>
            <TableRow>
              {deleteMode && <StyledTableCell />}
              <StyledTableCell>Title</StyledTableCell>
              <StyledTableCell>Author</StyledTableCell>
              <StyledTableCell>Date</StyledTableCell>
              {!deleteMode && <StyledTableCell align="center">Action</StyledTableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {publicationsData.map((each, index) => (
              <StyledTableRow key={index}>
                {deleteMode && (
                  <StyledTableCell>
                    <Checkbox
                      checked={selectedItems.includes(each.title)}
                      onChange={() => toggleItemSelection(each.title)}
                    />
                  </StyledTableCell>
                )}
                <StyledTableCell>{each.title}</StyledTableCell>
                <StyledTableCell>{each.authorName}</StyledTableCell>
                <StyledTableCell>{each.dateOfPublishing}</StyledTableCell>
                {!deleteMode && (
                  <StyledTableCell align="center">
                    <Button
                      variant="contained"
                      style={{ backgroundColor: '#007BFF', color: 'white' }}
                      onClick={() => {}}
                    >
                      View
                    </Button>
                  </StyledTableCell>
                )}
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <div className="flex justify-between mt-4">
        <Button
          onClick={handleAddPublication}
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
        >
          Add Publication
        </Button>
        <div className="flex gap-4">
          <Button
            onClick={toggleDeleteMode}
            variant="outlined"
            color="secondary"
            startIcon={deleteMode ? <RemoveIcon /> : <AddIcon />}
          >
            {deleteMode ? 'Cancel Delete' : 'Delete Publication'}
          </Button>
          {deleteMode && (
            <Button
              onClick={handleDelete}
              variant="contained"
              color="error"
              startIcon={<RemoveIcon />}
            >
              Delete Selected
            </Button>
          )}
        </div>
      </div>

      <Dialog open={openAdd} onClose={handleCloseAdd} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Publication</DialogTitle>
        <DialogContent>
          <div className="flex flex-col gap-4 my-4">
            <input
              type="text"
              placeholder="Title"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="border rounded px-3 py-2 w-full"
            />
            <input
              type="text"
              placeholder="Author Name"
              value={newAuthor}
              onChange={(e) => setNewAuthor(e.target.value)}
              className="border rounded px-3 py-2 w-full"
            />
            <input
              type="date"
              placeholder="Date of Publishing"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
              className="border rounded px-3 py-2 w-full"
            />
            <input
              type="text"
              placeholder="Resource Link"
              value={resource}
              onChange={(e) => setResource(e.target.value)}
              className="border rounded px-3 py-2 w-full"
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAdd} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSaveAdd} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
