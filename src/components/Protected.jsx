import React from 'react'
import { useContext } from 'react'
import { Navigate } from 'react-router'
import { staffContext } from '../providers/StaffProvider'


const Protected = ({children}) => {

    const {staff} = useContext(staffContext)

    console.log("this is the staff",staff);


    if(staff === null){
        return < Navigate to={'/auth'}/>
    }

    

     
    return children
    
   

    


   
 
}

export default Protected