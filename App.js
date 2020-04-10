import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {ThemeProvider} from 'react-native-elements';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import Reducer from './reducers/index';
import Navigation from './navigations/navigation';
import NavigationUtils from './navigations/navigation-utils';

const theme = {
  Button: {
    raised: true,
  },
};

const store = createStore(Reducer);

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <NavigationContainer>
          <Navigation
            ref={navigatorRef => {
              NavigationUtils.setTopLevelNavigator(navigatorRef);
            }}
          />
        </NavigationContainer>
      </ThemeProvider>
    </Provider>
  );
};
export default App;
