/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const Footer = props => {
  let footerDisabled = props.footerDisabled ? props.footerDisabled : false;
  let footerTextStyle =
    footerDisabled === false ? style.footerText : style.footerTextDisabled;
  let isqbst = props.qbst ? props.qbst : false;
  let qbstView = qbst => {
    if (qbst === false) {
      return null;
    }
    return (
      <TouchableOpacity
        onPress={() => props.onPressX()}
        style={{paddingLeft: 16}}>
        <Icon size={24} color="#3157ff" name="close" />
      </TouchableOpacity>
    );
  };
  return (
    <TouchableOpacity onPress={() => props.onPress()} disabled={footerDisabled}>
      <View style={style.footer}>
        <View style={style.footerLeftView}>{qbstView(isqbst)}</View>
        <View style={style.footerCenterView}>
          <Text style={footerTextStyle}>{props.text}</Text>
        </View>
        <View style={style.footerRightView} />
      </View>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  footer: {
    height: 60,
    elevation: 3,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  footerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3157ff',
  },
  footerTextLeft: {
    fontSize: 20,
    color: '#3157ff',
  },
  footerTextDisabled: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3157ff',
    opacity: 0.3,
  },
  footerLeftView: {flex: 1},
  footerCenterView: {flex: 1, alignItems: 'center'},
  footerRightView: {flex: 1},
});

export default Footer;
