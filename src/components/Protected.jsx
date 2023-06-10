import React from 'react'
import { useContext } from 'react'
import { Navigate } from 'react-router'
import { staffContext } from '../providers/StaffProvider'


const Protected = ({children}) => {

    const {staff} = useContext(staffContext)

    const localStaff = JSON.parse(localStorage.getItem("staff"))

    console.log(localStaff);

    console.log("this is the staff",staff);


    if(staff !== null  || localStaff){
        return children
    }

    

     
    return < Navigate to={'/auth'}/>
    
   

    


   
 
}

export default Protected