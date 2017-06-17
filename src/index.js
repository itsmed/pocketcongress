import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import {
  Provider,
} from 'react-redux';

import App from './App';
import './index.css';
import store from './make_store';

window.addEventListener('fetch', (e) => {
  console.log('[FETCH EVENT]: ', e, arguments);
}, false);

ReactDOM.render(<Provider store={store}>
  <App />
</Provider>, document.getElementById('root'));
registerServiceWorker();
