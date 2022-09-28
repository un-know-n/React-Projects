import './App.css';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Profile from './components/Profile/Profile';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './assets/images/header-logo.png';
import News from './components/News/News';
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import UsersContainer from './components/Users/UsersContainer';
import ProfileContainer from './components/Profile/ProfileContainer';

const App = (props) => {
  return (
    <BrowserRouter>
      <div className='app-wrapper'>
        <Header />
        <Navbar friends={props.friends} />
        <div className='app-wrapper-content'>
          <Routes>
            <Route
              path='/profile/:userId'
              element={
                <ProfileContainer />
                // posts={props.posts} dispatch={props.dispatch}
              }
            />
            <Route
              path='/dialogs/*'
              element={
                <DialogsContainer />
                // messages={props.messages}
                // dispatch={props.dispatch}
              }
            />
            <Route path='/users' element={<UsersContainer />}></Route>
            <Route path='/news' element={<News />} />
            <Route path='/music' element={<Music />} />
            <Route path='/settings' element={<Settings />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
