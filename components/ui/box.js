import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

const Box = props => {
  return (
    <TouchableOpacity onPress={() => props.onPress(props.id)} style={style.box}>
      <Text style={style.boxTitle}>{props.title}</Text>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  box: {
    width: 100,
    height: 100,
    backgroundColor: '#2E1590',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    borderRadius: 10,
  },
  boxTitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default Box;
