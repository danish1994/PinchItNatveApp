'use strict'

import React, { Component } from 'react'

import {
    AppRegistry,
    AsyncStorage
} from 'react-native'

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

import Api from './app/lib/api'

// Register Push Notifications
var PushNotification = require('react-native-push-notification');

PushNotification.configure({
    // (optional) Called when Token is generated (iOS and Android)
    onRegister: function(token) {
        try {
            console.log(token)
            Api.post(`/deviceid/`, encodeURIComponent('deviceid') + '=' + encodeURIComponent(token.token) + "&" + encodeURIComponent('source') + '=' + encodeURIComponent('android')).then(resp => {
                console.log(resp)
            }).catch((err) => {
                console.log(err)
            })
        } catch (err) {
            console.log(err)
        }
    },

    // (required) Called when a remote or local notification is opened or received
    onNotification: function(notification) {
        console.log('NOTIFICATION:', notification)
        let posts = []
        posts.push(notification)
        try {
            AsyncStorage.getItem('state').then((resp) => {
                if (resp) {
                    resp = JSON.parse(resp)
                    resp.posts = posts.concat(resp.posts)
                    saveState(resp)
                }
            }).catch((err) => {
                console.log(err)
            })
        } catch (err) {
            console.log(err)
        }

    },

    // ANDROID ONLY: GCM Sender ID (optional - not required for local notifications, but is need to receive remote push notifications)
    senderID: "756150409433",

    // IOS ONLY (optional): default: all - Permissions to register.
    permissions: {
        alert: true,
        badge: true,
        sound: true
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


const loggerMiddleware = createLogger({ predicate: (getState, action) => __DEV__ })

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

const App = () => ( < Provider store = { store } >
    < AppContainer / >
    < /Provider>
)

AppRegistry.registerComponent('Pinch', () => App)
