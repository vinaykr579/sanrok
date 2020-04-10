import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Layout from './layout';
import Box from '../components/ui/box';
import {chunk} from '../helpers/functions';

const LocationScreen = props => {
  let locationsArr = chunk(props.locations, 2);
  let renderBlankScreen = () => {
    if (locationsArr.length > 0) {
      return false;
    }
    return (
      <View style={style.blankScreen}>
        <Text>No records found to display.</Text>
      </View>
    );
  };
  return (
    <Layout scroll={true}>
      <View style={style.screen}>
        {locationsArr &&
          locationsArr.map((arr, index) => {
            return (
              <View style={style.row} key={index}>
                {arr &&
                  arr.map(location => {
                    return (
                      <Box
                        key={location.LocationId}
                        title={location.LocationName}
                        id={location.LocationId}
                        onPress={props.onPress}
                      />
                    );
                  })}
              </View>
            );
          })}
        {renderBlankScreen()}
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
  blankScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LocationScreen;
