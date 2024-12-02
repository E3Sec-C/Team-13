import xlsx from 'xlsx';
import { Request, Response, NextFunction } from 'express';
import { asyncHandler } from "../middlewares/asyncHandler";
import { StudentService } from '../services';
import { student, yearRecord, semRecord, subject } from '../types/student';
import { BadRequestError } from '../exceptions/BadRequestError';
import fs from 'fs';

class ExcelUploadController {
    private readonly ALLOWED_EXTENSIONS = ['.xlsx', '.xls'];
    private readonly MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

    uploadAttendance = asyncHandler(async(req: any, res: Response, next: NextFunction) => {
        try {
            // File validation
            if (!req.file) {
                throw new BadRequestError('No file uploaded');
            }

            // Validate file size
            if (req.file.size > this.MAX_FILE_SIZE) {
                throw new BadRequestError('File size exceeds 5MB limit');
            }

            // Validate file extension
            const fileExt = req.file.originalname.toLowerCase().slice(req.file.originalname.lastIndexOf('.'));
            if (!this.ALLOWED_EXTENSIONS.includes(fileExt)) {
                throw new BadRequestError('Invalid file type. Only .xlsx and .xls files are allowed');
            }

            // Read workbook
            const workbook = xlsx.readFile(req.file.path, {
                cellDates: true, // Properly parse dates
                dateNF: 'yyyy-mm-dd' // Standardize date format
            });

            if (!workbook.SheetNames.length) {
                throw new BadRequestError('Excel file is empty');
            }

            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];

            // Convert to JSON with proper date formatting
            const data: any[] = xlsx.utils.sheet_to_json(worksheet, {
                raw: false,
                dateNF: 'yyyy-mm-dd'
            });

            if (!data.length) {
                throw new BadRequestError('No data found in the Excel file');
            }

            // Validate required columns
            const requiredColumns = ['ID', 'ATTENDANCE'];
            const firstRow = data[0];
            const missingColumns = requiredColumns.filter(col => !(col in firstRow));
            
            if (missingColumns.length) {
                throw new BadRequestError(`Missing required columns: ${missingColumns.join(', ')}`);
            }

            // Process each row
            const results = await Promise.all(data.map(async (row) => {
                const { ID="", ATTENDANCE=0 } = row;

                // Get student by Id
                const student: student | null = await StudentService.getById(ID);
                if (!student) {
                    throw new BadRequestError(`Student with ID ${ID} not found`);
                }

                // Update attendance
                student.attendance = ATTENDANCE;
                return await StudentService.updateById(ID, student);
            }));

            // Cleanup: Delete the temporary file
            if (req.file.path) {
                fs.unlinkSync(req.file.path);
            }

            res.status(200).json({
                success: true,
                message: "Attendance updated successfully",
                updatedRecords: results.length
            });

        } catch (error) {
            // Cleanup on error
            if (req.file?.path) {
                fs.unlinkSync(req.file.path);
            }

            // Handle known errors
            if (error instanceof BadRequestError) {
                return res.status(400).json({
                    success: false,
                    message: error.message
                });
            }

            // Log unknown errors and return generic message
            console.error('Excel upload error:', error);
            return res.status(500).json({
                success: false,
                message: 'An error occurred while processing the Excel file'
            });
        }
    });

    uploadMarks = asyncHandler(async(req: any, res: Response, next: NextFunction) => {
        try {
            // File validation
            if (!req.file) {
                throw new BadRequestError('No file uploaded');
            }

            // Validate file size
            if (req.file.size > this.MAX_FILE_SIZE) {
                throw new BadRequestError('File size exceeds 5MB limit');
            }

            // Validate file extension
            const fileExt = req.file.originalname.toLowerCase().slice(req.file.originalname.lastIndexOf('.'));
            if (!this.ALLOWED_EXTENSIONS.includes(fileExt)) {
                throw new BadRequestError('Invalid file type. Only .xlsx and .xls files are allowed');
            }

            // Read workbook
            const workbook = xlsx.readFile(req.file.path, {
                cellDates: true, // Properly parse dates
                dateNF: 'yyyy-mm-dd' // Standardize date format
            });

            if (!workbook.SheetNames.length) {
                throw new BadRequestError('Excel file is empty');
            }
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];

            // Convert to JSON with proper date formatting
            const data: any[] = xlsx.utils.sheet_to_json(worksheet, {
                raw: false,
                dateNF: 'yyyy-mm-dd'
            });

            if (!data.length) {
                throw new BadRequestError('No data found in the Excel file');
            }

            // Validate required columns
            const requiredColumns = ['ID', 'YEAR','SEM','SUBNAME','GRADE','SGPA','CGPA'];
            const firstRow = data[0];
            const missingColumns = requiredColumns.filter(col => !(col in firstRow));
            
            if (missingColumns.length) {
                throw new BadRequestError(`Missing required columns: ${missingColumns.join(', ')}`);
            }

            // Process each row
            for(const row of data) {
                const { 
                    ID, 
                    YEAR,
                    SEM,
                    SUBNAME,
                    GRADE,
                    SGPA,
                    CGPA,
                 } = row;

                // Get student by Id
                const student_record = await StudentService.getById(ID);
                if (!student_record) {
                    throw new BadRequestError(`Student with ID ${ID} not found`);
                }

                // Find the year record in the marks array
                let year_index = student_record.marks.findIndex((y: yearRecord) => y.year == YEAR);
                if(year_index==-1){
                    student_record.marks.push({
                        year:YEAR,
                        semester:[]
                    });
                    year_index = student_record.marks.length-1;
                }

                // Find the semester record in the year record
                let sem_index = student_record.marks[year_index].semester.findIndex((s: semRecord) => s.sem == SEM);
                if(sem_index==-1){
                    student_record.marks[year_index].semester.push({
                        sem:SEM,
                        sgpa:SGPA,
                        cgpa:CGPA,
                        subjects:[]
                    });
                    sem_index = student_record.marks[year_index].semester.length-1;
                }
                student_record.marks[year_index].semester[sem_index].subjects.push({
                    subName:SUBNAME,
                    grade:GRADE
                });

                // Save the updated student record
                await StudentService.updateById(ID, student_record);
            };

            // Cleanup: Delete the temporary file
            if (req.file.path) {
                fs.unlinkSync(req.file.path);
            }

            res.status(200).json({
                success: true,
                message: "Marks updated successfully",
                updatedRecords: data.length
            });
        }catch(error){
            // Cleanup on error
            if (req.file?.path) {
                fs.unlinkSync(req.file.path);
            }

            // Handle known errors
            if (error instanceof BadRequestError) {
                return res.status(400).json({
                    success: false,
                    message: error.message
                });
            }

            // Log unknown errors and return generic message
            console.error('Excel upload error:', error);
            return res.status(500).json({
                success: false,
                message: 'An error occurred while processing the Excel file'
            });
        }
    });
}

export default new ExcelUploadController();
