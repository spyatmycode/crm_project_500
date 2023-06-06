import React, { useContext, useState } from "react";
import { CustomersDb } from "../../providers/CustomerProvider";
import { FaPlusCircle } from "react-icons/fa";
import { db } from "../../firebase/firebaseconfig";
import { updateDoc, doc, setDoc, getDoc } from "firebase/firestore";
import { staffContext } from "../../providers/StaffProvider";
import { toast } from "react-hot-toast";
import { products } from "../Products";

const EditModal = ({
  setModalOpen,
  phonenumber,
  email,
  firstname,
  messages,
  staffID
}) => {
  const newDate = new Date().getTime();
  

  const { customer, database, setSuggestion } = useContext(CustomersDb);

  const currentCustomer =
    database && database.find((customerr) => customerr.id === customer);

  const generalInfo =
    currentCustomer && currentCustomer._document.data.value.mapValue.fields;
  const {
    purchaseHistory,
  } = generalInfo || {};

  const history = database && purchaseHistory.arrayValue.values;

  const categories =
    purchaseHistory &&
    purchaseHistory.arrayValue?.values.map((each) => {
      const { category } = each.mapValue.fields;

      return category.stringValue;
    });

  const catMap = new Map();

  for (let i = 0; i < categories.length; i++) {
    if (!catMap.has(categories[i])) {
      catMap.set(categories[i], 1);
    } else {
      catMap.set(categories[i], catMap.get(categories[i]) + 1);
    }
  }

  console.log(catMap);

  let maxCount = 0;
  let mostFrequentCategory = null
  catMap.forEach((values, keys) => {
    if (values > maxCount) {
      maxCount = values;
      mostFrequentCategory = keys
    }
  });

  console.log(products, history);

  const currentPurchaseHistory  = history && history.map((each)=>{
    const {category, productID, productName, price, quantity, description}= each.mapValue.fields

    return {
      id: productID.stringValue,
      name: productName.stringValue,
      category: category.stringValue,
      quantity: quantity.integerValue,
      price: price.integerValue,
      
    }
  })

  console.log(currentPurchaseHistory,"dada");

  const mostFreqProducts = products.filter((each)=> each.category === mostFrequentCategory).sort((a,b)=> a.price - b.price).slice(0,5)

  console.log(mostFreqProducts);

  const difference = mostFreqProducts.filter((obj1) => {
    // Check if there is no object in array2 with the same id
    return !currentPurchaseHistory.some((obj2) => obj2.name === obj1.name);
  });


  let simpleMessage = `
  Subject: New Product Recommendation

Dear ${firstname},
We hope this message finds you well. We wanted to inform you about a new product that we believe might be of interest to you based on your purchase history and preferences.

Product Details:
Name: ${difference[0].name}
Category: ${difference[0].category}
Description: ${difference[0].description}
Price:$ ${difference[0].price}

Feel free to visit our website or contact our customer support if you have any questions or would like to place an order. We value your continued support and look forward to serving you with the best products and services.

Best regards,
Darren's Store.

  
  `

  const [message, setMessage] = useState({
    number: phonenumber,
    staffID: staffID,
    email: email,
    message: simpleMessage /* || `Hey there ${firstname}. We haven't see you in a while. How about you come check out some great deals that we have in store for you` */,
    date: newDate,
  });

  console.log(difference);
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Get the reference to the document
      const docRef = doc(db, "customers", customer);

      // Retrieve the current document data
      const docSnap = await getDoc(docRef);
      const existingMessages = docSnap.data().messages || [];

      // Update the messages array
      const updatedMessages = [...existingMessages, message];

      // Set the updated messages array to the document
      await setDoc(docRef, { messages: updatedMessages }, { merge: true });

      console.log("Document updated successfully!");
    } catch (error) {
      console.error("Error updating document:", error);
    }

    try {
      const response = await fetch('https://crm-server-500.onrender.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(message)
      });
  
      const data = await response.json();
      console.log(data); // Handle the response from the server
      toast.success("Success: Message sent successfully")
      setModalOpen(false)
      
    } catch (error) {
      setModalOpen(false)
      console.error('Error:', error);
      toast.error(error)
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMessage({ ...message, [name]: value });
    console.log(message);
  };

  const removeModal = (e) => {
    if (e.target.id === "nothing") {
      setModalOpen(false);
    }
  };

  return (
    <div
      className="w-full h-full fixed top-0 bg-opacity-25 flex justify-center items-center bg-[#f4f4f493]"
      onClick={(e) => removeModal(e)}
      id="nothing"
    >
      <div className="flex p-5 bg-white shadow-lg rounded-md flex-col modal">
        <h2 className="text-center text-2xl font-bold">SEND A MESSAGE</h2>

        <form className="my-7 w-full" onSubmit={(e) => handleSubmit(e)}>
          <div className="flex flex-col px-7 w-full">
            {/* <h2 className="text-xl font-semibold">General Information</h2> */}
            <div className="flex gap-4 w-full">
              <div className="w-full">
                <h2 className="font-bold">Staff ID</h2>
                <input
                  type="text"
                  className="w-full outline-none border-2 p-2 border-blue-400"
                  onChange={handleChange}
                  value={staffID}
                  name="staffID"
                />
              </div>
            </div>
            <h2 className="text-xl font-semibold mt-4">Contact Information</h2>
            <div className="flex gap-4">
              <span>
                <div>
                  <h2>Phone Number</h2>
                  <input
                    type="text"
                    className="outline-none border-2 p-2 border-blue-400"
                    defaultValue={phonenumber}
                    name="number"
                    onChange={handleChange}
                  />
                </div>
              </span>
              <span>
                <div>
                  <h2>Email</h2>
                  <input
                    type="text"
                    className="outline-none border-2 p-2 border-blue-400"
                    defaultValue={email}
                    onChange={handleChange}
                    name="email"
                  />
                </div>
              </span>
            </div>

            <h2 className="text-xl font-semibold mt-4">MESSAGE</h2>

            <span>
              <textarea
                onChange={handleChange}
                name="message"
                id=""
                cols="30"
                rows="10"
                className="outline-none border-2 p-2 border-blue-400 w-full"
                defaultValue={`${simpleMessage}`}
              ></textarea>
            </span>

            <div className="flex gap-4 items-end justify-between w-full">
              <span className="flex gap-3">
                <button
                  className="px-4 py-3 bg-red-600 text-white rounded-md"
                  onClick={() => setModalOpen(false)}
                >
                  Cancel
                </button>
                <button className="px-4 py-3  bg-sky-500 text-white rounded-md">
                  Send
                </button>
              </span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

const Messaging = () => {
  const [message, setMessage] = useState();
  const [modalOpen, setModalOpen] = useState(false);

  const { database, customer } = useContext(CustomersDb);

  const currentCustomer =
    database && database.find((each) => each.id === customer);

    const {staffDetails} = useContext(staffContext)

    console.log("HAHAQ", staffDetails);

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
    messages,
  } = generalInfo || {};

  console.log(database);

  console.log(messages, "DEEZ MEssages");
  return (
    database ? <>
      {database ? (
        <div className="w-full flex flex-col justify-center  h-full p-10 lg:grid lg:grid-cols-4 gap-10">
          <div
            className="w-[300px] h-[300px] flex justify-center items-center text-[#3B73C6] bg-white rounded-lg shadow-lg cursor-pointer"
            onClick={() => setModalOpen(true)}
          >
            <span className="flex justify-center items-center flex-col gap-5">
              <FaPlusCircle size={40} />
              <h2>Send a new message</h2>
            </span>
          </div>
          

         

{(messages  ) ? messages.arrayValue.values?.length > 0 && messages.arrayValue.values.map((eachValue, index) => {
  const { date, email, message, number, staffID } = eachValue.mapValue.fields;
  const timeStamp = date.integerValue * 1;

  const day = new Date(timeStamp).getDate() > 10 ? new Date(timeStamp).getDate() : `0${new Date(timeStamp).getDate()}`;
  const month = new Date(timeStamp).getMonth() + 1 > 10 ? 1 + new Date(timeStamp).getMonth() : `0${new Date(timeStamp).getMonth() + 1}`;
  const year = new Date(timeStamp).getFullYear();

  const fullDate = `${year}-${month}-${day}`;

  return (
    <div
      key={index}
      className="w-[300px] h-[300px] flex justify-center items-center text-[#3B73C6] bg-white rounded-lg shadow-lg cursor-pointer flex-col font-bold"
    >
      <h2 className="text-red-500">STAFFID: {staffID.stringValue}</h2>
      <span className="flex justify-center items-center flex-col gap-5">
        <textarea className="border-blue-400 outline-none border-2 p-2" name="" id="" cols="25" rows="7" defaultValue={message.stringValue}></textarea>

        <div className="text-black flex w-full justify-evenly items-center">
          <span>{fullDate}</span>
          <span>...</span>
        </div>
      </span>
    </div>
  );
}): <div className="">No available messages at this time</div>}

        </div>
      ) : (
        <div>Loading...</div>
      )}

      {modalOpen && (
        <EditModal
          setModalOpen={setModalOpen}
          phonenumber={phonenumber.stringValue}
          email={email.stringValue}
          firstname={firstname.stringValue}
          customer={customer}
          messages={messages}
          staffID={staffDetails.staffID}
        />
      )}
    </>: <div>loading</div>
  );
};

export default Messaging;
