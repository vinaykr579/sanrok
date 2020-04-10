import React from 'react';
import {Image, StyleSheet} from 'react-native';

const HeaderTitle = props => {
  return (
    <Image style={style.logo} source={require('../images/logo-header.png')} />
  );
};

const style = StyleSheet.create({
  logo: {
    width: 40,
    height: 40,
    borderRadius: 4,
  },
});
export default HeaderTitle;
