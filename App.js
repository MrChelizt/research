import React, {useEffect} from "react";
import NavigationContainer from "./navigation/navigationContainer";
import {Provider} from "react-redux";
import {applyMiddleware, combineReducers, createStore} from "redux";
import usersReducer from "./store/reducers/user";
import ReduxThunk from "redux-thunk";
import AsyncStorage from "@react-native-async-storage/async-storage";
import dynamicLinks from "@react-native-firebase/dynamic-links";

const rootReducer = combineReducers({
  users: usersReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
// Two handle methods are used for dynamic link handling.
// One of them works when app is on background and the other is works on when app is closed
  useEffect(() => {
    dynamicLinks().getInitialLink().then(link => {
      if (link.url.search('https://your.page.link/') > 0) {
        dispatch({type: 'SIGN_UP'});
      }
    });
  });

  const handleDynamicLink = link => {
    // Handle dynamic link inside your own application
    if (link.url.search('https://your.page.link/') > 0) {
      dispatch({type: 'SIGN_UP'});
    }
  };

  const [state, dispatch] = React.useReducer(
      (prevState, action) => {
        switch (action.type) {
          case 'RESTORE_TOKEN':
            return {
              ...prevState,
              userToken: action.token,
              isLoading: false,
            };
          case 'SIGN_UP':
            return {
              ...prevState,
              emailVerified: true,
              isLoading: false,
            };
        }

      },
      {
        isLoading: true,
        emailVerified: false,
        userToken: null,
      }
  );

  React.useEffect(() => {
    const bootstrapAsync = async () => {

      let userToken;
      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        console.log("Restoring token failed");
      } finally {
        dispatch({type: 'RESTORE_TOKEN', token: userToken});
      }
    };
    bootstrapAsync();
  }, []);


  useEffect(() => {
    const unsubscribe = dynamicLinks().onLink(handleDynamicLink);
    return () => unsubscribe();
  }, []);


  return (
      <Provider store={store}>
        <NavigationContainer state={state}/>
      </Provider>
  );
}
