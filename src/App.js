import React, { useEffect } from 'react';
import './App.css';

import { SearchArea } from './components/SearchArea';

import { getRequest } from './util/api';


function App() {
  return (
    <div className="App">
      <SearchArea />
    </div>
  );
}

export default App;
