"use client";
import { Router } from "next/router";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const addReturn = () => {
  const [StartDate, setStartDate] = useState(null);
  const [barcode, setBarcode] = useState("");
  const [viewbutton, setviewbutton] = useState(true);
  const [data, setdata] = useState("");
  const [checkdata, setcheckdata] = useState({});
  const [loading, setLoading] = useState(false);
  const [orderData, setOrderData] = useState([]);
  const [error, setError] = useState("");
  const [msg, setmsg] = useState(false);
  const [norecordmsg, setnorecordmsg] = useState(false);
  const [dateempty, setdateempty] = useState(false);
  const [emptybarcode, setemptybarcode] = useState(false);
  const [selectedIndexes, setSelectedIndexes] = useState([]);
  const endDate = new Date();
  const today = new Date();

  const onChange = (event) => {
    setBarcode(event.target.value);
  };

  const addreturndata = async () => {
    setLoading(true);
    setOrderData([]);
    try {
      const response = await fetch("https://return-app.vercel.app/api/savereturn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ checkdata }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      if (result) {
        setLoading(false);
        setviewbutton(true);
       
        setStartDate(null);
        setBarcode("");
        setmsg(true);
        setTimeout(() => {
          setmsg(false);
        }, 3000);
        window.location.reload();
      }
    } catch (error) {
      console.error("Error fetching order data:", error);
      setError("Error fetching order data");
      setOrderData(null);
    }
  };

  const viewdata = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://return-app.vercel.app/api/addreturn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ barcode }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      if (result.msg === "Record not found") {
        setError("Record not found");
        setnorecordmsg(true);
        setStartDate(null);
        setBarcode("");
        setTimeout(() => {
          setnorecordmsg(false);
        }, 3000);
      } else {
        setOrderData(result.orderData);
        setviewbutton(false);
        setdata(result.orderData);
        setError("");
      }
    } catch (error) {
      console.error("Error fetching order data:", error);
      setError("Error fetching order data");
      setOrderData(null);
    }
    setLoading(false);
  };

  const handleCheckboxChange = (index) => {
    setSelectedIndexes((prevSelectedIndexes) => {
      const StartDateconvert = StartDate
        ? new Date(StartDate.getTime() - StartDate.getTimezoneOffset() * 60000).toISOString()
        : "";

      let updatedIndexes;
      if (prevSelectedIndexes.includes(index)) {
        updatedIndexes = prevSelectedIndexes.filter((i) => i !== index);
      } else {
        updatedIndexes = [...prevSelectedIndexes, index];
      }

      const selectedObjects = updatedIndexes.map((i) => ({
        ...orderData[i],
        returndate: StartDateconvert,
        qty: orderData[i].updatedQty || orderData[i].qty,
      }));

      setcheckdata(selectedObjects);
      return updatedIndexes;
    });
  };

  const handleQtyChange = (index, newQty) => {
    setOrderData((prevOrderData) =>
      prevOrderData.map((item, i) =>
        i === index ? { ...item, updatedQty: newQty } : item
      )
    );
  };

  useEffect(() => {
    const selectedObjects = selectedIndexes.map((i) => ({
      ...orderData[i],
      returndate: StartDate
        ? new Date(StartDate.getTime() - StartDate.getTimezoneOffset() * 60000).toISOString()
        : "",
      qty: orderData[i]?.updatedQty || orderData[i]?.qty,
    }));
    setcheckdata(selectedObjects);
  }, [selectedIndexes, orderData, StartDate]);
  return (
    <>
      <div className="p-4 sm:ml-64">
        <div className="flex flex-wrap -mx-2">
          <div className="flex w-full space-x-4">
            {/* DatePicker Container */}
            <div className="flex-1 px-2 mb-4">
              <DatePicker
                selected={StartDate}
                onChange={(date) => setStartDate(date)}
                dateFormat="MMMM d, yyyy"
                placeholderText="Select Date..."
                className="h-14 block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                maxDate={endDate || today}
              />
            </div>
            {/* Search Bar Container */}
            <div className="flex-1 px-2 mb-4">
              <form className="w-full">
                <label
                  htmlFor="default-search"
                  className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                >
                  Search
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"></div>
                  <input
                    type="search"
                    id="default-search"
                    required
                    value={barcode}
                    className="h-14 block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter Your Barcode..."
                    onChange={onChange}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
        {loading == true && (
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
        {viewbutton === true && (
          <button
            type="button"
            onClick={viewdata}
            class="w-full text-white bg-blue-800 mt-3 p-2 hover:bg-blue-700 font-medium"
          >
            View Order
          </button>
        )}
        {orderData?.length > 0 ? (
          <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-l">
            <h1 className="text-3xl font-bold mb-4">Order Summary</h1>
            {/* Assuming barcode is the same for all items */}
            <p className="text-gray-700 mb-2">
              <span className="font-bold">Barcode:</span>{" "}
              {orderData[0]?.barcode}
            </p>
            <p className="text-gray-700 mb-2">
              <span className="font-bold">Order Ref:</span>{" "}
              {orderData[0]?.orderref}
            </p>
            <p className="text-gray-700 mb-2">
              <span className="font-bold">Shop:</span> {orderData[0]?.shopname}
            </p>
            <p className="text-gray-700 mb-2">
              <span className="font-bold">Channel:</span>{" "}
              {orderData[0]?.channel}
            </p>
            {/* Assuming order date is the same for all items */}
            <p className="text-gray-700 mb-2">
              <span className="font-bold">Order Date:</span>{" "}
              {new Date(orderData[0]?.order_date).toLocaleDateString()}
            </p>

            <div>
              <div className="border-t border-gray-300 py-4">
                <div className="flex justify-between items-center mb-4 pb-4">
                  <p className="text-gray-800 font-bold">Select</p>
                  <p className="text-gray-800 font-bold">Product Name</p>
                  <p className="text-gray-800 font-bold">Qty</p>
                </div>
                {orderData?.map((product, index) => (
                  <div
                    className="flex justify-between border-b border-gray-300 items-center mb-4 pb-4"
                    key={index}
                  >
                    <input
                      type="checkbox"
                      className="mr-2"
                      onChange={() => handleCheckboxChange(index)}
                    />
                    <div className="flex-grow">
                      <p className="text-gray-700">{product.product}</p>
                    </div>
                    {product?.qty <= 1 ? (
                      <p className="text-gray-700">{product.qty}</p>
                    ) : (
                      <input
                        type="number"
                        id="number-input"
                        aria-describedby="helper-text-explanation"
                        className="text-gray-900 text-sm block p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                        value={product.updatedQty || product.qty}
                        style={{ width: "50px" }}
                        onChange={(e) => handleQtyChange(index, e.target.value)}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          ""
        )}

        {viewbutton === false && (
          <button
            type="button"
            onClick={addreturndata}
            class="w-full text-white bg-green-800 mt-3 p-2 hover:bg-green-700 font-medium"
          >
            Add Return
          </button>
        )}
        {msg && (
          <div className="mt-2 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-md mb-4">
            Your Selected Return is added.!
          </div>
        )}
        {norecordmsg && (
          <div className="mt-2 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-4">
            NO RECORD FOUND.!
          </div>
        )}
      </div>
    </>
  );
};

export default addReturn;
