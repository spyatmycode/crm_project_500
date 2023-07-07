import React, { useContext, useMemo, useState } from "react";
import { CustomersDb } from "../../providers/CustomerProvider";
import { products } from "../Products";
import Table from "../../table/Table";
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// ChartJS.register(ArcElement, Tooltip, Legend);
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Pie, Line } from "react-chartjs-2";
import { useEffect } from "react";
import Loading from "../Loading";

ChartJS.register(
  PointElement,
  LineElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const History = () => {
  const lineOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "Chart.js Line Chart",
      },
    },
  };

  const options = {
    plugins: {
      title: {
        display: true,
        text: "",
      },
    },
    responsive: true,
    interaction: {
      mode: "index",
      intersect: false,
    },

    aspectRatio: 1,
    scales: {
      x: {
        stacked: false,
      },
      y: {
        stacked: false,
      },
    },
  };

  const { customer, database, setSuggestion } = useContext(CustomersDb);

  const [query, setQuery] = useState("");

  const handleQuery = (e) => {
    const { name, value } = e.target;
    setQuery(value);
  };

  const customerID = window.location.href.split("/")[4]

  console.log("Identification",customerID);

  console.log("this is the DBBDBDB", database);

  const currentCustomer =
    database && database.find((customerr) => customerr.id === customerID);

  
  const generalInfo =
    currentCustomer && currentCustomer._document.data.value.mapValue.fields;
  const {
    firstname,
    lastname,
    phonenumber,
    lastvisit,
    email,
    total_purchase_amount,
    tag,
    purchaseHistory,
  } = generalInfo || {};

  const history = database && purchaseHistory.arrayValue.values;

  const filteredList = () => {
    if (query && history) {
      return history.filter((each) => {
        const { price, quantity, productID, date, productName } =
          each.mapValue.fields;

        return (
          price.integerValue
            .toString()
            .toLowerCase()
            .includes(query.toLowerCase()) ||
          date.stringValue.toLowerCase().includes(query.toLowerCase()) ||
          productID.stringValue.toLowerCase().includes(query.toLowerCase()) ||
          quantity.integerValue
            .toString()
            .toLowerCase()
            .includes(query.toLowerCase())  ||
          productName.stringValue.toLowerCase().includes(query.toLowerCase())
        );
      });
    }

    return history;
  };

  const prices =
    history &&
    history.map((item) => {
      const { price, quantity, productID, date, productName } =
        item.mapValue.fields;

      return Number(price.integerValue) * Number(quantity.integerValue);
    });

  const pricesTotal =
    prices &&
    prices.reduce((acc, current) => {
      return acc + current;
    }, 0);

  const productNames =
    history &&
    history.map((item) => {
      const { price, quantity, productID, date, productName } =
        item.mapValue.fields;

      return productName.stringValue;
    });
  const productQuantities =
    history &&
    history.map((item) => {
      const { price, quantity, productID, date, productName } =
        item.mapValue.fields;

      return Number(quantity.integerValue);
    });

  const dates =
    history &&
    history.map((each) => {
      const { price, quantity, productID, date, productName } =
        each.mapValue.fields;

      return new Date(date.stringValue).getTime();
    });

  const lastVisited = dates && Math.max(...dates);

  const lastVisitedDate = () => {
    const time = new Date(lastVisited);

    let year = time.getFullYear();
    let day = time.getDate() < 10 ? `0${time.getDate()}` : time.getDate();
    let month =
      time.getMonth() + 1 < 10 ? `0${time.getMonth() + 1}` : time.getMonth();

    let date = `${year}-${month}-${day}`;
    return date;
  };

  const monthDistance = () =>{

    const month = new Date(lastVisited).getMonth() + 1

    const today = new Date().getMonth() + 1

    return today - month

  }





  const barChartData = productNames && {
    labels: productNames,
    datasets: [
      {
        label: "Quantity",
        data: productQuantities,
        backgroundColor: "rgba(75, 192, 192, 1)",
      },
      {
        label: "Price",
        data: prices,
        backgroundColor: "rgba(255, 99, 132, 1)",
      },
    ],
  };

  const pieChartData = productNames && {
    labels: productNames,
    datasets: [
      {
        data: productQuantities,
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(53, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(153, 102, 255, 0.5)",
          "rgba(255, 159, 64, 0.5)",
          "rgba(255, 99, 132, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(53, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(153, 102, 255, 0.5)",
          "rgba(255, 159, 64, 0.5)",
          "rgba(255, 99, 132, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(53, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(153, 102, 255, 0.5)",
          "rgba(255, 159, 64, 0.5)",
          "rgba(255, 99, 132, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(53, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(153, 102, 255, 0.5)",
          "rgba(255, 159, 64, 0.5)",
          "rgba(255, 99, 132, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(53, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(153, 102, 255, 0.5)",
          "rgba(255, 159, 64, 0.5)",
          // Add more colors as needed...
        ],
      },
    ],
  };

  const mappingDates =
    history &&
    history.map((each) => {
      const { price, quantity, productID, date, productName } =
        each.mapValue.fields;

      const timeStamp = new Date(date.stringValue);

      let year = timeStamp.getFullYear();
      let day =
        timeStamp.getDate() < 10
          ? `0${timeStamp.getDate()}`
          : timeStamp.getDate();
      let month =
        timeStamp.getMonth() + 1 < 10
          ? `0${timeStamp.getMonth() + 1}`
          : timeStamp.getMonth();

      let finalDate = `${year}-${month}-${day}`;
      return finalDate;
    });

  

  const labels = mappingDates;
  const data = pricesTotal && {
    labels,
    datasets: [
      {
        label: "Dataset 2",
        data: prices,
        backgroundColor: "rgb(75, 192, 192)",
        borderColor: "blue",
      },
      /* ,
      {
        label: "Dataset 3",
        data: [600, 900, 1300, 1600, 2100, 2600, 2900],
        backgroundColor: "rgb(53, 162, 235)",
        
      }, */
    ],
  };

  let similarities = [];

  const categories =
    purchaseHistory &&
    purchaseHistory.arrayValue?.values.map((each) => {
      const { category } = each.mapValue.fields;

      return category.stringValue;
    });

  const catMap = new Map();

   if(categories){
    for (let i = 0; i < categories.length; i++) {
      if (!catMap.has(categories[i])) {
        catMap.set(categories[i], 1);
      } else {
        catMap.set(categories[i], catMap.get(categories[i]) + 1);
      }
    }
   }



  let maxCount = 0;
  let mostFrequentCategory = null
  catMap.forEach((values, keys) => {
    if (values > maxCount) {
      maxCount = values;
      mostFrequentCategory = keys
    }
  });



  const currentPurchaseHistory  = history && history.map((each)=>{
    const {category, productID, productName, price, quantity}= each.mapValue.fields

    return {
      id: productID.stringValue,
      name: productName.stringValue,
      category: category.stringValue,
      quantity: quantity.integerValue,
      price: price.integerValue
    }
  })



  const mostFreqProducts = products.filter((each)=> each.category === mostFrequentCategory).sort((a,b)=> a.price - b.price).slice(0,5)


  const difference = mostFreqProducts.filter((obj1) => {
    // Check if there is no object in array2 with the same id
    return !currentPurchaseHistory.some((obj2) => obj2.name === obj1.name);
  });


 



  

  


  return history ? (
    <>
      <div className="relative  sm:rounded-lg mx-10 my-10">
        <h2 className="text-center text-2xl font-bold underline text-blue-600">
          Product History for '#{customerID}' - {firstname.stringValue}{" "}
          {lastname.stringValue}
        </h2>
        <div className="flex w-full justify-center my-6">
          <input
            onChange={handleQuery}
            name="query"
            type="text"
            className="w-full border-2 rounded-md justify-center items-center max-w-xl p-2 border-blue-500 shadow-lg"
            placeholder="Search Products by Fields"
          />
        </div>
        <div className="overflow-x-auto rounded-md  border-2 border-gray-100">
          <table className="w-full text-sm border-2 border-gray-200 text-left rounded-md  text-gray-500 dark:text-gray-400">
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
                  Product_ID
                </th>
                <th scope="col" className="px-6 py-3">
                  Product_Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Category
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Quantity
                </th>
                <th scope="col" className="px-6 py-3">
                  Total
                </th>

                <th scope="col" className="px-6 py-3">
                  Date
                </th>
                {/* <th scope="col" className="px-6 py-3">
                   Total Purchases
                </th> */}
                {/*  <th scope="col" className="px-6 py-3">
                    Tags
                </th> */}
                {/* <th scope="col" className="px-6 py-3">
                Action
              </th> */}
              </tr>
            </thead>
            <tbody>
              {database &&
                filteredList().map((item) => {
                  const {
                    price,
                    quantity,
                    productID,
                    date,
                    productName,
                    category,
                  } = item.mapValue.fields;
                  return (
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                      <td className="w-4 p-4">
                        <div className="flex items-center">
                          <input
                            id="checkbox-table-search-2"
                            type="checkbox"
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          />
                          <label
                            for="checkbox-table-search-2"
                            className="sr-only"
                          >
                            checkbox
                          </label>
                        </div>
                      </td>
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {productID.stringValue}
                      </th>
                      <td className="px-6 py-4">{productName.stringValue}</td>
                      <td className="px-6 py-4">{category.stringValue}</td>

                      <td className="px-6 py-4">₦{price.integerValue}</td>
                      <td className="px-6 py-4">{quantity.integerValue}</td>
                      <td className="px-6 py-4">
                      ₦{price.integerValue * quantity.integerValue}
                      </td>
                      <td className="px-6 py-4">{date.stringValue}</td>

                      {/*  <td className="flex items-center px-6 py-4 space-x-3">
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
                    </td> */}
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>

       

        <div className="mt-10">
          <span className="text-2xl">Total Amount Spent:</span>{" "}
          <span className="text-2xl font-bold">{`₦${pricesTotal}`}</span>
        </div>
        <div className="mt-10">
          <span className="text-2xl">Last Visited:</span>
          <span className="text-2xl font-bold">{`${lastVisitedDate()}`}</span>
          <span className="text-red-400 ml-5 text-2xl font-bold">({`${monthDistance()}  ${monthDistance > 1 ? "Months Ago":"Month Ago"}`}) </span>
        </div>

        <div>
          <h2 className="font-bold text-2xl text-center p-4 my-10 underline">
            Products that may interest this customer
          </h2>
          <Table array={difference} />
        </div>

        <div
          className=" w-full lg:grid lg:grid-cols-2 flex flex-col my-5 gap-5  items-center justify-center"
          id="stats"
        >
          <div className="grid p-3 shadow-xl w-[600px] bg-white rounded-md">
            <h2 className="border-b-2 border-black font-bold">
              Purchase History Comparison
            </h2>
            <Bar data={barChartData} options={options} width={600} />
          </div>
          <div className="grid p-3 shadow-xl w-[600px] bg-white rounded-md">
            <h2 className="border-b-2 border-black font-bold">
              Quantity Distribution by Product
            </h2>
            <Pie data={pieChartData} options={options} width={600} />
          </div>
          <div className="grid p-3 shadow-xl w-[600px] bg-white rounded-md">
            <h2 className="border-b-2 border-black font-bold">
              Purchase History Trends
            </h2>
            <Line data={data} options={options} width={600} />
          </div>
        </div>
      </div>
    </>
  ) : (
   <Loading />
  );
};

export default History;
