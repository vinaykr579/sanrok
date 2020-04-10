import React, {Component} from 'react';
import {connect} from 'react-redux';
import StepScreen from '../screens/step-screen';
import NavigationUtils from '../navigations/navigation-utils';
import {setStepId, setAssociatedUsers} from '../reducers/actions';
import AssociatedUsersService from '../services/associated-users-service';
import Loader from '../components/ui/loader';
import {Alert} from 'react-native';

class Steps extends Component {
  constructor(props) {
    super(props);
    let filteredWrk = this.props.userWorks.works.filter(wrk => {
      return parseInt(wrk.WorkId, 10) === parseInt(this.props.selectedWork, 10);
    });
    if (filteredWrk.length > 0) {
      let wrk = filteredWrk[0];
      this.state = {
        selectedStep: wrk.LastStepId,
        loading: false,
      };
    } else {
      this.state = {
        selectedStep: 1,
        loading: false,
      };
    }
  }

  componentDidMount() {
    if (!this.props.associatedUsers.hasOwnProperty(this.props.selectedWork)) {
      this.loadAssociatedUsers();
    }
  }

  loadAssociatedUsers = async () => {
    this.setState({loading: true});
    let obj = new AssociatedUsersService(this);
    try {
      let response = await obj.makeRequest(this.props.selectedWork);
      if (response.data.message === 'success') {
        this.props.setAssociatedUsers(
          this.props.selectedWork,
          response.data.result.associated_users,
        );
      } else {
        Alert.alert('Error', response.data.message, [{text: 'ok'}]);
      }
    } catch (error) {}

    this.setState({loading: false});
  };

  handleStepOnClick = stepId => {
    this.setState({
      selectedStep: stepId,
    });
  };

  handleNextbtnClick = () => {
    this.props.setStepId(this.state.selectedStep);
    NavigationUtils.push('WorkForm');
  };

  renderLoader = () => {
    return <Loader />;
  };

  render() {
    if (this.state.loading) {
      return this.renderLoader();
    }
    return (
      <StepScreen
        steps={this.props.userWorks.steps}
        selectedStep={this.state.selectedStep}
        handleStepOnClick={this.handleStepOnClick}
        handleNextbtnClick={this.handleNextbtnClick}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    userWorks: state.userWorks,
    selectedWork: state.workId,
    associatedUsers: state.associatedUsers,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setStepId: stepId => dispatch(setStepId(stepId)),
    setAssociatedUsers: (workId, ausers) =>
      dispatch(setAssociatedUsers(workId, ausers)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Steps);
