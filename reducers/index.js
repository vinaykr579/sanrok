import {getDeviceId} from 'react-native-device-info';
import * as actions from './actions';

const initial_status = {
  masterData: {
    user: null,
    workTypes: [],
  },
  workTypeId: null,
  locationId: null,
  workId: null,
  stepId: null,
  deviceId: getDeviceId,
  userWorks: {},
  associatedUsers: {},
  headerTitle: '',
};

export default function Reducer(state = initial_status, action) {
  switch (action.type) {
    case actions.SET_MASTER_DATA: {
      return Object.assign({}, state, {
        masterData: action.payload,
      });
    }
    case actions.SET_WORKTYPE_ID: {
      return Object.assign({}, state, {
        workTypeId: action.payload,
      });
    }
    case actions.SET_USER_ASSIGNED_WORKS: {
      return Object.assign({}, state, {
        userWorks: action.payload,
      });
    }
    case actions.SET_WORK_LOCATION: {
      return Object.assign({}, state, {
        locationId: action.payload,
      });
    }
    case actions.SET_WORK_ID: {
      return Object.assign({}, state, {
        workId: action.payload,
      });
    }
    case actions.SET_STEP_ID: {
      return Object.assign({}, state, {
        stepId: action.payload,
      });
    }
    case actions.SET_ASSOCIATED_USERS: {
      let ausers = {...state.associatedUsers};
      ausers[action.payload.workId] = action.payload.users;
      return Object.assign({}, state, {
        associatedUsers: ausers,
      });
    }
    case actions.SET_HEADER_TITLE: {
      return Object.assign({}, state, {
        headerTitle: action.payload,
      });
    }
    case actions.LOGOUT: {
      return initial_status;
    }
    default:
      return state;
  }
}
