'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { ActionCreators } from '../actions'

import ApplicationTabs from './ApplicationTabs'

import Api from '../lib/api'

import BackgroundJob from "react-native-background-job"


BackgroundJob.cancelAll();

const backgroundJob = {
  jobKey: 'loadPostBackground',
  job: () => {
    console.log('Loading Posts')
    Api.get(`/post/`).then(resp => {
      console.log(resp)
    }).catch((err) => {
      console.log(err)
    })
  }
};
 
BackgroundJob.register(backgroundJob);
 
var backgroundSchedule = {
 jobKey: "loadPostBackground",
 timeout: 5000
}
 
BackgroundJob.schedule(backgroundSchedule);

class AppContainer extends Component {
    constructor(props) {
      super(props)
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

  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators(ActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
