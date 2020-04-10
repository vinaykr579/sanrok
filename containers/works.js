import React, {Component} from 'react';
import {connect} from 'react-redux';
import WorkScreen from '../screens/work-screen';
import {setWorkId, setHeaderTitle} from '../reducers/actions';
import NavigationUtils from '../navigations/navigation-utils';

class Works extends Component {
  getUserWorks = () => {
    let works = this.props.userWorks.works.filter(wrk => {
      return (
        parseInt(wrk.LocationId, 10) === parseInt(this.props.locationId, 10) &&
        parseInt(wrk.WorkTypeId, 10) === parseInt(this.props.workTypeId, 10)
      );
    });
    return works;
  };

  handleWorkSelection = (wrkId, wrkName) => {
    this.props.setWorkId(wrkId);
    this.props.setHeaderTitle(wrkName);
    NavigationUtils.push('Steps');
  };

  render() {
    return (
      <WorkScreen
        works={this.getUserWorks()}
        onPress={this.handleWorkSelection}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    locationId: state.locationId,
    userWorks: state.userWorks,
    workTypeId: state.workTypeId,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setWorkId: workId => dispatch(setWorkId(workId)),
    setHeaderTitle: title => dispatch(setHeaderTitle(title)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Works);
