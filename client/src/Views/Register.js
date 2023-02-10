import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { 
  getemailotp,
  verifyemailotp,
  getmobileotp,
  verifymobileotp,
  register
} from '../Api'; 

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        emailOtp: '',
        mobile: '',
        mobileOtp: '',
        password: ''
      });

      const [isEmailVerified, setisEmailVerified] = useState(false)
      const [isMobileOTPValid, setisMobileOTPValid] = useState(false)

  const navigate=useNavigate();
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  useEffect(() => {
    if (localStorage.getItem('task-user')) {
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit=async(e)=>{
    e.preventDefault();
    if (handleValidation()) {
    
      const {data}=await register(formData);
      console.log(data)
      if (data.success === false) {
        toast.error(data.message, toastOptions);
        setisEmailVerified(false)
        setisMobileOTPValid(false)
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
          JSON.stringify(data.user)
        );
        navigate("/");
      }
  }
}



  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const handleValidation = () => {
    const { password,  email,mobile,name } = formData;
    if (!passwordRegex.test(password)) {
       
        toast.error('Password must have at least 8 characters, one uppercase letter, one number, and one symbol',toastOptions);
    
     
      return false;
    } else if (email === "") {
      toast.error("Email is required.", toastOptions);
      return false;
    }
    else if (mobile === "") {
      toast.error("Mobile is required.", toastOptions);
      return false;
    }
    else if (name === "") {
      toast.error("Name is required.", toastOptions);
      return false;
    }

    return true;
  };
  const handleBlurEmail =  async() => {
    const {   email } = formData;
    if (email === "") {
      toast.error("Email is required.", toastOptions);
      return false;
    
    } else {
      try {
        const {data}= await getemailotp({email});
        
          if (data.success === true) {
            console.log(data)
            localStorage.setItem(
              // process.env.REACT_APP_LOCALHOST_KEY,
              'task-email',
              JSON.stringify(data.emailToken)
            );
            toast.success(data.message)
        }
        
      } catch (error) {
        console.log(error)
        toast.error(error.response.data.message)
     
      }
          
    }
  };
  const handleBlurEmailOTP =  async() => {
    const {   emailOtp } = formData;
    if (emailOtp === "") {
      toast.error("Enter Email OTP.", toastOptions);
      return false;
    
    } else {
      try {
        const token = await JSON.parse(
          localStorage.getItem( 'task-email')
        );
        console.log(token)
        const {data}= await verifyemailotp({emailOTP:emailOtp,emailToken:token});
        toast.success(data.message)
        setisEmailVerified(true)
      } catch (error) {
        console.log(error)
        toast.error(error.response.data.message)
     
      }
          
    }
  };

  const handleBlurMobile =  async() => {
    const {   mobile } = formData;
    if (mobile === "") {
      toast.error("Mobile# is required.", toastOptions);
      return false;
    
    } else {
      try {
        const {data}= await getmobileotp({mobile});
        
          if (data.success === true) {
            console.log(data)
            localStorage.setItem(
              // process.env.REACT_APP_LOCALHOST_KEY,
              'task-mobile',
              JSON.stringify(data.mobileToken)
            );
            toast.success(data.message)
        }
        
      } catch (error) {
        console.log(error)
        toast.error(error.response.data.message)
     
      }
          
    }
  };
  const handleBlurMobileOTP =  async() => {
    const {   mobileOtp } = formData;
    if (mobileOtp === "") {
      toast.error("Enter Mobile OTP.", toastOptions);
      return false;
    
    } else {
      try {
        const token = await JSON.parse(
          localStorage.getItem( 'task-mobile')
        );
        console.log(token)
        const {data}= await verifymobileotp({mobileOTP:mobileOtp,mobileToken:token});
        toast.success(data.message)
        setisMobileOTPValid(true)
      } catch (error) {
        console.log(error)
        toast.error(error.response.data.message)
     
      }
          
    }
  };
 
  return (
    <>
      <FormContainer>
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
          type="email"
          id="email"
          name="email"
          value={formData.email}
          placeholder="Email"
          onChange={handleChange}
          onBlur={ !isEmailVerified && handleBlurEmail}
          readOnly={isEmailVerified}
        />
      
        <input
          type="text"
          id="emailOtp"
          name="emailOtp"
          placeholder="Email OTP"
          value={formData.emailOtp}
          onChange={handleChange}
          onBlur={!isEmailVerified && handleBlurEmailOTP}
          readOnly={isEmailVerified}
        />
 
        <input
          type="text"
          id="mobile"
          name="mobile"
          placeholder='Mobile'
          value={formData.mobile}
          onChange={handleChange}
          onBlur={!isMobileOTPValid && handleBlurMobile}
          readOnly={isMobileOTPValid}
        />
     

        <input
          type="text"
          id="mobileOtp"
          name="mobileOtp"
          placeholder='Mobile OTP'
          value={formData.mobileOtp}
          onChange={handleChange}
          onBlur={!isMobileOTPValid && handleBlurMobileOTP}
          readOnly={isMobileOTPValid}
        />
    

        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
          <button 
            type='submit'
            disabled={!isMobileOTPValid & !isEmailVerified}
          >
            SignUp
          </button>
       
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  )
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;
  }
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }
  button {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }
  span {
    color: white;
    text-transform: uppercase;
    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;

export default Register