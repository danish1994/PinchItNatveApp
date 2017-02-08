'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { ActionCreators } from '../actions'

import ApplicationTabs from './ApplicationTabs'

import Api from '../lib/api'

import BackgroundJob from "react-native-background-job"

import {
  ToastAndroid
} from 'react-native'


class AppContainer extends Component {
    constructor(props) {
      super(props)

      // Cancel All Background Tasks
      BackgroundJob.cancelAll()

      const backgroundJob = {
        jobKey: 'loadPostBackground',
        job: () => {
          // ToastAndroid.show('Background Proccess Test.', ToastAndroid.SHORT)
          let currentPost = this.props.posts[0]
          let url = `/post/`
          if(currentPost){
            url = `/post/?updatedAt=` + currentPost.updatedAt 
          }
          Api.get(url).then(resp => {
            // this.props.setPosts({ posts: resp }, true)
            if(resp.length != 0){
              this.props.setPosts({ posts: resp }, true)
              for(let i=0; i<resp.length; i++){
                this._pushNotification(resp[i])  
              }
            }
          }).catch((err) => {
            console.log(err)
          })
        }
      }
       
      BackgroundJob.register(backgroundJob)
       
      var backgroundSchedule = {
        jobKey: "loadPostBackground",
        timeout: 5000,
        period: 10000
      }
       
      BackgroundJob.schedule(backgroundSchedule)

    }

    _pushNotification(post){
      var PushNotification = require('react-native-push-notification')
      PushNotification.localNotification({
        title: "New Pinch",
        message: post.title,
        bigText: post.title
      })
    }

    render() {
      return(
        <ApplicationTabs
          { ...this.props } />
      )
    }
}

function mapStateToProps(state){
  return {
    posts: state.posts,
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators(ActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
