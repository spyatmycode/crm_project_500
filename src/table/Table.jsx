import React from "react";

const Table = ({array}) => {
  return (
        
<div class="relative overflow-x-auto shadow-md sm:rounded-lg mx-10 my-10">
<table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="p-4">
                    <div class="flex items-center">
                        <input id="checkbox-all-search" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                        <label for="checkbox-all-search" class="sr-only">checkbox</label>
                    </div>
                </th>

                <th scope="col" class="px-6 py-3">
                    ProductID
                </th>
                <th scope="col" class="px-6 py-3">
                    Product Name
                </th>
                <th scope="col" class="px-6 py-3">
                    Quantity
                </th>
                <th scope="col" class="px-6 py-3">
                    Price
                </th>
                <th scope="col" class="px-6 py-3">
                    Category
                </th>
                
                <th scope="col" class="px-6 py-3">
                   Cost Price
                </th>
                
            </tr>
        </thead>
        <tbody>
            
            {
                array.map((product)=>{
                    const {id, name, category, price, description, quantity} = product
                    return (
                        <tr key={id + name + description} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td class="w-4 p-4">
                    <div class="flex items-center">
                        <input id="checkbox-table-search-2" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                        <label for="checkbox-table-search-2" class="sr-only">checkbox</label>
                    </div>
                </td>
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {id}
                </th>
                <td class="px-6 py-4">
                    {name}
                </td>
                <td class="px-6 py-4">
                  {quantity}
                </td>
                <td class="px-6 py-4">
                   ${price}
                </td>
                <td class="px-6 py-4">
                   {category}
                </td>
                <td class="px-6 py-4">
                    ${Number(price) * Number(quantity)}
                </td>
                {/* <td class="px-6 py-4">
                    $20000
                </td>
                <td class="px-6 py-4">
                    New Customer
                </td>
                <td class="flex items-center px-6 py-4 space-x-3">
                    <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                    <a href="#" class="font-medium text-red-600 dark:text-red-500 hover:underline">Remove</a>
                </td> */}
            </tr>
                    )
                })
            }
           
           
        </tbody>
    </table>
</div>

  );
};

export default Table;



// Table from ChatGpt
{/* <div class="bg-white shadow-md rounded-lg overflow-hidden">
<table class="min-w-full">
  <thead>
    <tr class="bg-gray-100 text-gray-700">
      <th class="py-2 px-4 border-b">ID</th>
      <th class="py-2 px-4 border-b">Name</th>
      <th class="py-2 px-4 border-b">Email</th>
      <th class="py-2 px-4 border-b">Phone</th>
    </tr>
  </thead>
  <tbody>
    <tr class="hover:bg-gray-100">
      <td class="py-2 px-4 border-b">1</td>
      <td class="py-2 px-4 border-b">John Doe</td>
      <td class="py-2 px-4 border-b">johndoe@example.com</td>
      <td class="py-2 px-4 border-b">123-456-7890</td>
    </tr>
    <tr class="hover:bg-gray-100">
      <td class="py-2 px-4 border-b">2</td>
      <td class="py-2 px-4 border-b">Jane Smith</td>
      <td class="py-2 px-4 border-b">janesmith@example.com</td>
      <td class="py-2 px-4 border-b">987-654-3210</td>
    </tr>
  </tbody>
</table>
</div> */}
