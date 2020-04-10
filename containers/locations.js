import React, {Component} from 'react';
import {connect} from 'react-redux';
import LocationScreen from '../screens/location-screen';
import * as actions from '../reducers/actions';
import NavigationUtils from '../navigations/navigation-utils';

class Locations extends Component {
  handleClickOnLocation = locationId => {
    this.props.setWorkLocation(locationId);
    NavigationUtils.push('Works');
  };

  render() {
    return (
      <LocationScreen
        locations={this.props.locations}
        onPress={this.handleClickOnLocation}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    locations: state.userWorks.locations,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setWorkLocation: locationId =>
      dispatch(actions.setWorkLocation(locationId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Locations);
