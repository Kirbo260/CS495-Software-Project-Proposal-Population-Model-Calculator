// MiddleWare for handling file uploads using multer
import multer from "multer";
import ParsingFunction from "../utils.js/ParsingFunction.js";
import validateCSVData from "../utils.js/csvValdator.js";

export default function uploadMiddleWare() {
    // Configure multer to store files in memory (you can change this to disk storage if needed)
    const storage = multer.memoryStorage();
    const upload = multer({ storage: storage , limits: { fileSize: 5 * 1024 * 1024 } }); // limit file size to 5MB
    const validTypes = ["Regular", "Predator-prey"];
    const aliases = {
        time: ["time", "t", "year", "y"],
        population: ["population", "pop", "final"],
        prey_population: ["prey_population", "prey", "preyPop"],
        predator_population: ["predator_population", "predator", "predatorPop"]
    };
  
    console.log("Validating file structure...");

    // Handle structure validation here
    const validateFileStructure = async (req, res, next) => {
      console.log("Validating file structure...");
         const modelType = req.params.modelType;


         if (!validTypes.includes(modelType)) {
            return res.status(400).json({ error: `Invalid model type: ${modelType}. Valid model types are ${validTypes.join(", ")}` });
        }

        try {

            if (!req.file) {
                return res.status(400).json({ error: "No file uploaded" });
            }

            const parsedData = await ParsingFunction(req.file.buffer.toString());

            if (!parsedData || parsedData.length === 0 || !parsedData[0]) {
                return res.status(400).json({ error: "CSV file is empty or invalid" });
            }

            // debug log the parsed data to see what it looks like
            console.log("Parsed CSV data:", parsedData);

            // get the headers from the first row of the parsed data
            // normalize headers to lowercase for easier comparison
            const headers = Object.keys(parsedData[0]).map(h => h.trim().toLowerCase());

            // Validate that the required columns are present (using aliases)
            if (modelType === "Regular") {
                if (!hasValidColumn(headers, aliases.time)
                    || !hasValidColumn(headers, aliases.population)) {
                    return res.status(400).json({ error: "CSV file must contain 'time' and 'population' columns (or their aliases)" });
                }
            }

            // For Predator-Prey model, check for the presence of either the standard column names or their aliases
            if (modelType === "Predator-prey") {
                if (!hasValidColumn(headers, aliases.time)
                    || !hasValidColumn(headers, aliases.prey_population)
                    || !hasValidColumn(headers, aliases.predator_population)) {
                    return res.status(400).json({ error: "CSV file must contain 'time', 'prey_population', and 'predator_population' columns (or their aliases) for Predator-Prey model" });
                }
            }

            // Normalize the parsed data based on aliases
            const normalizedData = parsedData.map(row => normalizeRow(row, aliases));

            // Validate the normalized data using the validateCSVData function
            await validateCSVData(normalizedData, modelType);

            // If validation passes, attach the parsed data to the request object for use in the controller
            req.parsedData = normalizedData;
            next();

        } catch (error) {
            console.error("Error validating CSV file:", error);
            return res.status(400).json({ error: error.message });
        }
    };

    // Helper function to normalize row keys based on aliases
    function normalizeRow(row, aliases) {
        const normalized = {};

        for (const standardKey in aliases) {
            const possibleNames = aliases[standardKey].map(a => a.trim().toLowerCase());

            for (const key in row) {
                if (possibleNames.includes(key.trim().toLowerCase())) {
                    normalized[standardKey] = row[key];
                    break;
                }
            }
        }

        return normalized;
    }

    // Helper function to find the correct column name based on aliases
    function hasValidColumn(headers, aliasList) {
        return aliasList.some(alias => headers.includes(alias.trim().toLowerCase()));
    }

    const uploadHandler = upload.single("file");

return [
  (req, res, next) => {
    console.log("🔥 MULTER START");
    uploadHandler(req, res, (err) => {
      if (err) {
        console.log("MULTER ERROR:", err);
        return res.status(400).json({ error: err.message });
      }
      console.log(" MULTER DONE");
      next();
    });
  },
  validateFileStructure
];
}

