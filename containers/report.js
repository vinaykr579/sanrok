import React, {Component} from 'react';
import ReportScreen from '../screens/report-screen';
import OverLay from '../components/ui/overlay';
import ReportService from '../services/report-service';
import Loader from '../components/ui/loader';
import {Alert} from 'react-native';

class Report extends Component {
  state = {
    isVisible: false,
    reports: [],
    loading: true,
  };

  overlay = {
    title: '',
    content: '',
    type: '',
  };

  componentDidMount() {
    let obj = new ReportService(this);
    obj.makeRequest();
  }

  handleApiResponse = response => {
    if (response.data.message === 'success') {
      this.setState({
        reports: response.data.result.reports,
        loading: false,
      });
    } else {
      this.setState({loading: false});
      Alert.alert('Sanrok', response.data.message, [{text: 'Ok'}]);
    }
  };

  closeOverlay = () => {
    this.setState({isVisible: false});
  };

  renderOverLay = () => {
    return (
      <OverLay
        type={this.overlay.type}
        content={this.overlay.content}
        title={this.overlay.title}
        closeOverlay={this.closeOverlay}
      />
    );
  };

  setOverLay = (type, title, content) => {
    this.overlay.title = title;
    this.overlay.type = type;
    this.overlay.content = content;
    this.setState({
      isVisible: true,
    });
  };

  renderLoader = () => {
    return <Loader />;
  };

  onRefresh = () => {
    this.setState({loading: true});
    let obj = new ReportService(this);
    obj.makeRequest();
  };

  render() {
    if (this.state.loading) {
      return this.renderLoader();
    }
    if (this.state.isVisible) {
      return this.renderOverLay();
    }
    return (
      <ReportScreen
        reports={this.state.reports}
        onRefresh={this.onRefresh}
        refreshing={this.state.loading}
        setOverLay={this.setOverLay}
      />
    );
  }
}

export default Report;
