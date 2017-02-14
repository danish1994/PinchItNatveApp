'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { ActionCreators } from '../actions'

import ApplicationTabs from './ApplicationTabs'

import Api from '../lib/api'

import BackgroundJob from "react-native-background-job"

import {
    ToastAndroid,
    AsyncStorage
} from 'react-native'

// // Cancel All Background Tasks
// BackgroundJob.cancelAll()

// const backgroundJob = {
//     jobKey: 'loadPostBackground',
//     job: () => {
//         console.log('Background Task')
//         AsyncStorage.getItem('state').then((state) => {
//             if (state) {
//                 state = JSON.parse(state)
//                 let currentPost = undefined
//                 try {
//                     currentPost = state.posts[0]
//                 } catch (err) {
//                     // console.log(err)
//                 }
//                 let url = `/post/`
//                 if (currentPost) {
//                     url = `/post/?updatedAt=` + currentPost.updatedAt
//                 }
//                 Api.get(url).then(resp => {
//                     if (resp.length != 0) {
//                         let counter = resp.length > 5 ? 5 : resp.length
//                         for (let i = 0; i < counter; i++) {
//                             let post = resp[i]
//                             var PushNotification = require('react-native-push-notification')
//                             PushNotification.localNotification({
//                                 title: "New Pinch",
//                                 message: post.title,
//                                 bigText: post.title
//                             })
//                         }
//                         resp.concat(state.posts)
//                         state.posts = resp
//                         AsyncStorage.setItem('state', JSON.stringify(state)).then(() => {
//                             console.log('State Saved')
//                         })
//                     }
//                 }).catch((err) => {
//                     console.log(err)
//                 })
//             }
//         }).catch((err) => {
//             console.log(err)
//         })

//     },
//     persist: false
// }


// BackgroundJob.register(backgroundJob)


class AppContainer extends Component {
    constructor(props) {
        super(props)

        // var backgroundSchedule = {
        //     jobKey: "loadPostBackground",
        //     timeout: 5000,
        //     period: 9000000
        // }

        // BackgroundJob.schedule(backgroundSchedule)

    }

    render() {
        return ( < ApplicationTabs {...this.props }
            />
        )
    }
}

function mapStateToProps(state) {
    return {
        posts: state.posts,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
