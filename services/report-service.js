import BaseService from './base-service';

class ReportService extends BaseService {
  makeRequest = () => {
    this.api
      .get('GetWorkReport')
      .then(res => {
        this.mainObj.handleApiResponse(res);
      })
      .catch(_err => {
        this.showMsg();
        this.mainObj.setState({loading: false});
      });
  };
}

export default ReportService;
