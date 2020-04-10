import React from 'react';
import {View, StyleSheet} from 'react-native';
import Layout from './layout';
import Box from '../components/ui/box';
import {chunk} from '../helpers/functions';

const WorkScreen = props => {
  let worksArr = chunk(props.works, 2);
  return (
    <Layout scroll={true}>
      <View style={style.screen}>
        {worksArr &&
          worksArr.map((arr, index) => {
            return (
              <View style={style.row} key={index}>
                {arr &&
                  arr.map(work => {
                    return (
                      <Box
                        key={work.WorkId}
                        title={work.WorkName}
                        id={work.WorkId}
                        onPress={() =>
                          props.onPress(work.WorkId, work.WorkName)
                        }
                      />
                    );
                  })}
              </View>
            );
          })}
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
    height: 150,
    padding: 10,
    justifyContent: 'space-around',
  },
});

export default WorkScreen;
