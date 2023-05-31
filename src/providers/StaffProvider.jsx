import React, { useEffect, useState } from 'react'
import { createContext } from 'react'
import { onAuthStateChanged } from "firebase/auth";

import {auth, db} from '../firebase/firebaseconfig'
import { doc, getDoc } from 'firebase/firestore';


export const staffContext = createContext()

const StaffProvider = ({children}) => {

    
 

    const [staff, setStaff] = useState(null)

    const [staffDetails, setStaffDetails] = useState()

    onAuthStateChanged(auth, (userauth) => {
        if (userauth) {
          setStaff(userauth);
          
        } else {
          setStaff(null);
        }
      });

      useEffect(()=>{
        const getStaff = async()=>{
            const staffRef = doc(db, "staff",staff.uid)

            
           const snapShot = await getDoc(staffRef)

           console.log(snapShot.data());

           setStaffDetails(snapShot.data())
        }

        getStaff()

        console.log("This is staff details",staffDetails)
      },[])

      useEffect(()=>{
        const getStaff = async()=>{
            const staffRef = doc(db, "staff",staff.uid)

            
           const snapShot = await getDoc(staffRef)

           console.log(snapShot.data());

           setStaffDetails(snapShot.data())
        }

        getStaff()

        console.log("This is staff details",staffDetails)
      },[staff])
  return (
    <staffContext.Provider value={{staff, setStaff, staffDetails}}>
        {children}
    </staffContext.Provider>
  )
}

export default StaffProvider