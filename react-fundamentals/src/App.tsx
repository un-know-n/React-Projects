import './assets/styles/App.css';

import { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { AppRouter } from './components/UI/AppRouter/AppRouter';
import { Navbar } from './components/UI/Navbar/Navbar';
import { AuthContext } from './context';

const App = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('auth')) setIsAuth(true);
  }, []);

  return (
    <>
      <BrowserRouter>
        <AuthContext.Provider
          value={{
            isAuth,
            setIsAuth,
            isLoading,
          }}
        >
          <Navbar />
          <AppRouter />
        </AuthContext.Provider>
      </BrowserRouter>
    </>
  );
};

export default App;
