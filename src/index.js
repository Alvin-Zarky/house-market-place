import React from 'react';
import ReactDOM from 'react-dom';
import WebApp from "./views/index";
import {ContextProvider} from "./context/allContext";
import './assets/scss/style.scss';
import './assets/scss/responsive.scss';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <ContextProvider>
      <WebApp />
    </ContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
