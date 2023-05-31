import React, { useEffect } from "react";
import Table from "./table/Table";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import NavBar from "./components/customer/Nav";
import CustomerProvider from "./providers/CustomerProvider";
import Test from "./components/Test";
import Customers from "./components/Customers";
import Customer from "./components/customer/Customer";
import Profile from "./components/customer/Profile";
import History from "./components/customer/History";
import { doc, updateDoc, setDoc } from 'firebase/firestore';
import { db } from './firebase/firebaseconfig';
import Messaging from "./components/customer/Messaging";
import { v4 } from "uuid";
import AuthComponent from './components/AuthComponent'
import StaffProvider from "./providers/StaffProvider";
import {Toaster} from 'react-hot-toast'
import Protected from "./components/Protected";

const App = () => {

  

  const fakeNigerianEmails = [
    'john.doe@example.com',
    'jane.doe@example.com',
    'emma.smith@example.com',
    'oliver.wilson@example.com',
    'sarah.johnson@example.com',
    'david.brown@example.com',
    'emily.jones@example.com',
    'michael.thomas@example.com',
    'linda.jackson@example.com',
    'samuel.clark@example.com',
    'jennifer.williams@example.com',
    'matthew.white@example.com',
    'alice.green@example.com',
    'andrew.lee@example.com',
    'sophia.harris@example.com',
    'nathan.taylor@example.com',
    'laura.martin@example.com',
    'daniel.walker@example.com',
    'olivia.moore@example.com',
    'james.king@example.com'
  ];
  

  const nigerianNames = [
    'Adeola',
    'Chidimma',
    'Emeka',
    'Folake',
    'Gbenga',
    'Hassan',
    'Ifeoma',
    'Jide',
    'Kemi',
    'Lekan',
    'Mojisola',
    'Nkechi',
    'Oluwaseun',
    'Patience',
    'Quadri',
    'Ronke',
    'Segun',
    'Temitope',
    'Uche',
    'Victoria'
  ];

  const fakeNigerianPhoneNumbers = [
    '2347012345678',
    '2348023456789',
    '2349034567890',
    '2347045678901',
    '2348056789012',
    '2349067890123',
    '2347078901234',
    '2348089012345',
    '2349090123456',
    '2347101234567',
    '2348112345678',
    '2349123456789',
    '2347134567890',
    '2348145678901',
    '2349156789012',
    '2347167890123',
    '2348178901234',
    '2349189012345',
    '2347190123456',
    '2348201234567'
  ];

  const nigerianSurnames = [
    'Okafor',
    'Nwachukwu',
    'Eze',
    'Ugwu',
    'Okonkwo',
    'Obi',
    'Okeke',
    'Adeboye',
    'Ogunjimi',
    'Olowo',
    'Okoye',
    'Oluwaseun',
    'Ajayi',
    'Olawale',
    'Okechukwu',
    'Oladipo',
    'Ogunsanya',
    'Ogundipe',
    'Ogunleye',
    'Ojo'
  ];

  const customerStatusArray = ["VIP", "New", "Loyal"]
  

  const randomNumberIndex =  Math.floor(Math.random() * fakeNigerianPhoneNumbers.length)
  const randomNameIndex =  Math.floor(Math.random() * nigerianNames.length)
  const randomEmailIndex =  Math.floor(Math.random() * fakeNigerianEmails.length)
  const randomSurnameIndex =  Math.floor(Math.random() * nigerianSurnames.length)
  const randomCustomerTagIndex =  Math.floor(Math.random() * customerStatusArray.length)

  const unique = v4()
  console.log(unique);
  async function nawa() {
    const customerId = "thethirdid";

    const customerRef = doc(db, "customers",unique);

   

    

    const user = {
      firstname:nigerianNames[randomNameIndex],
      lastname:nigerianSurnames[randomSurnameIndex],
      email:fakeNigerianEmails[randomEmailIndex],
      lastvisit:"2023-02-23",
      phonenumber:fakeNigerianPhoneNumbers[randomNumberIndex],
      purchaseHistory:[

        {
          date: '2023-05-01',
          productID: 'Product 1',
          productName: 'Samsung Galaxy S8',
          price: 700,
          quantity: 3
        },
        {
          date: '2023-06-01',
          productID: 'Product 2',
          productName: 'iPhone 12',
          price: 1000,
          quantity: 5
        },
        {
          date: '2023-07-01',
          productID: 'Product 3',
          productName: 'Google Pixel 5',
          price: 800,
          quantity: 2
        },
        {
          date: '2023-08-01',
          productID: 'Product 4',
          productName: 'Sony PlayStation 5',
          price: 500,
          quantity: 1
        },
        {
          date: '2023-09-01',
          productID: 'Product 5',
          productName: 'LG OLED TV',
          price: 1500,
          quantity: 1
        },
        {
          date: '2023-10-01',
          productID: 'Product 6',
          productName: 'Apple MacBook Pro',
          price: 2000,
          quantity: 2
        },
        {
          date: '2023-11-01',
          productID: 'Product 7',
          productName: 'Dell XPS 13',
          price: 1200,
          quantity: 3
        },
        {
          date: '2023-12-01',
          productID: 'Product 8',
          productName: 'Nintendo Switch',
          price: 300,
          quantity: 4
        },
        {
          date: '2024-01-01',
          productID: 'Product 9',
          productName: 'Bose QuietComfort 35 II',
          price: 300,
          quantity: 2
        },
        {
          date: '2024-02-01',
          productID: 'Product 10',
          productName: 'Amazon Echo Dot',
          price: 50,
          quantity: 5
        }

      ],
      tag: customerStatusArray[randomCustomerTagIndex],
      messages:[]
      
      
      
    }

    const newPurchaseHistory = [
      {
        date: '2023-05-01',
        productID: 'Product 1',
        productName: 'Samsung Galaxy S8',
        price: 700,
        quantity: 3
      },
      {
        date: '2023-06-01',
        productID: 'Product 2',
        productName: 'iPhone 12',
        price: 1000,
        quantity: 5
      },
      {
        date: '2023-07-01',
        productID: 'Product 3',
        productName: 'Google Pixel 5',
        price: 800,
        quantity: 2
      },
      {
        date: '2023-08-01',
        productID: 'Product 4',
        productName: 'Sony PlayStation 5',
        price: 500,
        quantity: 1
      },
      {
        date: '2023-09-01',
        productID: 'Product 5',
        productName: 'LG OLED TV',
        price: 1500,
        quantity: 1
      },
      {
        date: '2023-10-01',
        productID: 'Product 6',
        productName: 'Apple MacBook Pro',
        price: 2000,
        quantity: 2
      },
      {
        date: '2023-11-01',
        productID: 'Product 7',
        productName: 'Dell XPS 13',
        price: 1200,
        quantity: 3
      },
      {
        date: '2023-12-01',
        productID: 'Product 8',
        productName: 'Nintendo Switch',
        price: 300,
        quantity: 4
      },
      {
        date: '2024-01-01',
        productID: 'Product 9',
        productName: 'Bose QuietComfort 35 II',
        price: 300,
        quantity: 2
      },
      {
        date: '2024-02-01',
        productID: 'Product 10',
        productName: 'Amazon Echo Dot',
        price: 50,
        quantity: 5
      }
    ];
    
    try {
      
      const userRef = doc(db, 'customers', unique); // Replace 'user_id' with the desired ID for the user
  
      await setDoc(userRef, user);
      console.log('User added successfullyLALALA ');
    } catch (error) {
      console.error('Error adding user:', error);
    }

    
    

    /* try {
      await updateDoc(customerRef, {
        purchaseHistory: newPurchaseHistory
      });

      console.log("purchaseHistory field updated successfully");
    } catch (error) {
      console.error("Error updating purchaseHistory field:", error);
    } */
  }


    console.log("tat a",randomNumberIndex);
    

  /* useEffect(() => {
    nawa();
  }, []); */

  return (
    <>

    <Toaster />
    
     <StaffProvider>
     <CustomerProvider>
     
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Protected><Nav /></Protected>}>
              <Route path="/" index element={<Customers />} />
            </Route>

            <Route path="/customer/:id" element={<Protected><NavBar /></Protected>}>
              <Route path="/customer/:id" element={<Protected><Customer /></Protected>} />
              <Route path="/customer/:id/history" element={<Protected><History/></Protected>} />
              <Route path="/customer/:id/messaging" element={<Protected><Messaging /></Protected>} />
            </Route>

            <Route path="/auth" element={<AuthComponent/>} />
          </Routes>
        </BrowserRouter>
      </CustomerProvider>
     </StaffProvider>
    </>
  );
};

export default App;
