import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  Alert,
} from 'react-native';
import Layout from './layout';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Input} from 'react-native-elements';

const LoginScreen = props => {
  let forgotPwdAction = () => {
    let msg = 'Please contact administrator, If you forget your password.';
    Alert.alert('Sanrok', msg, [{text: 'Ok'}]);
  };
  return (
    <Layout>
      <View style={style.screen}>
        <View style={style.logoContainer}>
          <Image source={require('../images/logo.png')} style={style.logo} />
        </View>
        <View>
          <Input
            placeholder="Username"
            onChangeText={value => props.setFormData('Username', value)}
            value={props.state.formData.Username}
            leftIcon={<Icon name="user" size={16} color="black" />}
            errorStyle={style.onError}
            errorMessage={props.state.formError.Username}
          />
          <Input
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={value => props.setFormData('UPassword', value)}
            value={props.state.formData.UPassword}
            errorStyle={style.onError}
            errorMessage={props.state.formError.UPassword}
            leftIcon={<Icon name="key" size={16} color="black" />}
          />
          <View style={style.fpcontainer}>
            <TouchableOpacity onPress={() => forgotPwdAction()}>
              <Text style={style.fptext}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>
          <View style={style.btnContainer}>
            <TouchableOpacity
              style={style.btn}
              onPress={() => props.checkLogin()}>
              <Text style={style.btnTitleStyle}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Layout>
  );
};

const style = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  logoContainer: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 50,
    paddingBottom: 50,
    justifyContent: 'center',
    alignItems: 'center',
    height: 150,
    marginBottom: 15,
  },
  logo: {
    width: 77,
    height: 72,
  },
  fpcontainer: {
    alignItems: 'flex-end',
    paddingRight: 10,
  },
  fptext: {
    color: '#2E1590',
  },
  btnContainer: {
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
  btn: {
    width: '100%',
    backgroundColor: '#2E1590',
    height: 50,
    borderRadius: 6,
    justifyContent: 'center',
    alignContent: 'center',
  },
  btnTitleStyle: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  onError: {
    color: 'red',
  },
});

export default LoginScreen;
