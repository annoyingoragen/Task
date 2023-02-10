import React, { useEffect, useState } from 'react';
import "./styles.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { updateUser } from '../Api';

function Details() {
    const [formData, setFormData] = useState({
        
        
    });
    useEffect(()=>{
        let user =  JSON.parse(
            localStorage.getItem( 'task-user')
          );
          setFormData({
            name: user.name,
            email: user.email,
            
            mobile: user.mobile,
            id:user._id
          })
    },[])
   
    

      const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      };
      
      const handleChange = (event) => {
        
        setFormData({ ...formData, [event.target.name]: event.target.value });
      };


      const handleSubmit=async(e)=>{
        e.preventDefault();
        
        console.log(formData)
        
          const {data}=await updateUser(formData.id,formData);
          console.log(data)
          if (data.success === false) {
            toast.error(data.message, toastOptions);
            
          }
          if (data.success === true) {
            var hours = 1; // to clear the localStorage after 1 hour
                   // (if someone want to clear after 8hrs simply change hours=8)
            var now = new Date().getTime();
            var setupTime = localStorage.getItem('setupTime');
           if (setupTime == null) {
               localStorage.setItem('setupTime', now)
              } else {
             if(now-setupTime > hours*60*60*1000) {
            localStorage.clear()
            localStorage.setItem('setupTime', now);
           }
    }
            localStorage.setItem(
              // process.env.REACT_APP_LOCALHOST_KEY,
              'task-user',
              JSON.stringify(data.userData)
            );
            
          }
      }
    
    
  return (
   <>
   <table id="customers">
  <tr>
    <th>Name</th>
    <th>Email</th>
    <th>Mobile #</th>
    
    
  </tr>
  <tr>
<td>
    {formData.name}
</td>
<td>
    {formData.email}
</td>
<td>
    {formData.mobile}
</td>
<td>
    
</td>
  </tr>
  </table>
  <form onSubmit={handleSubmit}>
  <input
   type="text"
   id="name"
   name="name"
   value={formData.name}
   placeholder="Name"
   onChange={handleChange}
 />


<input
   type="text"
   id="email"
   name="email"
   value={formData.email}
   placeholder="Email"
   onChange={handleChange}
 />
  <input
   type="text"
   id="mobile"
   name="mobile"
   value={formData.mobile}
   placeholder="Mobile"
   onChange={handleChange}
 />
  <input 
    type='submit'
    value="submit"
 />
</form>
 <ToastContainer />
</>


  )
}

export default Details