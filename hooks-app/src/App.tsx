import './App.css';

import React from 'react';

import { Github } from './components/Github/Github';

function App() {
  return (
    <div className="App">
      <Github />
    </div>
  );
}
//https://api.github.com/search/users?q=YOUR-QUERY
export default App;
