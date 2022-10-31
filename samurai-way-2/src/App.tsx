import './App.css';
import './assets/images/header-logo.png';
import 'antd/dist/antd.css';

import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu } from 'antd';
import SubMenu from 'antd/lib/menu/SubMenu';
import React, { Component, Suspense } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Link, Navigate, Route, Routes } from 'react-router-dom';

import Preloader from './components/common/Preloader/Preloader';
import { initializeApp } from './redux/app-reducer';
import { AppStateType } from './redux/redux-store';

import type { MenuProps } from 'antd';
const { Header, Content, Sider } = Layout;

const DialogsContainer = React.lazy(
  () => import('./components/Dialogs/DialogsContainer'),
);
const UsersPage = React.lazy(() => import('./components/Users/UsersContainer'));
const HeaderContainer = React.lazy(
  () => import('./components/Header/HeaderContainer'),
);
const ProfileContainer = React.lazy(
  () => import('./components/Profile/ProfileContainer'),
);
const Login = React.lazy(() => import('./components/Login/Login'));
const News = React.lazy(() => import('./components/News/News'));
const Music = React.lazy(() => import('./components/Music/Music'));
const Settings = React.lazy(() => import('./components/Settings/Settings'));

type MapStatePropsType = ReturnType<typeof mapStateToProps>;
type MapDispatchPropsType = {
  initializeApp: () => void;
};

type MenuItem = Required<MenuProps>['items'][number];
class App extends Component<MapStatePropsType & MapDispatchPropsType> {
  componentDidMount() {
    this.props.initializeApp();
  }

  render() {
    if (!this.props.isInitialized) return <Preloader />;
    return (
      <BrowserRouter>
        <Layout>
          <Suspense>
            <HeaderContainer />
          </Suspense>
          {/* <Header className='header'>
            <Link to='/users'>Developers</Link>
            
          </Header> */}
          <Layout>
            <Sider width={200} className='site-layout-background'>
              <Menu
                mode='inline'
                /*  defaultSelectedKeys={['7']}*/
                /*  defaultOpenKeys={['sub1']}*/
                style={{ height: '100%' }}>
                <SubMenu key='sub1' icon={<UserOutlined />} title='My Profile'>
                  <Menu.Item key='1'>
                    <Link to='/profile'>Profile</Link>
                  </Menu.Item>
                </SubMenu>
                <SubMenu
                  key='sub2'
                  icon={<LaptopOutlined />}
                  title='Developers'>
                  <Menu.Item key='5'>
                    <Link to='/users'>Users</Link>
                  </Menu.Item>
                </SubMenu>
                <SubMenu
                  key='sub3'
                  icon={<NotificationOutlined />}
                  title='Messages'>
                  <Menu.Item key='9'>
                    <Link to='/chat'>Chat</Link>
                  </Menu.Item>
                  <Menu.Item key='2'>
                    <Link to='/dialogs'>Messages</Link>
                  </Menu.Item>
                </SubMenu>
              </Menu>
            </Sider>
            <Layout style={{ padding: '0 24px 24px' }}>
              <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>List</Breadcrumb.Item>
                <Breadcrumb.Item>App</Breadcrumb.Item>
              </Breadcrumb>
              <Content className='site-layout-background'>
                Content
                <Suspense
                  fallback={
                    <div>
                      <Preloader />
                    </div>
                  }>
                  <div className='app-wrapper'>
                    <div className='app-wrapper-content'>
                      <Suspense
                        fallback={
                          <div>
                            <Preloader />
                          </div>
                        }>
                        <Routes>
                          <Route
                            path='/'
                            element={<Navigate to='/profile' />}
                          />
                          <Route
                            path='/profile/:userId'
                            element={<ProfileContainer />}
                          />
                          <Route
                            path='/profile'
                            element={<ProfileContainer />}
                          />
                          <Route
                            path='/dialogs/*'
                            element={<DialogsContainer />}
                          />
                          <Route path='/login' element={<Login />}></Route>
                          <Route
                            path='/users'
                            element={
                              // TODO: Fix the following issue
                              //@ts-ignore
                              <UsersPage outerTitle={'Some title here'} />
                            }></Route>
                          <Route path='/news' element={<News />} />
                          <Route path='/music' element={<Music />} />
                          <Route path='/settings' element={<Settings />} />
                        </Routes>
                      </Suspense>
                    </div>
                  </div>
                </Suspense>
              </Content>
            </Layout>
          </Layout>
        </Layout>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state: AppStateType) => {
  return {
    isInitialized: state.app.initialized,
    friends: state.sidebar.friendsData,
  };
};

export default connect(mapStateToProps, { initializeApp })(App);
