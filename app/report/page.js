"use client";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment-timezone"; // Import moment-timezone for date formatting

const Report = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null); // Correct state variable name
  const [responseData, setResponseData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [reportdata, setreportdata] = useState([]);
  const [viewbutton, setviewbutton] = useState(true);
  const [OrderData, setOrderData] = useState([]);
  const [OrderDatadatestart, setOrderDatadatestart] = useState("");
  const [OrderDatadateend, setOrderDatadateend] = useState("");
  const [dateError, setDateError] = useState(false);

  const handleViewData = async () => {
    setLoading(true);
    console.log("asdasdasd", startDate);
    if (startDate && endDate) {
      try {
        const formattedStartDate = startDate
          ? new Date(
              startDate.getTime() - startDate.getTimezoneOffset() * 60000
            ).toISOString()
          : "";
        const formattedEndDate = endDate
          ? new Date(
              endDate.getTime() - endDate.getTimezoneOffset() * 60000
            ).toISOString()
          : "";

        console.log(startDate, endDate);

        const response = await fetch("https://return-app.vercel.app/api/viewreturn", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            startDate: formattedStartDate,
            endDate: formattedEndDate,
          }),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        if (data) {
          setLoading(false);
          setOrderDatadatestart(data.data.startDate)
          setOrderDatadateend(data.data.endDate)
          setOrderData(data.fetchdata);
          setviewbutton(false);

          console.log(data); // Log fetched data to console or process as needed
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    } else {
      setDateError(true);
      setTimeout(() => {
        setDateError(false);
      }, 3000);
      setLoading(false);
      console.log("Please select both start and end dates.");
    }
  };
  const downloadCSV = () => {
    const csvHeader = [
      "Order Ref",
      "Shop Name",
      "Channel",
      "Postcode",
      "Quantity",
      "Product",
      "Barcode",
      "Order Date",
      "Return Date"
    ];
    const csvRows = OrderData.map(item => [
      item.orderref,
      item.shopname,
      item.channel,
      item.pcode,
      item.qty,
      item.product,
      item.barcode,
      item.order_date,
      moment(item.returndate).format("YYYY-MM-DD")
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [csvHeader.join(","), ...csvRows.map(e => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "report.csv");
    document.body.appendChild(link);

    link.click();
  }

  return (
    <div className="p-4 sm:ml-64">
      <div className="flex flex-wrap -mx-2">
        <div className="flex w-full space-x-4">
          <div className="flex-1 px-2 mb-4">
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              dateFormat="MMMM d, yyyy"
              placeholderText="Select Start Date..."
              className="h-14 block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              maxDate={endDate || new Date()}
            />
          </div>
          <div className="flex-1 px-2 mb-4">
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              dateFormat="MMMM d, yyyy"
              placeholderText="Select End Date..."
              className="h-14 block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              maxDate={new Date()}
            />
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
      {OrderData?.length > 0 ? (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">Returns Report</h1>
            <div className="mb-4">
              <p className="text-gray-700">
                <span className="font-bold">From Date:</span> {moment(OrderDatadatestart).format("YYYY-MM-DD")}
              </p>
              <p className="text-gray-700">
                <span className="font-bold">To Date :</span> {moment(OrderDatadateend).format("YYYY-MM-DD")}
              </p>
            </div>
            <div className="overflow-x-auto">
            <button
              type="button"
              onClick={downloadCSV}
              className="w-full text-white bg-blue-800 mt-3 p-2 hover:bg-blue-700 font-medium"
            >
              Download CSV
            </button>
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-4 py-3 text-left text-sm font-bold text-black-500 uppercase tracking-wider"
                    >
                      Order Ref
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-left text-sm font-bold text-black-500 uppercase tracking-wider"
                    >
                      Shop Name
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-left text-sm font-bold text-black-500 uppercase tracking-wider"
                    >
                      Channel
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-left text-sm font-bold text-black-500 uppercase tracking-wider"
                    >
                      Postcode 
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-left text-sm font-bold text-black-500 uppercase tracking-wider"
                    >
                      Quantity
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-left text-sm font-bold text-black-500 uppercase tracking-wider"
                    >
                      Product
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-left text-sm font-bold text-black-500 uppercase tracking-wider"
                    >
                      Barcode
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-left text-sm font-bold text-black-500 uppercase tracking-wider"
                    >
                      Order Date
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-left text-sm font-bold text-black-500 uppercase tracking-wider"
                    >
                      Return Date
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {OrderData.map((item, index) => (
                    <tr key={item._id}>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {item.orderref}
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{item.shopname}</div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">  
                        {item.channel}                 
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">  
                        {item.pcode}                 
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">  
                        {item.qty}                 
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">  
                        {item.product}                 
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">  
                        {item.barcode}                 
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">  
                        {item.order_date}                 
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">  
                        {moment(item.returndate).format("YYYY-MM-DD")}                 
                        </div>
                      </td>
                      {/ Add more columns as needed /}
                    </tr>
                  ))}
                  {/ Add more rows as needed /}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      {viewbutton == true && (
        <button
          type="button"
          onClick={handleViewData}
          className="w-full text-white bg-purple-800 mt-3 p-2 hover:bg-purple-700 font-medium"
        >
          View Data
        </button>
      )}
       {dateError && (
          <div className="mt-2 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-4">
            PLEASE SELECT THE BOTH START AND END DATES.!
          </div>
        )}
      {/ Display fetched data /}
      {responseData && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold mb-2">Fetched Data:</h2>
          <pre className="bg-gray-100 p-4 rounded-lg overflow-auto">
            {JSON.stringify(responseData, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default Report;
