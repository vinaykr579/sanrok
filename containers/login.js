import React, {Component} from 'react';
import {BackHandler, Alert} from 'react-native';
import {connect} from 'react-redux';
import * as actions from '../reducers/actions';
import LoginScreen from '../screens/login-screen';
import LoginService from '../services/login-service';
import * as Storage from '../helpers/storage';
import NavigationUtils from '../navigations/navigation-utils';
import {setAccessToken} from '../services/base-service';
import VerifyToken from '../services/verify-token';
import Loader from '../components/ui/loader';

class Login extends Component {
  state = {
    formData: {
      Username: '',
      UPassword: '',
    },
    formError: {
      Username: '',
      UPassword: '',
    },
    loading: false,
  };

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    this.checkForToken();
  }

  showAlert = msg => {
    Alert.alert('Sanrok', msg, [{text: 'Ok'}]);
  };

  checkForToken = async () => {
    let token = await Storage.getData('token');
    let user = await Storage.getData('user');
    let workTypes = await Storage.getData('work_types');
    if (token) {
      setAccessToken(token);
      this.props.setMasterData(JSON.parse(user), JSON.parse(workTypes));
      let obj = new VerifyToken(this);
      try {
        let response = await obj.makeRequest();
        if (response.data.message === 'success') {
          NavigationUtils.navigate('Home');
        }
      } catch (error) {}
    }
  };

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton() {
    return true;
  }

  setFormData = (name, value) => {
    let formData = {...this.state.formData};
    formData[name] = value;
    this.setState({formData: formData});
  };

  checkLogin = () => {
    if (this.validateForm()) {
      let loginService = new LoginService(this);
      this.setState({loading: true});
      loginService.makeRequest(this.state.formData);
    }
  };

  validateForm = () => {
    let dirty = false;
    let formError = {...this.state.formError};
    if (this.state.formData.Username === '') {
      dirty = true;
      formError.Username = 'Please enter Username.';
    }
    if (this.state.formData.UPassword === '') {
      dirty = true;
      formError.UPassword = 'Please enter password.';
    }
    this.setState({formError: formError});
    return !dirty;
  };

  handleLoginApiResponse = response => {
    this.setState({loading: false});
    if (response.data.message === 'success') {
      Storage.storeData('token', response.data.result.token);
      Storage.storeData('user', JSON.stringify(response.data.result.user));
      Storage.storeData(
        'work_types',
        JSON.stringify(response.data.result.work_types),
      );
      this.props.setMasterData(
        response.data.result.user,
        response.data.result.work_types,
      );
      setAccessToken(response.data.result.token);
      NavigationUtils.navigate('Home');
    } else {
      Alert.alert('Sanrok', response.data.message, [{text: 'Ok'}]);
    }
  };

  renderLoader = () => {
    return <Loader />;
  };

  render() {
    if (this.state.loading) {
      return this.renderLoader();
    }
    return (
      <LoginScreen
        state={this.state}
        setFormData={this.setFormData}
        checkLogin={this.checkLogin}
      />
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    setMasterData: (user, workTypes) =>
      dispatch(actions.setMasterData(user, workTypes)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
