import React from 'react';
import { shallow } from 'enzyme';

import App from './App';


it('renders the router container without crashing', () => {
  const wrapper = shallow(<App />);
  expect(typeof wrapper.node.type).toEqual('function');
});