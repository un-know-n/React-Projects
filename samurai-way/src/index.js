import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './redux/state';

const root = ReactDOM.createRoot(document.getElementById('root'));
const renderAll = (state) => {
  root.render(
    <React.StrictMode>
      <App
        messages={state.messages}
        posts={state.profile}
        friends={state.sidebar.friendsData}
        dispatch={store.dispatch.bind(store)}
      />
    </React.StrictMode>
  );
};

renderAll(store.getState());

store.subscribe(renderAll);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
