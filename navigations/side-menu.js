import React, {Component} from 'react';
import {NavigationActions} from 'react-navigation';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import styles from './side-menu-style';
import {Alert} from 'react-native';
import * as Storage from '../helpers/storage';

class SideMenu extends Component {
  state = {
    activeRoute: 'Home',
  };

  navigateToScreen = route => () => {
    this.setState({activeRoute: route});
    this.props.navigation.toggleDrawer();
    const navigateAction = NavigationActions.navigate({
      routeName: route,
    });
    this.props.navigation.dispatch(navigateAction);
  };

  logout = () => {
    this.props.navigation.toggleDrawer();
    const onYes = () => {
      Storage.clear();
      this.props.navigation.navigate('Login');
    };
    Alert.alert('', 'Are you sure?', [
      {text: 'Yes', onPress: () => onYes()},
      {text: 'No'},
    ]);
  };

  render() {
    let homeStyle =
      this.state.activeRoute === 'Home'
        ? styles.activeItemStyle
        : styles.otherItemStyle;
    let reportStyle =
      this.state.activeRoute === 'Reports'
        ? styles.activeItemStyle
        : styles.otherItemStyle;
    let logoutStyle =
      this.state.activeRoute === 'Logout'
        ? styles.activeItemStyle
        : styles.otherItemStyle;
    return (
      <View style={styles.container}>
        <ScrollView>
          <View>
            <View style={styles.navSectionStyle}>
              <TouchableOpacity
                style={homeStyle}
                onPress={this.navigateToScreen('Home')}>
                <Text style={styles.navItemStyle}>Home</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={reportStyle}
                onPress={this.navigateToScreen('Report')}>
                <Text style={styles.navItemStyle}>Report</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={logoutStyle}
                onPress={() => this.logout()}>
                <Text style={styles.navItemStyle}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default SideMenu;
