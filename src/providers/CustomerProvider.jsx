import React, { createContext, useContext, useEffect, useState } from "react";
import { doc, getDoc ,getDocs, collection} from "firebase/firestore";
import { db } from "../firebase/firebaseconfig";

export const CustomersDb = createContext();

const CustomersProvider = ({ children }) => {
  const [database, setDatabase] = useState()

  const [customer, setCustomer] = useState()
//   const { user } = useContext(AuthContext);
let user ="nifemi"

  const getData =async () => {
    const ref =  collection(db,"customers")
    const fetchData = await getDocs(ref)

    if(fetchData){
        console.log(fetchData);
        setDatabase(fetchData.docs)
    }
    
   
  };

  useEffect(() => {
    const unsubscribe = getData();
    return () => {

      // Clean up the event listener when the component unmounts or when `user` changes
      /* if (unsubscribe) {
        unsubscribe();
      } */
    };
  }, [user,db]);

  return (
    <CustomersDb.Provider value={{database, setCustomer, customer}}>
      {children}
    </CustomersDb.Provider>
  );
};

export default CustomersProvider
