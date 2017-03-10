'use strict'

import React, { Component } from 'react'
import {
  Alert,
  DrawerLayoutAndroid,
  Button,
  View,
  Text,
  ToolbarAndroid,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  BackAndroid
} from 'react-native'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { ActionCreators } from '../../actions'

import AppNavigator from '../AppNavigator'

const userImage = require('../../images/user.png')

const { width, height } = Dimensions.get('window')

class ApplicationTabs extends Component {
    constructor(props) {
        super(props)
        BackAndroid.addEventListener('hardwareBackPress', function() {
          Alert.alert(
            'Exit',
            'Do you really want to exit the app?',
            [
              {text: 'Cancel', onPress: () => {
                console.log('Canceled')
              }, style: 'cancel'},
              {text: 'OK', onPress: () => {
                BackAndroid.exitApp(0)
              }},
            ]
          )
          return true
        })
    }

    render() {
      var _renderDrawer = (
        <View style={styles.container}>
          <TouchableOpacity onPress = {() => this._user()} style={{flex: 2}}>
            <View style={{flex: 2, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
              <View style={{flex: 0.2}} />
              <View style={{flex: 1}}>
                <Image
                  style={{width: 100, height: 100, borderRadius: 50}}
                  source={userImage} />
              </View>
              <View style={{flex: 2}}>
                <Text style={[styles.heading, {color: this.props.theme.color}]}>Hi! { this.props.username }.</Text>
              </View>
            </View>
          </TouchableOpacity>
          <View style={{flex: 5}}>
            <Button
              onPress = {() => this._activeScreen('PostScreen')}
              title = 'Posts'
            />
            <Button
              onPress = {() => this._activeScreen('AboutScreen')}
              title = 'About Us'
            />
            <Button
              onPress = {() => this._activeScreen('ThemeScreen')}
              title = 'Modes'
            />
          </View>
        </View>
      )

      return(
        <DrawerLayoutAndroid
          drawerBackgroundColor= {this.props.drawerTheme}
          drawerWidth={width}
          drawerPosition={ DrawerLayoutAndroid.positions.Left }
          renderNavigationView={() => _renderDrawer}
          ref={'drawer'}>
          <AppNavigator
            { ...this.props } />
        </DrawerLayoutAndroid>
      )
    }

    _user(){
      console.log('user')
      // if(this.props.loggedIn.status)
      //   this._activeScreen('UserScreen')
      // else
      //   this._activeScreen('LoginScreen')
    }

    _activeScreen(key){
      this.props.setActiveScreen(key)
      this.refs['drawer'].closeDrawer(0)
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20
  },
  heading: {
    fontSize: height/20,
    textAlign: 'center',
    margin: 10
  },
  text: {
    fontSize: height/35,
    margin: 20,
    textAlign: 'justify'
  }
})

function mapStateToProps(state){
  var name = 'User'
  if(state.user.status)
    name = state.user.user.name

  return {
    activeScreen: state.activeScreen,
    drawerTheme: state.drawerTheme,
    theme: state.theme.attributes,
    loggedIn: state.user,
    username: name
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators(ActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationTabs);
