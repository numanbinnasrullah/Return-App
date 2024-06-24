"use client";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import parseDate from "date-fns/parse";

const BarcodeGenerate = () => {
  const [file, setFile] = useState(null);
  const [alldata, setalldata] = useState("");
  const [msg, setmsg] = useState(false);
  const [loading, setLoading] = useState(false);
  const [nofilemsg, setnofilemsg] = useState(false);
  const [column, setcolumn] = useState(false);
  const [columnf, setcolumnf] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const readFile = async () => {
    setLoading(true);
    if (!file) {
      setLoading(false);
      console.log("No file selected");
      setnofilemsg(true);
      setTimeout(() => {
        setnofilemsg(false); // Reset passwordChanged state after a delay (here, 3000 milliseconds)
      }, 4000);
      return;
    }

    const reader = new FileReader();

    reader.onload = (e) => {
      const contents = e.target.result;
      processFile(contents);
    };

    reader.readAsText(file);
  };

  useEffect(() => {
    const sendata = async () => {
      try {
        const response = await fetch("https://return-app.vercel.app/api/genbarcode", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(alldata),
        });

        setFile("");

        if (response.ok) {
          // Request was successful
          const data = await response.json();
          console.log("Response from server is ok", data);
          setLoading(false);
          setmsg(true); // Set the passwordChanged state to true after successful password change
          setTimeout(() => {
            setmsg(false); // Reset passwordChanged state after a delay (here, 3000 milliseconds)
          }, 3000);
          // Perform actions with the response data if needed
        } else {
          // Request failed
          console.error("Failed to submit data to the server");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    if (alldata.length > 0) {
      sendata();
    }
  }, [alldata]);

  const processFile = (data) => {
    const lines = data.split("\n").filter((line) => line.trim() !== "");
    if (lines.length === 0) {
      console.log("The file is empty or only contains empty lines.");
      setLoading(false);
      return;
    }

    const requiredHeaders = [
      "order_date",
      "orderref",
      "shopname",
      "channel",
      "pcode",
      "qty",
      "product",
      "barcode",
    ];

    const headers = lines[0].split(",").map((header) => header.trim());

    // Check if all required headers are present
    const missingHeaders = requiredHeaders.filter(
      (header) => !headers.includes(header)
    );
    if (missingHeaders.length > 0) {
      console.error(
        "The following required columns are missing:",
        missingHeaders.join(", ")
      );
      setLoading(false);
      setFile("");
      setcolumn(true);
      // setTimeout(() => {
      //   setcolumn(false); // Reset passwordChanged state after a delay (here, 3000 milliseconds)
      // }, 4000);
      return;
    }

    const dataArray = [];
    const emptyColumns = new Set();

    lines.slice(1).forEach((line, lineIndex) => {
      const values = line.split(",").map((value) => value.trim());
      const dataObject = {};
      headers.forEach((header, index) => {
        if (header === "order_date") {
          const dateParts = values[index].split("-");
          const year =
            dateParts[2].length === 2 ? `20${dateParts[2]}` : dateParts[2];
          const formattedDate = `${dateParts[0]}-${dateParts[1]}-${year}`;
          dataObject[header] = formattedDate;
        } else {
          dataObject[header] = values[index];
        }
        if (!values[index]) {
          emptyColumns.add(header);
        }
      });
      dataArray.push(dataObject);
    });

    if (emptyColumns.size > 0) {
      console.error(
        "The following columns are empty:",
        Array.from(emptyColumns).join(", ")
      );
      setLoading(false);
      setFile("");
      setcolumnf(true);
      // setTimeout(() => {
      //   setcolumnf(false); // Reset passwordChanged state after a delay (here, 3000 milliseconds)
      // }, 4000);
      return;
    }

    console.log("Processed data:", dataArray);
    setalldata(dataArray);
  };

  return (
    <>
      <div className="p-4 sm:ml-64">
        <div className="flex items-center justify-center w-full">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                SVG, PNG, JPG or GIF (MAX. 800x400px)
              </p>
            </div>
            <input
              id="dropzone-file"
              type="file"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        </div>
        {file && (
          <div className="text-center mt-2">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Selected file: {file.name}
            </p>
          </div>
        )}
        {loading && (
          <div className="flex justify-center items-center mt-4" role="status">
            <svg
              aria-hidden="true"
              class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span class="sr-only">Loading...</span>
          </div>
        )}
        <button
          type="button"
          onClick={readFile}
          className="w-full text-white bg-blue-800 mt-3 p-2 hover:bg-blue-700 font-medium"
        >
          Generate
        </button>
        {msg && (
          <div className="mt-2 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-md mb-4">
            Sheet has been successfully uploaded.!
          </div>
        )}
        {nofilemsg && (
          <div className="mt-2 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-4">
            NO FILE SELECTED.!
          </div>
        )}
        {column && (
          <div className="mt-2 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-4">
            Sheet columns name are not according to system's requirments, <strong>reload</strong> the page and try again.!
          </div>
        )}
        {columnf && (
          <div className="mt-2 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-4">
            There is missing data in the sheet, <strong>reload</strong> the page and try again.
          </div>
        )}
      </div>
    </>
  );
};

export default BarcodeGenerate;
