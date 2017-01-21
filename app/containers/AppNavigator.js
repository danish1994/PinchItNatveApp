'use strict'

import React, {Component} from 'react'
import {
  StyleSheet,
  ToastAndroid
} from 'react-native'

import { connect } from 'react-redux'

import AboutScreen from '../screen/AboutScreen'
import TitleScreen from '../screen/TitleScreen'
import PostScreen from '../screen/PostScreen'
import ThemeScreen from '../screen/ThemeScreen'
import LoadScreen from '../screen/LoadScreen'
import UserScreen from '../screen/UserScreen'
import LoginScreen from '../screen/LoginScreen'
import RegisterScreen from '../screen/RegisterScreen'
import TutorialScreen from '../screen/TutorialScreen'

import { loadState, saveState } from '../lib/localStorage'

import Api from '../lib/api'


class AppNavigator extends Component {
    constructor(props) {
        super(props)
    }

    render() {
      let Scene = null;
      if (this.props.activeScreen === 'TitleScreen'){ Scene = TitleScreen }
      if (this.props.activeScreen === 'PostScreen'){
        if(this.props.posts.length == 0){
          ToastAndroid.show('Loading Posts. Please Wait.', ToastAndroid.SHORT)
          Api.get(`/post/`).then(resp => {
            this.props.setPosts({ posts: resp })
            this.props.setActiveScreen('PostScreen')
          }).catch((err) => {
            console.log(err)
            ToastAndroid.show('Please check your connection.', ToastAndroid.SHORT)
            this.props.setActiveScreen('TitleScreen')
          })
          Scene = TitleScreen
        }else{
          Scene = PostScreen
        }
      }
      if (this.props.activeScreen === 'AboutScreen'){ Scene = AboutScreen }
      if (this.props.activeScreen === 'ThemeScreen'){ Scene = ThemeScreen }
      if (this.props.activeScreen === 'LoadScreen'){ Scene = LoadScreen }
      if (this.props.activeScreen === 'UserScreen'){ Scene = UserScreen }
      if (this.props.activeScreen === 'RegisterScreen'){ Scene = RegisterScreen }
      if (this.props.activeScreen === 'LoginScreen'){ Scene = LoginScreen }
      if (this.props.activeScreen === 'TutorialScreen'){ Scene = TutorialScreen }

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
    theme: state.theme.attributes,
    posts: state.posts
  }
}

export default connect(mapStateToProps)(AppNavigator)
