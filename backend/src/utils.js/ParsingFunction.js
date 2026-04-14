// PapaParsing for CSV parsing
import Papa from "papaparse";

export const parseCSV = (csvFile) => {

    return new Promise((resolve, reject) => {
        Papa.parse(csvFile, {
            download: true, // allow downloading the file if it's a URL
            header: true, // treat the first row as headers
            comments: "#", // ignore lines starting with #
            skipEmptyLines: true, // skip empty lines

           // step: (results) => {
                // This function is called for each row of the CSV file
                // You can process each row here if needed, or just let it accumulate in results.data
            // },
            complete: (results) => {
                resolve(results.data); // return the parsed data as an array of objects
            },
            error: (error) => {
                reject(error); // reject the promise if there's an error
            },
        });
    });
};
