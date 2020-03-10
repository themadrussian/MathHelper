import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'

// import { AppRegistry } from 'react-native'
import AppContainer from './app/containers/AppContainer'
import {reducer} from './app/reducers'

// middleware that logs actions
const loggerMiddleware = createLogger({ predicate: (getState, action) => __DEV__  });

function configureStore(initialState) {
  const enhancer = compose(
    applyMiddleware(
      thunkMiddleware,  // dispatch() functions
      loggerMiddleware, // enabled logging
    ),
    //second argument to compose is empty
  );
  return createStore(reducer, initialState, enhancer);
}

const store = configureStore({});

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 1,
      myProblem: {},
      myAnswers: [],
    }
  }
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    )
  }
}
