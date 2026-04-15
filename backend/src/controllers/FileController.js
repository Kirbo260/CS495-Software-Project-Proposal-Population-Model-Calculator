// Controller file for uploading user data files (CSV) and storing them in the database
import { client } from "../../db.js";

export const uploadCSV = async (req, res) => {
    const file = req.file;
    const parsedData = req.parsedData;

    if (!file) {
        return res.status(400).json({ error: "No file uploaded" });
    }

    if (!parsedData || !Array.isArray(parsedData)) {
        return res.status(400).json({ error: "Parsed data is missing or invalid" });
    }

    console.log("Received validated data:", parsedData);

    try {
        const result = await client.query(
            'INSERT INTO csv_files (file_name, file_data) VALUES ($1, $2) RETURNING *',
            [file.originalname, file.buffer]
        );

        console.log("File uploaded:", result.rows[0]);

        return res.status(201).json({
            file: result.rows[0],
            preview: parsedData.slice(0, 5) // useful for debugging
        });

    } catch (error) {
        console.error('Error uploading CSV:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

/*export const getCSVFiles = async (req, res) => {
    try {
        const result = await client.query('SELECT id, file_name, created_at FROM csv_files WHERE user_id = $1', [req.user.id]);
        return res.status(200).json({ files: result.rows });
    } catch (error) {
        console.error('Error fetching CSV files:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};*/

export const getCSVFileById = async (req, res) => {};

/*export const deleteCSVFile = async (req, res) => {
    try {
        const fileId = req.params.id;
        const result = await client.query('DELETE FROM csv_files WHERE id = $1 AND user_id = $2 RETURNING *', [fileId, req.user.id]);
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'File not found' });
        }
        return res.status(200).json({ message: 'File deleted successfully', file: result.rows[0] });
    } catch (error) {
        console.error('Error deleting CSV file:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};*/

// due to testing 
// no user authentication yet
export const deleteAllCSVFilesForUser = async (req, res) => {};