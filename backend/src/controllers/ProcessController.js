// Csv controller for handling CSV file uploads and processing for population models

export const processCSV = async (req, res) => {
    const data = req.parsedData;

    if (!data) {
        return res.status(400).json({ error: "No processed data" });
    }

    // call your model logic
    // const result = runPopulationModel(data);

    return res.status(200).json({
        message: "Processing successful",
        // result: result
    });
};