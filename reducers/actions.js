export const LOGIN_FORM_SUBMIT = 'LOGIN_FORM_ACTION';
export const SET_MASTER_DATA = 'SET_MASTER_DATA';
export const SET_WORKTYPE_ID = 'SET_WORKTYPE_ID';
export const SET_USER_ASSIGNED_WORKS = 'SET_USER_ASSIGNED_WORKS';
export const SET_WORK_LOCATION = 'SET_WORK_LOCATION';
export const SET_WORK_ID = 'SET_WORK_ID';
export const SET_STEP_ID = 'SET_STEP_ID';
export const SET_ASSOCIATED_USERS = 'SET_ASSOCIATED_USERS';
export const SET_HEADER_TITLE = 'SET_HEADER_TITLE';
export const LOGOUT = 'LOGOUT';

export const setMasterData = (user, workTypes) => {
  let payload = {
    user: user,
    workTypes: workTypes,
  };
  return {
    type: SET_MASTER_DATA,
    payload: payload,
  };
};

export const setWorkTypeId = typeId => {
  return {
    type: SET_WORKTYPE_ID,
    payload: typeId,
  };
};

export const setAssignedWorks = payload => {
  return {
    type: SET_USER_ASSIGNED_WORKS,
    payload: payload,
  };
};

export const setWorkLocation = locationId => {
  return {
    type: SET_WORK_LOCATION,
    payload: locationId,
  };
};

export const setWorkId = workId => {
  return {
    type: SET_WORK_ID,
    payload: workId,
  };
};

export const setStepId = stepId => {
  return {
    type: SET_STEP_ID,
    payload: stepId,
  };
};

export const setAssociatedUsers = (workId, associatedUsers) => {
  return {
    type: SET_ASSOCIATED_USERS,
    payload: {
      workId: workId,
      users: associatedUsers,
    },
  };
};

export const setHeaderTitle = title => {
  return {
    type: SET_HEADER_TITLE,
    payload: title,
  };
};
