import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Wrapper from './components/Wrapper';
import './App.scss';

function App() {
  return (
    <BrowserRouter>
      <Wrapper />
    </BrowserRouter>
  );
}

export default App;