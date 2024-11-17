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

import {useDispatch} from "react-redux";
import {setSnackBar} from '../../store/features/snackbar/snackbar'

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


export default function Infrastructure() {

  const dispatch = useDispatch();

  const [infraData, setInfraData] = useState(null);
  const [userName, setUserName] = useState(null);


  const [openUpdate, setOpenUpdate] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [currentAssetName, setCurrentAssetName] = useState(null);
  const [newCount, setNewCount] = useState('');
  const [newAssetName, setNewAssetName] = useState('');
  const [newAssetCount, setNewAssetCount] = useState('');

  useEffect(()=>{
    const fetchInfraData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/v1/infrastructure/getall`
        );
        setInfraData(response.data);

        const userResponse = await axios.get(
          `http://localhost:5000/api/v1/nonTeachingStaff/${localStorage.getItem("userId")}`
        )
        setUserName(userResponse.data.name);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };
    fetchInfraData();
  },[])

  const handleClickOpenUpdate = (assetName) => {
    setCurrentAssetName(assetName);
    setNewCount(assetName.count);
    setOpenUpdate(true);
  };

  const handleCloseUpdate = () => {
    setOpenUpdate(false);
    setCurrentAssetName(null);
  };

  const handleSaveUpdate = async() => {
    const data = {
      "assetName":currentAssetName.assetName,
      "lastUpdatedBy":userName,
      "count":newCount,
    }
    try{
      const saveUrl = `http://localhost:5000/api/v1/infrastructure/update/${data.assetName}`
      const response = await axios.put(saveUrl,data);
      if(response){
        dispatch(
          setSnackBar({
            message:"Updated Successfully",
            variant:"success"
          })
        )
        setInfraData((prevRows) =>
          prevRows.map((row) =>
            row.assetName === response.data.assetName ? { ...row, count: response.data.count, lastUpdatedBy:response.data.lastUpdatedBy } : row
          )
        );
      }else{
        dispatch(
          setSnackBar({
            message:"Failed to Update",
            variant:"error"
          })
        )
      }
    }catch(error){
      dispatch(
        setSnackBar({
          message:"Error saving the details",
          variant:"error"
        })
      );
      console.log(error)
    }
  
    handleCloseUpdate();
  };

  const handleAddassetName = () => {
    setNewAssetName('');
    setNewAssetCount('');
    setOpenAdd(true);
  };

  const handleCloseAdd = () => {
    setOpenAdd(false);
  };

  const handleSaveAdd = async() => {
    const data = {
      "assetName":newAssetName,
      "lastUpdatedBy":userName,
      "count":newAssetCount,
    }
    console.log(data);
    try{
      const saveUrl = `http://localhost:5000/api/v1/infrastructure/`
      const response = await axios.post(saveUrl,data);
      if(response){
        dispatch(
          setSnackBar({
            message:"Asset added Successfully",
            variant:"success"
          })
        )
        setInfraData(prevData => [
          ...prevData, 
          {
            "assetName": response.data.assetName,
            "lastUpdatedBy": userName,
            "count": response.data.count
          }
        ]);
      }else{
        dispatch(
          setSnackBar({
            message:"Failed to add",
            variant:"error"
          })
        )
      }
    }catch(error){
      dispatch(
        setSnackBar({
          message:"Error adding the asset",
          variant:"error"
        })
      );
      console.log(error)
    }

    handleCloseAdd();
  };

  return (
    <div className="pt-16 p-4 transition-all duration-300">
      {/* Header Section */}
      <div className="flex assetNames-center gap-3 mb-6">
        <InventoryIcon fontSize="large" className="text-gray-700" />
        <h1 className="text-2xl font-semibold">Infrastructure Details</h1>
      </div>

      {/* Table Section */}
      <TableContainer component={Paper} className="shadow-lg rounded-lg">
        <Table sx={{ minWidth: 700 }} aria-label="infrastructure table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Asset Name</StyledTableCell>
              <StyledTableCell>Last Updated By</StyledTableCell>
              <StyledTableCell align="right">Count</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {infraData && infraData.map((each, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row">
                  {each.assetName}
                </StyledTableCell>
                <StyledTableCell>{each.lastUpdatedBy}</StyledTableCell>
                <StyledTableCell align="right">{each.count}</StyledTableCell>
                <StyledTableCell align="center">
                  <Button
                    variant="contained"
                    style={{ backgroundColor: '#007BFF', color: 'white' }}
                    onClick={() => handleClickOpenUpdate(each)}
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
          onClick={handleAddassetName}
          variant="contained"
          style={{ backgroundColor: 'green', color: 'white' }}
        >
          Add Asset
        </Button>
      </div>

      {/* Update Dialog Section */}
      <Dialog open={openUpdate} onClose={handleCloseUpdate} maxWidth="sm" fullWidth>
        <DialogTitle>{currentAssetName?.assetName}</DialogTitle>
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
        <DialogTitle>Add New Asset</DialogTitle>
        <DialogContent>
          <div className="flex flex-col gap-4 my-4">
            <input
              type="text"
              placeholder="Asset Name"
              value={newAssetName}
              onChange={(e) => setNewAssetName(e.target.value)}
              className="border rounded px-3 py-2 w-full"
            />
            <input
              type="number"
              placeholder="Count"
              value={newAssetCount}
              onChange={(e) => setNewAssetCount(e.target.value)}
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
