import axios from 'axios';
import {ToastAndroid} from 'react-native';

var accessToken = null;

export const setAccessToken = token => {
  accessToken = token;
};

const axiosReq = axios.create({
  baseURL: 'http://sanrokmis.in/api/',
  responseType: 'json',
  timeout: 60000,
  maxRedirects: 0,
  transformResponse: [
    data => {
      return data;
    },
  ],
  headers: {
    'x-api-key': {
      toString() {
        return accessToken;
      },
    },
  },
});

class BaseService {
  api = axiosReq;
  mainObj = null;
  data = null;

  constructor(mainObj) {
    this.mainObj = mainObj;
  }

  requestStr = () => {
    console.log('BaseService method requestStr called');
    //{reqKey: 'Destination', localKey: false, calcFun:'getDestination'},
    return [];
  };

  showMsg = () => {
    ToastAndroid.show(
      'Unable to connect to internet. Please check your internet connection.',
      10,
    );
  };
  createRequestBody = (data = {}) => {
    let result = {};
    let bodystr = this.requestStr();
    bodystr.forEach(str => {
      if (str.localKey !== false) {
        result[str.reqKey] = data[str.localKey];
      } else {
        result[str.reqKey] = this[str.calcFun]();
      }
    });
    return result;
  };

  makeRequest = data => {
    console.log('makeRequest method called from base service');
    let request = this.createRequestBody(data);
    return request;
  };
}

export default BaseService;
