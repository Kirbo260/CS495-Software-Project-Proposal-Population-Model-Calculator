// MiddleWare for handling file uploads using multer
import multer from "multer";

// Configure multer to store files in memory (you can change this to disk storage if needed)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

export default upload;