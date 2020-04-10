import React from 'react';
import {View, StyleSheet, ScrollView, RefreshControl} from 'react-native';
import Loader from '../components/ui/loader';

const Layout = props => {
  let loading = props.loading ? props.loading : false;
  let scroll = props.scroll ? props.scroll : false;
  let refreshing = props.refreshing ? props.refreshing : false;
  const onRefresh = () => {
    return props.onRefresh ? props.onRefresh() : true;
  };
  if (scroll === true) {
    return (
      <ScrollView
        enabled={true}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => onRefresh()}
          />
        }>
        <View style={style.container}>
          <Loader loading={loading} />
          {props.children}
        </View>
      </ScrollView>
    );
  } else {
    return (
      <View style={style.container}>
        <Loader loading={loading} />
        {props.children}
      </View>
    );
  }
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f1f2',
    padding: 20,
  },
});

export default Layout;
