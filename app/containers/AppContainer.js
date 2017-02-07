'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { ActionCreators } from '../actions'

import ApplicationTabs from './ApplicationTabs'

import Api from '../lib/api'

import BackgroundJob from "react-native-background-job"


class AppContainer extends Component {
    constructor(props) {
      super(props)

      // Cancel All Background Tasks
      BackgroundJob.cancelAll()

      const backgroundJob = {
        jobKey: 'loadPostBackground',
        job: () => {
          console.log('Loading Posts')
          Api.get(`/post/`).then(resp => {
            console.log(this.props.posts)
            console.log(resp)

            let newPosts = resp
            let oldPosts = this.props.posts

            if(oldPosts){
              if(newPosts[newPosts.length-1].postid === oldPosts[oldPosts.length-1].postid){
                console.log('no new post')
                // this._pushNotification(newPosts[newPosts.length-1])
              }else{
                this._pushNotification(newPosts[newPosts.length-1])
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
        title: post.title,
        message: "New Posts Available",
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
