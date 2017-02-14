'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { ActionCreators } from '../actions'

import ApplicationTabs from './ApplicationTabs'

import Api from '../lib/api'

class AppContainer extends Component {
    constructor(props) {
        super(props)
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
