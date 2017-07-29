import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import {
  setUserDistrict,
  receiveErrorMessage,
  toggleIsFetching,
} from '../../actions';

import {
  Button,
} from 'react-bootstrap';

import AddressForm from '../../components/address_form/AddressForm';

class FindRepsContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentStep: 0,
      possibleAddresses: [],
      federalReps: [],
      verifiedAddress: null,
    };

    this.handleAddressSubmit = this.handleAddressSubmit.bind(this);
    this.receiveAddresses = this.receiveAddresses.bind(this);
  }

  handleAddressSubmit(addr) {
    this.props.setUserDistrict(addr);

    this.setState({
      currentStep: 1,
    });
  }

  receiveAddresses(key, addr) {

    if (key === 'verifiedAddress') {
      return this.handleAddressSubmit(addr);
    }
    const newState = {};
    newState[key] = addr;
    this.setState(newState);
  }

  render() {
    const { currentStep, possibleAddresses } = this.state;
    const { toggleIsFetching, isFetching } = this.props;

    return <div>
      {
        isFetching ?
          <h1>Loading....</h1>
        :
        currentStep === 0 ?
          <div>
            <h4>Set Your Congressional District</h4>
            <p>Congressional districts are based on lines drawn by Congress every 10 years following the results of the census. As a result, a zip code alone is not enough to determine your congressional district.</p>
            <h6>This information will not be shared with anyone.</h6>
            <AddressForm 
              submitAddress={ this.receiveAddresses }
              addresses={ possibleAddresses }
              toggleIsFetching={ toggleIsFetching }
            />
          </div>
        :
          <Link to='/floor-items'>
            <Button bsStyle='success' block>Continue</Button>
          </Link>
      }
    </div>;
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    federalReps: state.federalReps,
    district: state.district,
    isFetching: state.isFetching,
    verifiedDistrict: state.verifiedDistrict,
  };
}

export default connect(mapStateToProps, {
  setUserDistrict,
  receiveErrorMessage,
  toggleIsFetching,
})(FindRepsContainer);
