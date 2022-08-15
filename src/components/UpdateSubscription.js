import React from 'react'

function UpdateSubscription() {

    const [formData, setFormData] = useState({
        customer_id:'1',
        product_name:'Bag',
        start_date:"",
        end_date:"",
        no_of_users:""
      }) 
  
      const getCheckSubscription = () =>{
        axios.get(`http://localhost:8000/subscription_check/${formData.customer_id}/${formData.product_name}/`)
        .then((res)=>{
          console.log(res.data)
          if(res.status === 200){
            alert(`${formData.product_name} Product Subscription exits for this User`);
            return
          }
        }).catch((err)=>{
          addSubscription();
        })
      }
  
      const addSubscription = () =>{
        axios.post(`http://localhost:8000`,formData)
        .then((res)=>{
          console.log(res.data)
        }).catch((err)=>{
          console.log(err.response)
        })
      }
  
      const handleSubmit = (e) =>{
        e.preventDefault();
  
        if(formData.start_date.trim() === ""){
          alert("Please Select Starting Date")
          return
        }
        if(formData.end_date.trim() === ""){
            alert("Please Select Ending Date and Ending must be greater than starting date")
          return
        }
        if(formData.no_of_users.trim() === "" || formData.no_of_users <=0){
          alert("No of User Must be greater than 0")
          return
        }
        
        console.log(formData)
        getCheckSubscription();
      }
    return (
      <div className='container'>
          <h3 className='text-uppercase'> Update Subscription</h3>
          <form onSubmit={handleSubmit}>
              <div className='mb-3'>
                  <label htmlFor='customer'>Select Customer:</label>
                  <select className='form-select' name='customer_id' value={formData.customer_id}
                    onChange={(e)=>setFormData({...formData,customer_id:e.target.value})}>
                      {
                        props.customers.map((customer)=>{
                          return(
                            <option key={customer.id} value={customer.id}>
                              {customer.name.toString().toUpperCase()}
                            </option>
                          )
                        })
                      }
                  </select>
              </div>
              <div className='mb-3'>
                <label htmlFor='product'>Select Product:</label>
                  <select className='form-select' name='product_name' value={formData.product_name}
                    onChange={(e)=>setFormData({...formData,product_name:e.target.value})}>
                      {
                        props.products.map((product)=>{
                          return(
                            <option key={product.name} value={product.name}>
                              {product.name.toString().toUpperCase()}
                            </option>
                          )
                        })
                      }
                  </select>
              </div>
              <div className='mb-3'>
                <label htmlFor='startDate'>Starting Date:</label>
                  <input type={"date"}
                    className="form-control"
                    name='start_date'
                    value={formData.start_date}
                    placeholder="Enter start Date"
                    onChange={(e)=>setFormData({...formData,start_date:e.target.value})}
                    required
                    />
              </div>
              <div className='mb-3'>
              <label htmlFor='endDate'>Ending Date:</label>
                  <input type={"date"}
                    className="form-control"
                    name='end_date'
                    value={formData.end_date}
                    onChange={(e)=>setFormData({...formData,end_date:e.target.value})}
                    required
                    />
              </div>
              <div className='mb-3'>
              <label htmlFor='noOfUsers'>Number of Users:</label>
                  <input type={"number"}
                    className="form-control"
                    name='no_of_users'
                    value={formData.no_of_users}
                    placeholder="Enter number of users"
                    onChange={(e)=>setFormData({...formData,no_of_users:e.target.value})}
                    required
                    />
              </div>
              <div className='d-grid'>
                  <button type='submit' className='btn btn-success'>Add Subscription</button>
              </div>
          </form>
      </div>
    )
  }

export default UpdateSubscription