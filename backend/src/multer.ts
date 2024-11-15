import path from 'path';
import fs from "fs";
//creating multer storage to store images
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req:any, file:any, cb:any) => {

    const folderPath = file.fieldname==="student"?'images/student':file.fieldname==="faculty"?"images/faculty":file.fieldname==="admin"?"images/admin":file.fieldname === "hod"?"images/hod":"images/nonTeachingStaff";

    const uploadDir = path.join(__dirname,"../", folderPath);  // Define the folder path

    // Ensure the directory exists
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    cb(null, uploadDir);
  },

  filename: (req:any, file:any, cb:any) => {

    const { ID="", role="" } = req.query;

    const ext = path.extname(file.originalname);
    const filename = `${ID}${ext}`;
    cb(null, filename);
  }
})

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB size limit
  
});

export default upload;