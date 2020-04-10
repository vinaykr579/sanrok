import BaseService from './base-service';

class LoginService extends BaseService {
  requestStr = () => {};

  makeRequest = data => {
    this.api
      .post('Login', data)
      .then(res => {
        this.mainObj.handleLoginApiResponse(res);
      })
      .catch(_err => {
        this.mainObj.setState({loading: false});
        this.showMsg();
      });
  };
}
export default LoginService;
