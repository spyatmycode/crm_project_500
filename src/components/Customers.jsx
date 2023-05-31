import React, { useContext, useState } from "react";
import { CustomersDb } from "../providers/CustomerProvider";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { data } from "autoprefixer";
import { Link } from "react-router-dom";

const Customers = () => {
  const { database , setCustomer} = useContext(CustomersDb);
  const [query, setQuery] = useState("");

  const handleQuery = (e) => {
    const { name, value } = e.target;
    setQuery(value);
  };

  const filteredList = () => {
    if (query && database) {
      return database.filter((each) => {
        const {
          firstname,
          lastname,
          phonenumber,
          lastvisit,
          email,
          
          tag,
        } = each._document.data.value.mapValue.fields;

        return (
          firstname.stringValue.toLowerCase().includes(query.toLowerCase()) ||
          lastname.stringValue.toLowerCase().includes(query.toLowerCase()) ||
          each.id.toLowerCase().includes(query.toLowerCase()) ||
          email.stringValue.toLowerCase().includes(query.toLowerCase()) ||
          phonenumber.stringValue
            .toString()
            .toLowerCase()
            .includes(query.toLowerCase())
        );
      });
    }
    return database;
  };

  console.log(filteredList());

  ChartJS.register(ArcElement, Tooltip, Legend);

  const newCustomer = () =>
    database &&
    database.filter((item) => {
      const { tag } = item._document.data.value.mapValue.fields;

      return tag.stringValue.toLowerCase() === "new";
    });

  const vip = () =>
    database &&
    database.filter((item) => {
      const { tag } = item._document.data.value.mapValue.fields;

      return tag.stringValue.toLowerCase() === "vip";
    });

  const returning = () =>
    database &&
    database.filter((item) => {
      const { tag } = item._document.data.value.mapValue.fields;

      return tag.stringValue.toLowerCase() === "loyal";
    });

  const customerTagData = {
    newCustomer: newCustomer,
    vip: vip,
    returning: returning,
  };

  console.log(customerTagData.newCustomer(), "how far");

  const tagChart = database && {
    labels: [
      "New Customers",
      "Loyal Customers",
      "VIP Customers",
      
    ],
    datasets: [
      {
        label: "# of Votes",
        data: [
          customerTagData.newCustomer().length,
          customerTagData.vip().length,
          customerTagData.returning().length,
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.3)",
          "rgba(54, 162, 235, 0.3)",
          "rgba(255, 206, 86, 0.3)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="relative  sm:rounded-lg mx-10 my-10">
      <div className="flex w-full justify-center my-6">
        <input
          onChange={handleQuery}
          name="query"
          type="text"
          className="w-full border-2 rounded-md justify-center items-center max-w-xl p-2 border-blue-500"
          placeholder="Search Customers by Name and ID"
        />
      </div>
      <div className="w-full overflow-x-auto rounded-md">
      <table  className="overflow-x-auto w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="p-4">
              <div className="flex items-center">
                <input
                  id="checkbox-all-search"
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label for="checkbox-all-search" className="sr-only">
                  checkbox
                </label>
              </div>
            </th>

            <th scope="col" className="px-6 py-3">
              Customer_ID
            </th>
            <th scope="col" className="px-6 py-3">
              First Name
            </th>
            <th scope="col" className="px-6 py-3">
              Last Name
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Phone Number
            </th>
            <th scope="col" className="px-6 py-3">
              Last_Visited
            </th>
            <th scope="col" className="px-6 py-3">
              Total Purchases
            </th>
            <th scope="col" className="px-6 py-3">
              Tags
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {/* <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td className="w-4 p-4">
              <div className="flex items-center">
                <input
                  id="checkbox-table-search-2"
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label for="checkbox-table-search-2" className="sr-only">
                  checkbox
                </label>
              </div>
            </td>
            <th
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              Customer1
            </th>
            <td className="px-6 py-4">Oluwanifemi</td>
            <td className="px-6 py-4">Akeju</td>
            <td className="px-6 py-4">akejunifemi11@gmail.com</td>
            <td className="px-6 py-4">+2347051807727</td>
            <td className="px-6 py-4">2023-05-25</td>
            <td className="px-6 py-4">$20000</td>
            <td className="px-6 py-4">New Customer</td>
            <td className="flex items-center px-6 py-4 space-x-3">
              <a
                href="#"
                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
              >
                Edit
              </a>
              <a
                href="#"
                className="font-medium text-red-600 dark:text-red-500 hover:underline"
              >
                Remove
              </a>
            </td>
          </tr> */}

          {database &&
            filteredList().map((customer) => {
              const {
                firstname,
                lastname,
                phonenumber,
                lastvisit,
                email,
                purchaseHistory,
                tag,
              } = customer._document.data.value.mapValue.fields;

              const totalAmount = purchaseHistory.arrayValue.values

              console.log(totalAmount);

              const total = totalAmount.map((each)=>{
                const {quantity, price} = each.mapValue.fields

                return Number(quantity.integerValue) * Number(price.integerValue)
              })

              const finalTotal = total.reduce((acc, current)=> acc + current,0)

              console.log(finalTotal);

              console.log(firstname.stringValue, "THISSS");
              return (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td className="w-4 p-4">
                    <div className="flex items-center">
                      <input
                        id="checkbox-table-search-2"
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label for="checkbox-table-search-2" className="sr-only">
                        checkbox
                      </label>
                    </div>
                  </td>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {customer.id}
                  </th>
                  <td className="px-6 py-4">{firstname.stringValue}</td>
                  <td className="px-6 py-4">{lastname.stringValue}</td>
                  <td className="px-6 py-4">{email.stringValue}</td>
                  <td className="px-6 py-4">{phonenumber.stringValue}</td>
                  <td className="px-6 py-4">{lastvisit.stringValue}</td>
                  <td className="px-6 py-4">
                    ${finalTotal}
                  </td>
                  <td className="px-6 py-4">{tag.stringValue}</td>
                  <td className="flex items-center px-6 py-4 space-x-3">
                    <Link to={`/customer/${customer.id}`}>
                    <span
                      
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      
                    >
                      View
                    </span>
                    </Link>
                   {/*  <a
                      href="#"
                      className="font-medium text-red-600 dark:text-red-500 hover:underline"
                    >
                      Remove
                    </a> */}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      </div>

      

      <div className="stats w-full lg:grid lg:grid-cols-3 flex flex-col gap-y-10 items-center my-10">
        <div className="relative  flex justify-center items-center flex-col  shadow-md rounded-md p-4">
          <h1>Pie Chart for Stats</h1>
          <span>
          {database && <Pie data={tagChart} />}
          </span>
        </div>
      </div>
    </div>
   
  );
};

export default Customers;

// Table from ChatGpt
{
  /* <div className="bg-white shadow-md rounded-lg overflow-hidden">
<table className="min-w-full">
  <thead>
    <tr className="bg-gray-100 text-gray-700">
      <th className="py-2 px-4 border-b">ID</th>
      <th className="py-2 px-4 border-b">Name</th>
      <th className="py-2 px-4 border-b">Email</th>
      <th className="py-2 px-4 border-b">Phone</th>
    </tr>
  </thead>
  <tbody>
    <tr className="hover:bg-gray-100">
      <td className="py-2 px-4 border-b">1</td>
      <td className="py-2 px-4 border-b">John Doe</td>
      <td className="py-2 px-4 border-b">johndoe@example.com</td>
      <td className="py-2 px-4 border-b">123-456-7890</td>
    </tr>
    <tr className="hover:bg-gray-100">
      <td className="py-2 px-4 border-b">2</td>
      <td className="py-2 px-4 border-b">Jane Smith</td>
      <td className="py-2 px-4 border-b">janesmith@example.com</td>
      <td className="py-2 px-4 border-b">987-654-3210</td>
    </tr>
  </tbody>
</table>
</div> */
}
