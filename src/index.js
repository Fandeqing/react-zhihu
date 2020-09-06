import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from "react-router-dom";
import createStore from "./redux/store";
import { Provider } from "react-redux";

import './utils/base.scss'

ReactDOM.render(
  <Provider store={createStore()}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);
