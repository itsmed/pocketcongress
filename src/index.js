import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

import {
  Provider,
} from 'react-redux';

import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './index.css';
import store from './make_store';

ReactDOM.render(<Provider store={store}>
  <App />
</Provider>, document.getElementById('root'));
registerServiceWorker();
