import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { gsap } from 'gsap';

// prevent animation from stopping when tab is in background
gsap.ticker.lagSmoothing(0);

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('root')
);
