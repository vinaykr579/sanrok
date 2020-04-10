import BaseService from './base-service';

class VerifyToken extends BaseService {
  makeRequest = async () => {
    try {
      return await this.api.post('VerifyToken');
    } catch (error) {
      this.showMsg();
    }
  };
}

export default VerifyToken;
