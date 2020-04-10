import BaseService from './base-service';

class SaveWorkDetails extends BaseService {
  requestStr = () => {
    return [
      {reqKey: 'Narration', localKey: 'narration'},
      {reqKey: 'ImageStr', localKey: false, calcFun: 'getImageStr'},
      {reqKey: 'LocationId', localKey: false, calcFun: 'getLocationId'},
      {
        reqKey: 'LocationDetails',
        localKey: false,
        calcFun: 'getLocationDetails',
      },
      {reqKey: 'WorkId', localKey: false, calcFun: 'getWorkId'},
      {reqKey: 'StepId', localKey: false, calcFun: 'getStepId'},
      {reqKey: 'WorkType', localKey: false, calcFun: 'getWorkType'},
      {reqKey: 'WorkStatus', localKey: false, calcFun: 'getWorkStatus'},
      {reqKey: 'ChangedItems', localKey: false, calcFun: 'getChangedItems'},
      {
        reqKey: 'AssociatedUsers',
        localKey: false,
        calcFun: 'getAssociatedUsers',
      },
    ];
  };

  makeRequest = data => {
    let request = this.createRequestBody(data);
    this.api
      .post('SaveWork', request)
      .then(res => {
        this.mainObj.handleApiResponse(res);
      })
      .catch(_err => {
        this.mainObj.setState({loading: false});
        this.showMsg();
      });
  };

  getWorkStatus = () => {
    let wrkStatus = this.mainObj.state.workStatus;
    return wrkStatus === true ? 2 : 1;
  };

  getChangedItems = () => {
    return this.mainObj.state.selectedItems.join(',');
  };

  getAssociatedUsers = () => {
    return this.mainObj.state.associatedUsers.join(',');
  };

  getImageStr = () => {
    if (this.mainObj.state.imageData.hasOwnProperty('base64')) {
      return this.mainObj.state.imageData.base64;
    }
    return '';
  };

  getLocationId = () => {
    return this.mainObj.props.locationId;
  };

  getWorkId = () => {
    return this.mainObj.props.selectedWork;
  };

  getStepId = () => {
    return this.mainObj.props.stepId;
  };

  getWorkType = () => {
    return this.mainObj.props.workTypeId;
  };

  getLocationDetails = () => {
    return JSON.stringify(this.mainObj.userLocation);
  };
}

export default SaveWorkDetails;
