import axios from 'axios'
import React, { useEffect, useState } from 'react'

function SubscriptionTable(props) {


    const [subscriptions, setSubscriptions] = useState([])
    const [endDate, setEndDate] = useState("")
    const [data,setData] = useState({})
    const [total,setTotal] = useState(0)
    const totalMoney = ()=>{
        let total = 0
        subscriptions.forEach((subscription)=>{
            props.products.forEach((product)=>{
               if(product.name === subscription.product_name){
                    total += subscription.no_of_user_subscriber * product.cost
               }
            })
        })
        setTotal(total)
    }
    
    const getAllSubscription = () =>{
        axios.get("http://localhost:8000").then((res)=>{
        setSubscriptions(res.data)
    }).catch((err)=>{
        console.log(err)
    })
    }
   useEffect(()=>{
    getAllSubscription();
   },[])
   const setDataModel = (subscription) =>{
    console.log(subscription)
    setData(subscription)
   }
   const handleSubmit = (e) =>{
    axios.patch(`http://localhost:8000/${data.id}/`,data={"end_date":endDate})
    .then((res)=>{
        getAllSubscription()
    }).catch((err)=>console.log(err))
   }
   
  return (
    <div className='container mt-3'>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <h3 className='text-uppercase'>Subscription List</h3>
            <h4>Total Revenue: <strong className='text-danger'>$ {total}</strong>
                <button type='button' className='btn btn-primary mx-2' onClick={totalMoney}>Total Revenue</button>    
            </h4>
        </div>
        <table className='table table-dark table-hober table-striped text-center'>
            <thead>
                <tr>
                    <th>Customer Name</th>
                    <th>Product Name</th>
                    <th>Starting Date</th>
                    <th>Ending Date</th>
                    <th>No of Users</th>
                    <th>Update Subscription</th>
                </tr>
            </thead>
            { subscriptions.length > 0 ? <tbody>
                {
                    subscriptions.map((subscription)=>{
                        return (<tr key={subscription.id}>
                            <td>{props.customers[parseInt(subscription.customer_id)]}</td>
                            <td>{subscription.product_name}</td>
                            <td>{subscription.start_date}</td>
                            <td>{subscription.end_date}</td>
                            <td>{subscription.no_of_user_subscriber}</td>
                            <td>
                                <button type='button' className='btn btn-info' onClick={()=>setDataModel(subscription)} 
                                    data-bs-toggle="modal" data-bs-target="#myModal" 
                                    style={{padding:"0px",width:"80px",height:"30px"}}>
                                        Update
                                </button>
                            </td>
                        </tr>)
                    })
                }
                </tbody>:""
            }   
        </table>
        <div className="modal" id="myModal">
            <div className="modal-dialog">
                <div className="modal-content">

                    <div className="modal-header">
                        <h4 className="modal-title">
                            Update Subscription
                        </h4>
                        <button type="button" className="btn-close" data-bs-dismiss="modal">

                        </button>
                    </div>

        
                    <div className="modal-body">
                       <form onSubmit={handleSubmit}>
                            <div className='mb-3'>
                                <label htmlFor='endDate' className='mb-2'>Ending Date:</label>
                                <input type={"date"}
                                    className="form-control"
                                    name='endDate'
                                    value={endDate}
                                    onChange={(e)=>setEndDate(e.target.value)}
                                    required
                                />
                            </div>
                            <div className='d-grid'>
                                <button type='submit' className='btn btn-success' data-bs-dismiss="modal">Update Subscription</button>
                            </div>
                       </form>
                    </div>

                </div>
            </div>
        </div>
    </div>
  )
}

export default SubscriptionTable