import BaseService from './base-service';

export default class AssignedWorksService extends BaseService {
  makeRequest = async () => {
    try {
      let response = await this.api.get('GetAssignedWorks');
      return response;
    } catch (error) {
      this.showMsg();
    }
  };
}
