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
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import InventoryIcon from '@mui/icons-material/Inventory';
import axios from 'axios';

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

const rows = [
  { item: 'Chairs', count: 120, lastUpdatedBy: 'Alice' },
  { item: 'Desks', count: 75, lastUpdatedBy: 'Bob' },
  { item: 'Projectors', count: 10, lastUpdatedBy: 'Charlie' },
  { item: 'Batteries', count: 50, lastUpdatedBy: 'Diana' },
  { item: 'Whiteboards', count: 5, lastUpdatedBy: 'Edward' },
];

export default function Infrastructure() {
  const [sortedRows, setSortedRows] = useState(
    rows.sort((a, b) => a.item.localeCompare(b.item))
  );
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [newCount, setNewCount] = useState('');
  const [newItemName, setNewItemName] = useState('');
  const [newItemCount, setNewItemCount] = useState('');

  const handleClickOpenUpdate = (item) => {
    setCurrentItem(item);
    setNewCount(item.count);
    setOpenUpdate(true);
  };

  const handleCloseUpdate = () => {
    setOpenUpdate(false);
    setCurrentItem(null);
  };

  const handleSaveUpdate = () => {
    setSortedRows((prevRows) =>
      prevRows.map((row) =>
        row.item === currentItem.item ? { ...row, count: newCount } : row
      )
    );
    handleCloseUpdate();
  };

  const handleAddItem = () => {
    setNewItemName('');
    setNewItemCount('');
    setOpenAdd(true);
  };

  const handleCloseAdd = () => {
    setOpenAdd(false);
  };

  const handleSaveAdd = () => {
    const newItem = {
      item: newItemName,
      count: Number(newItemCount),
      lastUpdatedBy: 'Admin',
    };
    setSortedRows((prevRows) => [...prevRows, newItem]);
    handleCloseAdd();
  };

  return (
    <div className="pt-16 p-4 transition-all duration-300">
      {/* Header Section */}
      <div className="flex items-center gap-3 mb-6">
        <InventoryIcon fontSize="large" className="text-gray-700" />
        <h1 className="text-2xl font-semibold">Infrastructure Details</h1>
      </div>

      {/* Table Section */}
      <TableContainer component={Paper} className="shadow-lg rounded-lg">
        <Table sx={{ minWidth: 700 }} aria-label="infrastructure table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Item</StyledTableCell>
              <StyledTableCell>Last Updated By</StyledTableCell>
              <StyledTableCell align="right">Count</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedRows.map((row, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row">
                  {row.item}
                </StyledTableCell>
                <StyledTableCell>{row.lastUpdatedBy}</StyledTableCell>
                <StyledTableCell align="right">{row.count}</StyledTableCell>
                <StyledTableCell align="center">
                  <Button
                    variant="contained"
                    style={{ backgroundColor: '#007BFF', color: 'white' }}
                    onClick={() => handleClickOpenUpdate(row)}
                  >
                    Update
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Buttons Section */}
      <div className="flex justify-between mt-4">
        <Button
          onClick={handleAddItem}
          variant="contained"
          style={{ backgroundColor: 'green', color: 'white' }}
        >
          Add Item
        </Button>
      </div>

      {/* Update Dialog Section */}
      <Dialog open={openUpdate} onClose={handleCloseUpdate} maxWidth="sm" fullWidth>
        <DialogTitle>{currentItem?.item}</DialogTitle>
        <DialogContent>
          <div className="flex items-center justify-center gap-4 my-4">
            <IconButton onClick={() => setNewCount((prev) => Math.max(prev - 1, 0))}>
              <RemoveIcon />
            </IconButton>
            <input
              type="number"
              value={newCount}
              onChange={(e) => setNewCount(Number(e.target.value))}
              className="text-center w-20 border rounded px-2 py-1"
              min="0"
            />
            <IconButton onClick={() => setNewCount((prev) => prev + 1)}>
              <AddIcon />
            </IconButton>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseUpdate} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleSaveUpdate}
            variant="contained"
            style={{ backgroundColor: '#007BFF', color: 'white' }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Dialog Section */}
      <Dialog open={openAdd} onClose={handleCloseAdd} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Item</DialogTitle>
        <DialogContent>
          <div className="flex flex-col gap-4 my-4">
            <input
              type="text"
              placeholder="Item Name"
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              className="border rounded px-3 py-2 w-full"
            />
            <input
              type="number"
              placeholder="Count"
              value={newItemCount}
              onChange={(e) => setNewItemCount(e.target.value)}
              className="border rounded px-3 py-2 w-full"
              min="0"
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAdd} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleSaveAdd}
            variant="contained"
            style={{ backgroundColor: 'green', color: 'white' }}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
