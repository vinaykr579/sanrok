// eslint-disable-next-line no-unused-vars
import React from 'react';
import {NavigationActions} from 'react-navigation';
import {Alert} from 'react-native';
import {connect} from 'react-redux';
import * as Storage from '../helpers/storage';
import {LOGOUT} from '../reducers/actions';

const Logout = props => {
  const {navigate} = props.navigation;
  const onYes = () => {
    Storage.clear();
    navigate('Login');
  };
  const onNo = () => {
    props.navigation.dispatch(NavigationActions.back());
  };
  Alert.alert('', 'Are you sure?', [
    {text: 'Yes', onPress: () => onYes()},
    {text: 'No', onPress: () => onNo()},
  ]);
  return false;
};

const mapStateToProps = state => {
  return {};
};
const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch({type: LOGOUT}),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Logout);
