import './App.css';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './assets/images/header-logo.png';
// import News from './components/News/News';
// import Music from './components/Music/Music';
// import Settings from './components/Settings/Settings';
// import UsersContainer from './components/Users/UsersContainer';
// import ProfileContainer from './components/Profile/ProfileContainer';
// import HeaderContainer from './components/Header/HeaderContainer';
// import Login from './components/Login/Login';
import React, { Component, Suspense } from 'react';
import { initializeApp } from './redux/app-reducer';
import { connect } from 'react-redux';
import Preloader from './components/common/Preloader/Preloader';

const DialogsContainer = React.lazy(() =>
  import('./components/Dialogs/DialogsContainer'),
);
const UsersContainer = React.lazy(() =>
  import('./components/Users/UsersContainer'),
);
const HeaderContainer = React.lazy(() =>
  import('./components/Header/HeaderContainer'),
);
const ProfileContainer = React.lazy(() =>
  import('./components/Profile/ProfileContainer'),
);
const Login = React.lazy(() => import('./components/Login/Login'));
const News = React.lazy(() => import('./components/News/News'));
const Music = React.lazy(() => import('./components/Music/Music'));
const Settings = React.lazy(() => import('./components/Settings/Settings'));

class App extends Component {
  componentDidMount() {
    this.props.initializeApp();
  }

  render() {
    if (!this.props.isInitialized) return <Preloader />;
    return (
      <BrowserRouter>
        <Suspense
          fallback={
            <div>
              <Preloader />
            </div>
          }>
          <div className='app-wrapper'>
            <HeaderContainer />
            <Navbar friends={this.props.friends} />
            <div className='app-wrapper-content'>
              <Suspense
                fallback={
                  <div>
                    <Preloader />
                  </div>
                }>
                <Routes>
                  <Route
                    path='/profile/:userId'
                    element={<ProfileContainer />}
                  />
                  <Route path='/profile' element={<ProfileContainer />} />
                  <Route path='/dialogs/*' element={<DialogsContainer />} />
                  <Route path='/login' element={<Login />}></Route>
                  <Route path='/users' element={<UsersContainer />}></Route>
                  <Route path='/news' element={<News />} />
                  <Route path='/music' element={<Music />} />
                  <Route path='/settings' element={<Settings />} />
                </Routes>
              </Suspense>
            </div>
          </div>
        </Suspense>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isInitialized: state.app.initialized,
  };
};

export default connect(mapStateToProps, { initializeApp })(App);
