import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import App from './App';
import './index.scss';
import reportWebVitals from './reportWebVitals';
import { store } from './stores/rootReducer';

toast.configure({
  autoClose: 2000,
  position: toast.POSITION.TOP_RIGHT,
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
