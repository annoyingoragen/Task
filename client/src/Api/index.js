import axios from  'axios';




const API=axios.create({baseURL:'http://localhost:5000/' ,withCredentials: true,});

API.interceptors.request.use((req)=>{
    console.log(req);
    
    return req;
});

const config = { headers: { "Content-Type": "application/json" } };

export const getemailotp=(formData)=>API.post('/emailotp',formData,config);

export const verifyemailotp=(formData)=>API.post('/verifyemailotp',formData,config);
export const getmobileotp=(formData)=>API.post('/mobileotp',formData,config);

export const verifymobileotp=(formData)=>API.post('/verifymobileotp',formData,config);

export const register=(formData)=>API.post('register',formData,config);
export const updateUser=(userId,formData)=>API.put(`updateUser/${userId}`,formData);



export const getresponsefromai=(prompt)=>API.get(`getresponsefromai/${prompt}`);
