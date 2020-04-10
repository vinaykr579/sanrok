import React, {Component} from 'react';
import {connect} from 'react-redux';
import WorkTypeScreen from '../screens/worktype-screen';
import {setWorkTypeId, setAssignedWorks} from '../reducers/actions';
import AssignedWorksService from '../services/assigned-works-service';
import NavigationUtils from '../navigations/navigation-utils';

class WorkType extends Component {
  componentDidMount() {
    this.setAssignedWorks();
  }

  setAssignedWorks = async () => {
    let obj = new AssignedWorksService(this);
    try {
      let response = await obj.makeRequest();
      if (response.data.message === 'success') {
        this.props.setAssignedWorks(response.data.result);
      }
    } catch (error) {}
  };

  handleWorkTypeClick = workTypeId => {
    this.props.setWorkTypeId(workTypeId);
    NavigationUtils.push('Locations');
  };

  render() {
    return (
      <WorkTypeScreen
        workTypes={this.props.workTypes}
        handleWorkTypeClick={this.handleWorkTypeClick}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    workTypes: state.masterData.workTypes,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setWorkTypeId: typeId => dispatch(setWorkTypeId(typeId)),
    setAssignedWorks: payload => dispatch(setAssignedWorks(payload)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(WorkType);
