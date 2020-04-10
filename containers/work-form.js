import React, {Component} from 'react';
import {Platform, PermissionsAndroid, ToastAndroid, Alert} from 'react-native';
import {connect} from 'react-redux';
import Geolocation from 'react-native-geolocation-service';
import WorkFormScreen from '../screens/work-form-screen';
import SaveWorkDetails from '../services/save-work-details';
import Loader from '../components/ui/loader';
//import NavigationUtils from '../navigations/navigation-utils';

class WorkForm extends Component {
  constructor(props) {
    super(props);
    let work = this.getCurrentWork();
    this.state = {
      selectedItems: [],
      associatedUsers: [],
      workStatus: parseInt(work.WorkStatus, 10) === 2,
      narration: '',
      imageData: {},
      formErrors: {
        narration: '',
        image: '',
      },
      loading: false,
    };
  }

  userLocation = {};

  hasLocationPermission = async () => {
    if (Platform.OS === 'android' && Platform.Version < 23) {
      return true;
    }

    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (status === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }

    if (status === PermissionsAndroid.RESULTS.DENIED) {
      ToastAndroid.show(
        'Location permission denied by user.',
        ToastAndroid.LONG,
      );
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      ToastAndroid.show(
        'Location permission revoked by user.',
        ToastAndroid.LONG,
      );
    }

    return false;
  };

  getLocation = async () => {
    const hasLocationPermission = await this.hasLocationPermission();

    if (!hasLocationPermission) {
      return;
    }
    Geolocation.getCurrentPosition(
      position => {
        this.userLocation = position.coords;
        let obj = new SaveWorkDetails(this);
        obj.makeRequest(this.state);
      },
      error => {
        this.setState({loading: false});
        Alert.alert('Sanrok', error, [{text: 'Ok'}]);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
        distanceFilter: 50,
        forceRequestLocation: true,
      },
    );
  };

  setNarration = narration => {
    this.setState({narration: narration});
  };

  setItem = itemId => {
    let selectedItems = this.state.selectedItems;
    if (selectedItems.includes(itemId)) {
      selectedItems = selectedItems.filter(itm => itm !== itemId);
    } else {
      selectedItems.push(itemId);
    }
    this.setState({
      selectedItems: selectedItems,
    });
  };

  setImageData = data => {
    this.setState({imageData: data});
  };

  setAssociateUser = userId => {
    let associatedUsers = this.state.associatedUsers;
    if (associatedUsers.includes(userId)) {
      associatedUsers = associatedUsers.filter(itm => itm !== userId);
    } else {
      associatedUsers.push(userId);
    }
    this.setState({
      associatedUsers: associatedUsers,
    });
  };

  getAssociatedUsers = () => {
    if (this.props.associatedUsers.hasOwnProperty(this.props.selectedWork)) {
      return this.props.associatedUsers[this.props.selectedWork];
    } else {
      return [];
    }
  };

  getCurrentWork = () => {
    let wrks = this.props.works.map(wrk => {
      return parseInt(wrk.workId, 10) === parseInt(this.props.selectedWork, 10);
    });
    return wrks[0];
  };

  setWorkStatus = () => {
    let currentStatus = this.state.workStatus;
    if (currentStatus) {
      this.setState({workStatus: false});
    } else {
      this.setState({workStatus: true});
    }
  };

  handleSaveButton = () => {
    if (this.validateWorkForm()) {
      this.setState({loading: true});
      this.getLocation();
    }
  };

  handleApiResponse = res => {
    this.setState({loading: false});
    if (res.data.message !== 'success') {
      Alert.alert('Sanrok', res.data.message, [{text: 'Ok'}]);
    } else {
      Alert.alert('Sanrok', 'Submitted successfully!.', [
        {text: 'Ok', onPress: this.navigateToHome},
      ]);
    }
  };

  navigateToHome = () => {
    this.props.navigation.push('Home');
  };

  validateWorkForm = () => {
    let errors = {...this.state.formErrors};
    let dirtyForm = false;
    if (this.state.narration === '') {
      errors.narration = 'Please fill this field.';
      dirtyForm = true;
    }

    this.setState({formErrors: errors});
    return !dirtyForm;
  };

  renderLoader = () => {
    return <Loader />;
  };

  render() {
    if (this.state.loading) {
      return this.renderLoader();
    }
    let ausers = this.getAssociatedUsers();
    let work = this.getCurrentWork();
    return (
      <WorkFormScreen
        ausers={ausers}
        items={this.props.items}
        state={this.state}
        setItem={this.setItem}
        setAssociateUser={this.setAssociateUser}
        work={work}
        setWorkStatus={this.setWorkStatus}
        setNarration={this.setNarration}
        handleSaveButton={this.handleSaveButton}
        setImageData={this.setImageData}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    selectedWork: state.workId,
    associatedUsers: state.associatedUsers,
    items: state.userWorks.items,
    works: state.userWorks.works,
    locationId: state.locationId,
    workTypeId: state.workTypeId,
    stepId: state.stepId,
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(WorkForm);
