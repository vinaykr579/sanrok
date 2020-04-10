import {NavigationActions, StackActions} from 'react-navigation';

let _navigator;

function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

function navigate(routeName, params) {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    }),
  );
}

function push(routeName, params) {
  let pushAction = StackActions.push({
    routeName,
    params,
  });
  _navigator.dispatch(pushAction);
}

// add other navigation functions that you need and export them

export default {
  navigate,
  setTopLevelNavigator,
  push,
};
