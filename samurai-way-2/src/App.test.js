import { render, screen } from '@testing-library/react';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/redux-store';
import React from 'react';

test('renders learn react link', () => {
  render(
    <React.StrictMode>
      <Provider store={store}>
        <div role='main'></div>
        <App friends={store.getState().sidebar.friendsData} />
      </Provider>
    </React.StrictMode>,
  );
  const linkElement = screen.getByRole(/main/i);
  expect(linkElement).toBeInTheDocument();
});
