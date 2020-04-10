import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Layout from './layout';

const ReportScreen = props => {
  return (
    <Layout
      scroll={true}
      onRefresh={props.onRefresh}
      refreshing={props.refreshing}>
      <View style={style.screen}>
        {props.reports &&
          props.reports.map(report => {
            return (
              <View style={style.workItem} key={report.WorkLogId}>
                <View style={style.row}>
                  <View>
                    <Text style={style.lableText}>Work Name:</Text>
                    <Text>{report.WorkName}</Text>
                  </View>
                  <View style={style.rightSideItems}>
                    <Text style={style.lableText}>Work Type:</Text>
                    <Text>{report.WorkType}</Text>
                  </View>
                </View>
                <View style={style.row}>
                  <View>
                    <Text style={style.lableText}>Location:</Text>
                    <Text>{report.LocationName}</Text>
                  </View>
                  <View style={style.rightSideItems}>
                    <Text style={style.lableText}>Step:</Text>
                    <Text>{report.StepName}</Text>
                  </View>
                </View>
                <View style={style.row}>
                  <View>
                    <Text style={style.lableText}>Narration</Text>
                    <TouchableOpacity
                      onPress={() =>
                        props.setOverLay('text', 'Narration', report.Narration)
                      }>
                      <Text style={style.touchableLableText}>Show</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={style.rightSideItems}>
                    <Text style={style.lableText}>Image</Text>
                    <TouchableOpacity
                      onPress={() =>
                        props.setOverLay('image', 'Image', report.Image)
                      }>
                      <Text style={style.touchableLableText}>Show</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={style.row}>
                  <View>
                    <Text style={style.lableText}>Submitted On:</Text>
                    <Text>{report.CreatedOnDate}</Text>
                  </View>
                  <View style={style.rightSideItems}>
                    <Text style={style.lableText}>Work Status:</Text>
                    <Text>{report.WorkStatus}</Text>
                  </View>
                </View>
                <View style={style.row}>
                  <View>
                    <Text style={style.lableText}>Changed Items:</Text>
                    <TouchableOpacity
                      onPress={() =>
                        props.setOverLay(
                          'text',
                          'Changed Items',
                          report.ChangedItems,
                        )
                      }>
                      <Text style={style.touchableLableText}>Show</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={style.rightSideItems}>
                    <Text style={style.lableText}>Associated Users:</Text>
                    <TouchableOpacity
                      onPress={() =>
                        props.setOverLay(
                          'text',
                          'Associated Users',
                          report.AssociatedUsers,
                        )
                      }>
                      <Text style={style.touchableLableText}>Show</Text>
                    </TouchableOpacity>
                  </View>
                </View>
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
  workItem: {
    width: '100%',
    height: 230,
    backgroundColor: '#fff',
    borderRadius: 6,
    marginBottom: 10,
    padding: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 40,
    marginBottom: 3,
  },
  lableText: {
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 1,
  },
  touchableLableText: {
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 1,
    color: '#2E1590',
  },
  rightSideItems: {
    alignItems: 'flex-end',
  },
});

export default ReportScreen;
