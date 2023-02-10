import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {getresponsefromai} from '../Api';
function OpenAIResponse() {
    const [search, setSearch] = useState('');
    const[response,setResponse]=useState(null);
    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      };
      const handleChange = (event) => {
        setSearch(event.target.value);
      };
      const handleValidation = () => {
        
        if (search==='') {
           
            toast.error('Enter the topic you want to search about',toastOptions);
        
         
          return false;
        } 
        return true;
      };
    const handleSubmit=async(e)=>{
        e.preventDefault();
        
        if (handleValidation()) {
            // alert(search)
          const {data}=await getresponsefromai(search);
          console.log(data)
          if (data.success === false) {
            toast.error(data.message, toastOptions);
          }
          if (data.success === true) {
           setResponse(data.data.text)
        console.log(data);
          }
      }
    }
  return (
    <>   
     <FormContainer>
        <form onSubmit={handleSubmit}>
         
        <input
          type="text"
          id="search"
          name="search"
          value={search}
          placeholder="Search using OPEN AI"
          onChange={handleChange}
        />    
       
    

       
          <button 
            type='submit'
          >
            Search
          </button>
    </form>
    <p>{response}</p>
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

  p {
    background-color: transparent;
    padding: 1rem;
    
    color: white;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }

`;

export default OpenAIResponse