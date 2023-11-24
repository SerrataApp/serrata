import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ConnexionProvider from './components/store/ConnexionProvider';

ReactDOM.render(
  <React.StrictMode>
    <ConnexionProvider>
      <App />
    </ConnexionProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();