import React, { useContext, useState } from "react";
import { CustomersDb } from "../providers/CustomerProvider";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { data } from "autoprefixer";
import { Link } from "react-router-dom";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseconfig";
import { toast } from "react-hot-toast";


const DeleteModal= ({setModal, setDeleteUser, deleteUser, deleteFunction})=>{
  return(
    
      <div className=" backdrop-blur-[1px] fixed top-0 z-40 w-full h-full bg-brightness-50 flex justify-center items-center">

        <div className="modal w-[400px] h-[300px] flex justify-center items-center flex-col rounded-md shadow-lg bg-white ">

          <h2 className="text-red-700 mx-5 font-bold">
            WARNING
          </h2>

          <h1 className="font-bold text-center">
            Are you sure want to delete this customer's records?
          </h1>
          <div className="flex gap-5 my-5">
            <button className="bg-red-600 p-3 rounded-md text-white" onClick={()=>deleteFunction(deleteUser)}>
              Delete
            </button>
            <button className="bg-blue-600 p-3 rounded-md text-white" onClick={()=>{setModal(false); setDeleteUser("")}}>
              Cancel
            </button>
          </div>

        </div>

      </div>
    
  )
}

const Customers = () => {
  const { database , setCustomer} = useContext(CustomersDb);
  
  console.log(database);
  const [query, setQuery] = useState("");

  const [modal, setModal] = useState(false)
  const [deleteUser, setDeleteUser] = useState()

  const deleteUserFromDb = async(id)=>{
      const deleteRef = doc(db,"customers",id )

      await deleteDoc(deleteRef).then(()=>{toast.success("Success: User has been deleted."); setModal(false)}).catch((err)=>toast.error(err.message))

      window.location.reload()
  }

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

  console.log(filteredList());

  console.log("This is the delete user",deleteUser);

  return (
    <div className="relative  sm:rounded-lg mx-10 my-10">
      <h2 className="text-2xl font-bold underline text-blue-500 text-center">

        Table of Customers

      </h2>
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

              console.log({
                firstname,
                lastname,
                phonenumber,
                lastvisit,
                email,
                purchaseHistory,
                tag,
              });

              const totalAmount = purchaseHistory.arrayValue.values

     
              const total = totalAmount.map((each)=>{
                const {quantity, price} = each.mapValue.fields

                return Number(quantity.integerValue) * Number(price.integerValue)
              })

              const finalTotal = total.reduce((acc, current)=> acc + current,0)

         

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
                  &#8358;{finalTotal}
                  </td>
                  <td className="px-6 py-4">{tag.stringValue}</td>
                  <td className="flex items-center px-6 py-4 space-x-3" >
                    <span onClick={()=>{setCustomer(customer.id); localStorage.setItem("currentCID",JSON.stringify(customer.id))}}> 
                    <Link to={`/customer/${customer.id}`}>
                    <span
                      
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      
                    >
                      View
                    </span>
                    </Link>
                    </span>
                    <button
                      
                      className="font-medium text-red-600 dark:text-red-500 hover:underline"
                      onClick={()=>{setModal(true); setDeleteUser(customer.id)}}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      </div>

      {
        modal && <DeleteModal setModal={setModal} setDeleteUser={setDeleteUser} deleteFunction={deleteUserFromDb} deleteUser={deleteUser}/>
      }

      

      <div className="stats w-full lg:grid lg:grid-cols-1 flex flex-col place-content-center place-items-center gap-y-10 items-center my-10">
       
          <h1>Pie Chart for Stats</h1>
          <span>
          {database && <Pie data={tagChart} />}
          </span>
       
      </div>
    </div>
   
  );
};

export default Customers;


