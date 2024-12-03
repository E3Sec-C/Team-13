import { useState } from "react";

// Form imports
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import axios from "axios";

// Table imports
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import PrintIcon from '@mui/icons-material/Print';

import { useDispatch } from "react-redux";
import { setSnackBar } from "../../store/features/snackbar/snackbar";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#2563EB",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const ViewResults = () => {
  const dispatch = useDispatch();
  const [semResult, setSemResult] = useState(null);
  const [formData, setFormData] = useState({
    ID: `${localStorage.getItem("userId")}`,
    year: 1,
    sem: 1,
  });

  // Handle form field changes
  const handleChange = (e) => {
    setSemResult(null);
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle the form submission
  const handleSubmit = async () => {
    // Example of form validation
    if (!formData.year || !formData.sem) {
      dispatch(
        setSnackBar({
          message: "Please select Year and Semester",
          type: "warning",
        })
      );
      return;
    }
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_STUDENT_GET_BY_ID}/${localStorage.getItem("userId")}`);
      if (!response) {
        dispatch(
          setSnackBar({
            message: "No user Found",
            variant: "error",
          })
        );
        return;
      }
      const studentData = response.data;
      const yearData = studentData.marks.find((yearData) => Number(yearData.year) === Number(formData.year));
      if (!yearData) {
        dispatch(
          setSnackBar({
            message: "No Results to Display",
            variant: "warning",
          })
        );
        return;
      }

      const semData = yearData.semester.find((semData) => {
        return Number(semData.sem) === Number(formData.sem);
      });
      if (!semData) {
        dispatch(
          setSnackBar({
            message: "No Results to Display",
            variant: "warning",
          })
        );
        return;
      }
      dispatch(
        setSnackBar({
          message: "Results fetched successfully",
          variant: "success",
        })
      );
      setSemResult(semData);
      console.log(semData);
    } catch (error) {
      dispatch(
        setSnackBar({
          message: "Error Fetching the results",
          variant: "error",
        })
      );
      console.log(error);
    }
  };

  const handlePrint = () =>{
    const contentToPrint = document.getElementById('table-to-print'); // Get the table element
    const printWindow = window.open('', '', 'width=800,height=600');

    // Copy the current document's styles into the new print window
    const styles = Array.from(document.styleSheets)
    .map((styleSheet) => {
        try {
        return Array.from(styleSheet.cssRules)
            .map((rule) => rule.cssText)
            .join('');
        } catch (e) {
        return '';
        }
    })
    .join('');

    printWindow.document.write('<html><head><title>Print</title>');
    printWindow.document.write(`<style> body ${styles} </style>`); // Add custom styles
    printWindow.document.write('</head><body>');
    printWindow.document.write(contentToPrint.outerHTML); // Write the table content
    printWindow.document.write('</body></html>');
    
    printWindow.document.close();
    printWindow.print();
  }

  const gradeToCredit = (grade)=>{
    const mappings = {
        'Ex':10,
        'A':9,
        'B':8,
        'C':7,
        'D':6,
        'E':5,
        'F':0,
        'P':0,
        'MP':0,
        'AB':0,
        'DETAINED':0,
    }
    return mappings[grade];
  }
  return (
    <div className=" mx-auto p-8 mt-10 rounded-lg">
      <h2 className="text-center text-2xl font-bold text-gray-800 mb-6">
        View Results
      </h2>
      <div className="flex flex-row gap-10 justify-center">
        {/* Year Select */}
        <FormControl className="w-56 mb-4">
          <InputLabel id="year-select-label">Year</InputLabel>
          <Select
            labelId="year-select-label"
            name="year"
            value={formData.year}
            label="Year"
            onChange={handleChange}
          >
            <MenuItem value={1}>Year - 1</MenuItem>
            <MenuItem value={2}>Year - 2</MenuItem>
            <MenuItem value={3}>Year - 3</MenuItem>
            <MenuItem value={4}>Year - 4</MenuItem>
          </Select>
        </FormControl>
        {/* Semester Select */}
        <FormControl className="w-56 mb-6">
          <InputLabel id="sem-select-label">Semester</InputLabel>
          <Select
            labelId="sem-select-label"
            name="sem"
            value={formData.sem}
            label="Semester"
            onChange={handleChange}
          >
            <MenuItem value={1}>Semester - 1</MenuItem>
            <MenuItem value={2}>Semester - 2</MenuItem>
          </Select>
        </FormControl>
        {/* Fetch Button */}
        <FormControl className="w-40">
          <Button
            className="h-14"
            variant="contained"
            color="primary"
            onClick={handleSubmit}
          >
            Fetch Results
          </Button>
        </FormControl>
      </div>
      {semResult && (
        <TableContainer className="w-1000 mt-10" component={Paper}>
          <Table sx={{ minWidth: 900 }} aria-label="customized table" id="table-to-print">
            <TableHead>
              <TableRow>
                <StyledTableCell sx={{ minWidth: 50 }}>S.No</StyledTableCell>
                <StyledTableCell sx={{ minWidth: 250 }}>Subject Name</StyledTableCell>
                <StyledTableCell sx={{ minWidth: 50 }} align="center">Year_Sem</StyledTableCell>
                <StyledTableCell sx={{ minWidth: 50 }} align="center">Grade</StyledTableCell>
                <StyledTableCell sx={{ minWidth: 50 }} align="center">Credits</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {semResult && semResult.subjects.map((sub,index)=>{
                return(
                    <TableRow>
                        <StyledTableCell sx={{ minWidth: 50 }}>{index+1}</StyledTableCell>
                        <StyledTableCell sx={{ minWidth: 250 }}>{sub.subName}</StyledTableCell>
                        <StyledTableCell sx={{ minWidth: 50 }} align="center">Year{formData.year}_Sem{formData.sem}</StyledTableCell>
                        <StyledTableCell sx={{ minWidth: 50 }} align="center">{sub.grade}</StyledTableCell>
                        <StyledTableCell sx={{ minWidth: 50 }} align="center">{gradeToCredit(sub.grade)}</StyledTableCell>
                    </TableRow>
                )
            })}
            </TableBody>
          </Table>
          <Table sx={{ minWidth: 900 }} aria-label="customized table">
            <TableBody>
            <TableRow>
                <StyledTableCell align="left" ></StyledTableCell>
                <StyledTableCell align="left">CGPA : {semResult?.cgpa}</StyledTableCell>
                <StyledTableCell align="right">SGPA : {semResult?.sgpa}</StyledTableCell>
                <StyledTableCell align="left"></StyledTableCell>
              </TableRow>
            </TableBody>
          </Table>
          <div className="mt-5 mb-5 flex flex-row justify-center">
            <Button
                className="h-10 justify-center align-middle"
                variant="contained"
                color="success"
                onClick={handlePrint}
            >
                Print <PrintIcon />
            </Button>
        </div>
        </TableContainer>
        
      )}
       
    </div>
  );
};

export default ViewResults;
