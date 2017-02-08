'use strict'

import React, { Component } from 'react'
import { AppRegistry } from 'react-native'

import { Provider } from 'react-redux'
import {
  createStore,
  applyMiddleware,
  combineReducers,
  compose
} from 'redux'

import { loadState, saveState } from './app/lib/localStorage'

import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'

import reducer from './app/reducers'

import AppContainer from './app/containers/AppContainer'

// Register Push Notifications
var PushNotification = require('react-native-push-notification');

PushNotification.configure({
  // (required) Called when a remote or local notification is opened or received
  onNotification: function(notification) {
      console.log( 'NOTIFICATION:', notification );
  },

  // Should the initial notification be popped automatically
  // default: true
  popInitialNotification: true,

  /**
    * (optional) default: true
    * - Specified if permissions (ios) and token (android and ios) will requested or not,
    * - if not, you must call PushNotificationsHandler.requestPermissions() later
    */
  requestPermissions: true,
});


const loggerMiddleware = createLogger({ predicate: (getState, action) => __DEV__  })

function configureStore(initialState) {
  const enhancer = compose(
    applyMiddleware(
      thunkMiddleware,
      loggerMiddleware
    )
  )
  return createStore(reducer, initialState, enhancer)
}

const store = configureStore({});

store.subscribe(() => {
  saveState(store.getState())
})

const App = () => (
  <Provider store = {store}>
    <AppContainer />
  </Provider>
)

AppRegistry.registerComponent('Pinch', () => App)
