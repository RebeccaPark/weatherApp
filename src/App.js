import React, { useEffect } from 'react';
import './App.css';
import { getRequest } from './util/api';

function App() {

  useEffect(() => {getRequest()}, []);

  return (
    <div className="App">
    </div>
  );
}

export default App;
