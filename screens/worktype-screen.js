import React from 'react';
import {View, StyleSheet} from 'react-native';
import Layout from './layout';
import Box from '../components/ui/box';

const WorkTypeScreen = props => {
  return (
    <Layout>
      <View style={style.screen}>
        <View style={style.row}>
          {props.workTypes &&
            props.workTypes.map(wt => {
              return (
                <Box
                  key={wt.WorkTypeId}
                  id={wt.WorkTypeId}
                  title={wt.Name}
                  onPress={() => props.handleWorkTypeClick(wt.WorkTypeId)}
                />
              );
            })}
        </View>
      </View>
    </Layout>
  );
};

const style = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  row: {
    flexDirection: 'row',
    height: 150,
    padding: 5,
    justifyContent: 'space-around',
  },
});

export default WorkTypeScreen;
