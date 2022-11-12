import './App.css';

import React from 'react';
import styled from 'styled-components';

import { UsersList } from './components/Business/Users/UsersList/UsersList';

const AppWrapper = styled.div`
  width: 100%;
  height: 100vh;
  padding: 2rem;
  background: white;
`;

function App() {
  return (
    <div className="App">
      <AppWrapper>
        <UsersList />
      </AppWrapper>
    </div>
  );
}

export default App;
