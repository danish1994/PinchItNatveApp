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

AppRegistry.registerComponent('pinch', () => App)
