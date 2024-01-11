import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import { AppProvider } from './contexts/AppProvider';
import "./index.css"

ReactDOM.render(
  <AppProvider initialValues={{}}>
    <Router>
      <App />
    </Router>
  </AppProvider>,
  document.getElementById('root')
);

reportWebVitals();
