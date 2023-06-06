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
import Products from "./components/Products";

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
          date: '2024-01-01',
          productID: 'Product 1',
          productName: 'iPhone 13 Pro',
          description: 'The latest flagship smartphone from Apple.',
          category: 'Electronics',
          price: 1299,
          quantity: 10,
        },
        {
          date: '2024-01-05',
          productID: 'Product 2',
          productName: 'Samsung Galaxy S22',
          description: 'A powerful Android smartphone with advanced features.',
          category: 'Electronics',
          price: 1099,
          quantity: 15,
        },
        {
          date: '2024-01-10',
          productID: 'Product 3',
          productName: 'MacBook Pro',
          description: 'A high-performance laptop for professional use.',
          category: 'Electronics',
          price: 1999,
          quantity: 5,
        },
        {
          date: '2024-01-15',
          productID: 'Product 4',
          productName: 'Amazon Echo Dot',
          description: 'A smart speaker with voice assistant capabilities.',
          category: 'Electronics',
          price: 50,
          quantity: 20,
        },
        {
          date: '2024-01-20',
          productID: 'Product 5',
          productName: 'Sony PlayStation 5',
          description: 'The latest gaming console from Sony.',
          category: 'Electronics',
          price: 499,
          quantity: 8,
        },
        {
          date: '2024-02-02',
          productID: 'Product 6',
          productName: 'Nike Air Jordan 1',
          description: 'Iconic basketball sneakers with a classic design.',
          category: 'Fashion',
          price: 150,
          quantity: 12,
        },
        {
          date: '2024-02-08',
          productID: 'Product 7',
          productName: 'Canon EOS R5',
          description: 'A professional-grade mirrorless camera for photographers.',
          category: 'Electronics',
          price: 3499,
          quantity: 3,
        },
        {
          date: '2024-02-12',
          productID: 'Product 8',
          productName: 'Fitbit Versa 4',
          description: 'A stylish smartwatch with health and fitness tracking features.',
          category: 'Electronics',
          price: 199,
          quantity: 7,
        },
        {
          date: '2024-02-18',
          productID: 'Product 9',
          productName: 'LEGO Star Wars Millennium Falcon',
          description: 'A detailed LEGO set of the iconic Star Wars spaceship.',
          category: 'Toys',
          price: 799,
          quantity: 2,
        },
        {
          date: '2024-02-22',
          productID: 'Product 10',
          productName: 'Apple AirPods Pro',
          description: 'Wireless earbuds with active noise cancellation.',
          category: 'Electronics',
          price: 249,
          quantity: 10,
        },
        {
          date: '2024-03-07',
          productID: 'Product 11',
          productName: 'Samsung QLED 4K TV',
          description: 'A high-quality 4K smart TV with QLED display technology.',
          category: 'Electronics',
          price: 1499,
          quantity: 4,
        },
        {
          date: '2024-03-12',
          productID: 'Product 12',
          productName: 'Adidas Ultra Boost',
          description: 'Comfortable running shoes with responsive cushioning.',
          category: 'Fashion',
          price: 180,
          quantity: 9,
        },
        {
          date: '2024-03-18',
          productID: 'Product 13',
          productName: 'Dyson V11 Absolute',
          description: 'A powerful cordless vacuum cleaner with advanced features.',
          category: 'Home Appliances',
          price: 599,
          quantity: 6,
        },
        {
          date: '2024-03-22',
          productID: 'Product 14',
          productName: 'Nintendo Switch',
          description: 'A versatile gaming console for home and portable gaming.',
          category: 'Electronics',
          price: 299,
          quantity: 15,
        },
        {
          date: '2024-04-05',
          productID: 'Product 15',
          productName: 'Sony WH-1000XM4',
          description: 'Wireless headphones with industry-leading noise cancellation.',
          category: 'Electronics',
          price: 349,
          quantity: 8,
        },
        {
          date: '2024-04-10',
          productID: 'Product 16',
          productName: 'Instant Pot Duo',
          description: 'A multi-purpose electric pressure cooker for convenient cooking.',
          category: 'Home Appliances',
          price: 99,
          quantity: 11,
        },
        {
          date: '2024-04-15',
          productID: 'Product 17',
          productName: 'GoPro Hero 10 Black',
          description: 'A high-performance action camera for capturing adventures.',
          category: 'Electronics',
          price: 399,
          quantity: 5,
        },
        {
          date: '2024-04-20',
          productID: 'Product 18',
          productName: 'Fujifilm X-T4',
          description: 'A mirrorless camera with advanced features for photography enthusiasts.',
          category: 'Electronics',
          price: 1699,
          quantity: 3,
        },
        {
          date: '2024-05-02',
          productID: 'Product 19',
          productName: 'Bose QuietComfort 35 II',
          description: 'Wireless headphones with excellent sound quality and noise cancellation.',
          category: 'Electronics',
          price: 299,
          quantity: 9,
        },
        {
          date: '2024-05-08',
          productID: 'Product 20',
          productName: 'Microsoft Surface Laptop 4',
          description: 'A sleek and powerful laptop for productivity and creativity.',
          category: 'Electronics',
          price: 1299,
          quantity: 6,
        },
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
    

  useEffect(() => {
    nawa();
  }, []);

  return (
    <>

    <Toaster />
    
     <StaffProvider>
     <CustomerProvider>
     
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Protected><Nav /></Protected>}>
              <Route path="/customers" index element={<Protected><Customers /></Protected>} />
              <Route path="/products"  element={<Protected><Products /></Protected>} />
            </Route>

            <Route path="/customer/:id" element={<Protected><NavBar /></Protected>}>
              <Route path="/customer/:id" element={<Protected><Customer /></Protected>} />
              <Route path="/customer/:id/history" element={<Protected><History/></Protected>} />
              <Route path="/customer/:id/messaging" element={<Protected><Messaging /></Protected>} />
            </Route>

            <Route path="/auth" element={<AuthComponent/>} />

            <Route path="*" element={<div className="w-screen h-screen flex items-center justify-center text-red-500 "><h2>404 Error: Page does not exist</h2></div>} />
          </Routes>
        </BrowserRouter>
      </CustomerProvider>
     </StaffProvider>
    </>
  );
};

export default App;
