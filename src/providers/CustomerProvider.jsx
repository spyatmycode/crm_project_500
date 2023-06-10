import React, { createContext, useContext, useEffect, useState } from "react";
import { doc, getDoc ,getDocs, collection} from "firebase/firestore";
import { db } from "../firebase/firebaseconfig";

export const CustomersDb = createContext();

const CustomersProvider = ({ children }) => {
  const [database, setDatabase] = useState()

  const [customer, setCustomer] = useState()

  const [suggestion, setSuggestion] = useState(null)
//   const { user } = useContext(AuthContext);
let user ="nifemi"

  const getData =async () => {
    const ref =  collection(db,"customers")
    const fetchData = await getDocs(ref)

    if(fetchData){
        console.log("DOCSSS",fetchData);
        setDatabase(fetchData.docs)
    }
    
   
  };

  useEffect(() => {
    const getData =async () => {
      const ref =  collection(db,"customers")
      const fetchData = await getDocs(ref)
  
      if(fetchData){
          console.log("DOCSSS",fetchData);
          setDatabase(fetchData.docs)
      }
      
     
    };
    const unsubscribe = getData();
    return () => {

      // Clean up the event listener when the component unmounts or when `user` changes
   /*    if (unsubscribe) {
        unsubscribe();
      } */
    };
  }, [user,db]);

  return (
    <CustomersDb.Provider value={{database, setCustomer, customer, setSuggestion}}>
      {children}
    </CustomersDb.Provider>
  );
};

export default CustomersProvider
