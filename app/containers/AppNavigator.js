'use strict'

import React, {Component} from 'react'
import { StyleSheet } from 'react-native'

import { connect } from 'react-redux'

import AboutScreen from '../screen/AboutScreen'
import TitleScreen from '../screen/TitleScreen'
import PostScreen from '../screen/PostScreen'
import ThemeScreen from '../screen/ThemeScreen'
import LoadScreen from '../screen/LoadScreen'

import { loadState, saveState } from '../lib/localStorage'


class AppNavigator extends Component {
    constructor(props) {
        super(props)
    }

    render() {
      let Scene = null;
      if (this.props.activeScreen === 'TitleScreen') { Scene = TitleScreen }
      if (this.props.activeScreen === 'PostScreen') { Scene = PostScreen }
      if (this.props.activeScreen === 'AboutScreen') { Scene = AboutScreen }
      if (this.props.activeScreen === 'ThemeScreen') { Scene = ThemeScreen }
      if (this.props.activeScreen === 'LoadScreen') { Scene = LoadScreen }

      return(
        <Scene {...this.props} />
      )
    }
}

const styles = StyleSheet.create({
  NavigatorStyle: {

  }
})


function mapStateToProps(state){
  return {
    theme: state.theme.attributes
  }
}

export default connect(mapStateToProps)(AppNavigator)
