import BaseService from './base-service';

class AssociatedUsersService extends BaseService {
  makeRequest = async workId => {
    try {
      let response = await this.api.get('GetAssociatedUsers', {
        params: {
          WorkId: workId,
        },
      });
      return response;
    } catch (error) {
      this.showMsg();
    }
  };
}

export default AssociatedUsersService;
