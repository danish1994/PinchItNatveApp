'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { ActionCreators } from '../actions'

import ApplicationTabs from './ApplicationTabs'

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
