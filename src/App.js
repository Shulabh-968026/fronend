import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import SubscriptionForm from './components/SubscriptionForm';
import SubscriptionTable from './components/SubscriptionTable';

const App = () => {

  const [products, setProducts] = useState([])
  const [customers,setCustomers] = useState([])
  

  useEffect(()=>{
    axios.get("http://localhost:8000/product").then((res)=>{
      console.log(res.data)
      setProducts(res.data)
    }).catch(err=>console.log(err))

    axios.get("http://localhost:8000/customer").then((res)=>{
      console.log(res.data)
      setCustomers(res.data)
    }).catch(err=>console.log(err))
  },[])

  const custName = [""]
  if(customers){
    customers.map((customer)=>custName.push(customer.name))
  }
  console.log(custName)
  return (
    <>
      <SubscriptionForm products={products} customers={customers} />
      <SubscriptionTable customers={custName} products={products}/>
    </>
  );
}

export default App;
