import React from "react";

const orderDetails = () => {
  return (
    <>
      <div class="bg-white rounded-lg mt-4 shadow-lg p-8">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-semibold">Order Detail</h2>
        </div>
        <div class="overflow-x-auto">
          <table class="min-w-full bg-white">
            <thead>
              <tr>
                <th class="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-600 tracking-wider">
                  <input type="checkbox" id="select-all" />
                </th>
                <th class="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-600 tracking-wider">
                  Order Date
                </th>
                <th class="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-600 tracking-wider">
                  Order Ref
                </th>
                <th class="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-600 tracking-wider">
                  Shop Name
                </th>
                <th class="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-600 tracking-wider">
                  Channel
                </th>
                <th class="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-600 tracking-wider">
                  Postcode
                </th>
                <th class="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-600 tracking-wider">
                  Item
                </th>
                <th class="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-600 tracking-wider">
                  Qty
                </th>
                <th class="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-600 tracking-wider">
                  Barcode
                </th>
                <th class="px-6 py-3 border-b-2 border-gray-300"></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="px-6 py-4 border-b border-gray-200">
                  <input type="checkbox" class="row-checkbox" />
                </td>
                <td class="px-6 py-4 border-b border-gray-200">5-June-2024</td>
                <td class="px-6 py-4 border-b border-gray-200">T5C766C</td>
                <td class="px-6 py-4 border-b border-gray-200">YORK</td>
                <td class="px-6 py-4 border-b border-gray-200">Invoice</td>
                <td class="px-6 py-4 border-b border-gray-200">Completed</td>
                <td class="px-6 py-4 border-b border-gray-200">Completed</td>
                <td class="px-6 py-4 border-b border-gray-200">Completed</td>
                <td class="px-6 py-4 border-b border-gray-200">Completed</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="flex space-x-2">
          <button class="px-4 py-2 bg-red-600 mt-4 text-white rounded-md">
            Return
          </button>
        </div>
      </div>
    </>
  );
};

export default orderDetails;
