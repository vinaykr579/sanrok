import React, {Component} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createStackNavigator} from 'react-navigation-stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import HeaderTitle from '../components/header-title';
import Login from '../containers/login';
import Locations from '../containers/locations';
import WorkType from '../containers/work-type';
import Works from '../containers/works';
import Steps from '../containers/steps';
import WorkForm from '../containers/work-form';
import Report from '../containers/report';
import SideMenu from '../navigations/side-menu';

class NavigationDrawerStructure extends Component {
  //Structure for the navigatin Drawer
  toggleDrawer = () => {
    //Props to open/close the drawer
    this.props.navigationProps.toggleDrawer();
  };
  render() {
    return (
      // eslint-disable-next-line react-native/no-inline-styles
      <View style={{flexDirection: 'row', paddingLeft: 16}}>
        <TouchableOpacity onPress={this.toggleDrawer.bind(this)}>
          <Icon name="menu" size={30} color="#3157ff" />
        </TouchableOpacity>
      </View>
    );
  }
}

const AuthStack = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: ({navigation}) => ({
      headerStyle: {
        backgroundColor: '#f0f1f2',
        elevation: 0,
      },
      headerTitle: () => {
        return false;
      },
    }),
  },
});

const Work_StackNavigator = createStackNavigator({
  Home: {
    screen: WorkType,
    navigationOptions: ({navigation}) => ({
      title: 'Home',
      headerLeft: () => (
        <NavigationDrawerStructure navigationProps={navigation} />
      ),
      headerStyle: {
        backgroundColor: '#FFF',
        elevation: 0,
      },
      headerTitleStyle: {
        fontSize: 20,
        fontWeight: 'bold',
      },
      headerTintColor: '#000',
      headerTitleAlign: 'center',
    }),
  },
  Locations: {
    screen: Locations,
    navigationOptions: ({navigation}) => ({
      title: 'Locations',
      headerLeft: () => (
        <NavigationDrawerStructure navigationProps={navigation} />
      ),
      headerStyle: {
        backgroundColor: '#FFF',
        elevation: 0,
      },
      headerTitleStyle: {
        fontSize: 20,
        fontWeight: 'bold',
      },
      headerTintColor: '#000',
      headerTitleAlign: 'center',
    }),
  },
  Works: {
    screen: Works,
    navigationOptions: ({navigation}) => ({
      title: 'Works',
      headerLeft: () => (
        <NavigationDrawerStructure navigationProps={navigation} />
      ),
      headerStyle: {
        backgroundColor: '#FFF',
        elevation: 0,
      },
      headerTitleStyle: {
        fontSize: 20,
        fontWeight: 'bold',
      },
      headerTintColor: '#000',
      headerTitleAlign: 'center',
    }),
  },
  Steps: {
    screen: Steps,
    navigationOptions: ({navigation}) => ({
      headerLeft: () => (
        <NavigationDrawerStructure navigationProps={navigation} />
      ),
      headerStyle: {
        backgroundColor: '#FFF',
        elevation: 0,
      },
      headerTitle: () => {
        return <HeaderTitle navigation={navigation} />;
      },
      headerTitleStyle: {
        fontSize: 20,
        fontWeight: 'bold',
      },
      headerTintColor: '#000',
      headerTitleAlign: 'center',
    }),
  },
  WorkForm: {
    screen: WorkForm,
    navigationOptions: ({navigation}) => ({
      headerLeft: () => (
        <NavigationDrawerStructure navigationProps={navigation} />
      ),
      headerTitle: () => {
        return <HeaderTitle navigation={navigation} />;
      },
      headerStyle: {
        backgroundColor: '#FFF',
        elevation: 0,
      },
      headerTitleStyle: {
        fontSize: 20,
        fontWeight: 'bold',
      },
      headerTintColor: '#000',
      headerTitleAlign: 'center',
    }),
  },
});

const Report_StackNavigator = createStackNavigator({
  Report: {
    screen: Report,
    navigationOptions: ({navigation}) => ({
      title: 'Report',
      headerTitleAlign: 'center',
      headerLeft: () => (
        <NavigationDrawerStructure navigationProps={navigation} />
      ),
      headerStyle: {
        backgroundColor: '#FFF',
        elevation: 0,
      },
      headerTitleStyle: {
        fontSize: 20,
        fontWeight: 'bold',
      },
      headerTintColor: '#000',
    }),
  },
});

const AppStack = createDrawerNavigator(
  {
    Home: {
      screen: Work_StackNavigator,
    },
    Reports: {
      screen: Report_StackNavigator,
    },
  },
  {
    contentComponent: SideMenu,
    drawerWidth: 300,
  },
);

const App = createSwitchNavigator(
  {
    Auth: AuthStack,
    App: AppStack,
  },
  {
    initialRouteName: 'Auth',
  },
);

export default createAppContainer(App);
