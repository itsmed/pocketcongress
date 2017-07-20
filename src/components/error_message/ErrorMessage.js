import React from 'react';

import {
  Button,
} from 'react-bootstrap';

const ErrorMessge = ({ errorMessage, acknowledgeErrorMessage }) => (
  <div>
    <div style={{ textAlign: 'center', padding: '5%' }} onClick={ acknowledgeErrorMessage }>
      <Button bsStyle='danger'>Click To Close</Button>
      <h3>Try again in 30 seconds</h3>
      <h3>{ errorMessage }</h3>
    </div>
  </div>
);

export default ErrorMessge;
