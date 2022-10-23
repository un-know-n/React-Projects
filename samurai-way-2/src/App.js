import './App.css';
import './assets/images/header-logo.png';

import React, { Component, Suspense } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import Preloader from './components/common/Preloader/Preloader';
import Navbar from './components/Navbar/Navbar';
import { initializeApp } from './redux/app-reducer';

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
                  <Route path='/' element={<Navigate to='/profile' />} />
                  <Route
                    path='/profile/:userId'
                    element={<ProfileContainer />}
                  />
                  <Route path='/profile' element={<ProfileContainer />} />
                  <Route path='/dialogs/*' element={<DialogsContainer />} />
                  <Route path='/login' element={<Login />}></Route>
                  <Route
                    path='/users'
                    element={
                      <UsersContainer outerTitle={'Some title here'} />
                    }></Route>
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
