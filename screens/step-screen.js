import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Layout from './layout';
import {CheckBox} from 'react-native-elements';
import WorkName from '../components/work-name';

const StepScreen = props => {
  return (
    <Layout>
      <View style={style.screen}>
        <WorkName />
        {props.steps &&
          props.steps.map(step => {
            return (
              <View key={step.StepId} style={style.row}>
                <CheckBox
                  containerStyle={style.checkBoxStyle}
                  title={step.StepName}
                  checked={step.StepId === props.selectedStep}
                  textStyle={style.checkBoxText}
                  onPress={() => props.handleStepOnClick(step.StepId)}
                  checkedIcon="dot-circle-o"
                  uncheckedIcon="circle-o"
                />
              </View>
            );
          })}
        <View style={style.btnRow}>
          <TouchableOpacity
            style={style.btnStyle}
            onPress={() => props.handleNextbtnClick()}>
            <Text style={style.btnText}>Next</Text>
          </TouchableOpacity>
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
  row: {
    flexDirection: 'row',
    height: 60,
    padding: 10,
    justifyContent: 'space-around',
  },
  btnRow: {
    height: 150,
    padding: 10,
    justifyContent: 'center',
    alignContent: 'center',
  },
  btnStyle: {
    width: '100%',
    backgroundColor: '#2E1590',
    height: 50,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  checkBoxStyle: {
    width: '100%',
    height: 50,
    borderRadius: 6,
  },
  checkBoxText: {
    color: '#000',
  },
});

export default StepScreen;
