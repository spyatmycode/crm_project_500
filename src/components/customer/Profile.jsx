import React, { useContext, useEffect, useState } from 'react';
import Customer from './Customer';
import Test from '../Test';
import { CustomersDb } from '../../providers/CustomerProvider';
import { useParams } from 'react-router-dom';

const Render = ({ channel }) => {
  console.log(typeof channel);

  const {id} = useParams()


  console.log(id);

  const {customer, setCustomer} = useContext(CustomersDb)


  const [c, setC] = useState(channel)

  useEffect(()=>{
    setCustomer(id)
  },[id])

  console.log("HIIIIIIII",customer);

  console.log(c);

  switch(c){
    case 0 : return 
  }
  // Add a default return value here
  return <Test />;
};

export default Render;
