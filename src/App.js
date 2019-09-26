import React, { useReducer } from 'react';
import './App.css';

import { SearchArea } from './components/SearchArea';
import { Graph } from './components/Graph';
import { weatherReducer, initialState } from './store/reducer';

export const stateContext = React.createContext();
export const dispatchContext = React.createContext();

function App() {
  const [state, dispatch] = useReducer(weatherReducer, initialState);
  return (
    <stateContext.Provider value={state}>
      <dispatchContext.Provider value={dispatch}>
        <div className="App">
          <SearchArea />
          <Graph />
        </div>
      </dispatchContext.Provider>
    </stateContext.Provider>
  );
}

export default App;
