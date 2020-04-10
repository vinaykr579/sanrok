import React from 'react';
import {connect} from 'react-redux';
import {View, Text, StyleSheet} from 'react-native';

const WorkName = props => {
  if (props.title === '') {
    return false;
  }
  return (
    <View style={style.container}>
      <Text style={style.title}>{props.title}</Text>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
    width: '100%',
  },
  title: {fontSize: 15, fontWeight: 'bold'},
});

const mapStateToProps = state => {
  return {
    title: state.headerTitle,
  };
};

export default connect(mapStateToProps)(WorkName);
