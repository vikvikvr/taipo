import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { App } from './app/App';
import './firebase';

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('root')
);
