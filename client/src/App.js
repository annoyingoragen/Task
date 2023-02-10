import React from 'react';
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import {Register,Details} from './Views';
import OpenAIResponse from './Views/OpenAIResponse';

const App = () => {
  return (
    
   <BrowserRouter>
      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/' element={<OpenAIResponse />} /> 
        <Route path='/details' element={<Details />} /> 
      </Routes>
   </BrowserRouter>
  )
}

export default App