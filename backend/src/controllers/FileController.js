// Controller file for uploading user data files (CSV) and storing them in the database
import { client } from "../../db.js";
import path from "path";


export const uploadCSV = async (req, res) => {
    // const user_id = req.user.userId; // auth middleware sets req.user

    // Get file from multer
    const file = req.file;
 
    if (!file) {
        return res.status(400).json({ error: "No file uploaded" });
    }

    // Check file type (only allow CSV)
    const ext = path.extname(file.originalname);
    if (ext !== ".csv") {
        return res.status(400).json({ error: "Only CSV files are allowed" });
    }

    const fileName = file.originalname;
    const fileData = file.buffer; // this is the actual file data in memory

    try {
        const result = await client.query(
            'INSERT INTO csv_files (file_name, file_data) VALUES ($1, $2) RETURNING *',
            [fileName, fileData]
        );
        res.status(201).json(result.rows[0]); // return the newly created CSV file record

        // for error checking
        console.log("File uploaded:", result.rows[0]);
    } catch (error) {
        console.error('Error uploading CSV:', error);
        res.status(500).json({ error: 'Internal server error' });
    }

};

export const getCSVFiles = async (req, res) => {};

export const getCSVFileById = async (req, res) => {};

export const deleteCSVFile = async (req, res) => {};

export const deleteAllCSVFilesForUser = async (req, res) => {};