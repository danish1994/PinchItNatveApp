'use strict'

import React, { Component } from 'react'
import {
  DrawerLayoutAndroid,
  Button,
  View,
  Text,
  ToolbarAndroid,
  StyleSheet,
  Dimensions,
  Image
} from 'react-native'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { ActionCreators } from '../../actions'

import AppNavigator from '../AppNavigator'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

class ApplicationTabs extends Component {
    constructor(props) {
        super(props)
    }

    render() {
      console.log(this.props.theme)
      var _renderDrawer = (
        <View style={styles.container}>
          <View style={{flex: 2, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
            <View style={{flex: 0.2}} />
            <View style={{flex: 1}}>
              <Image
                style={{width: 100, height: 100, borderRadius: 50}}
                source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}} />
            </View>
            <View style={{flex: 2}}>
              <Text style={[styles.heading, {color: this.props.theme.color}]}>Hi! User.</Text>
            </View>
          </View>
          <View style={{flex: 5}}>
            <Button
              onPress = {() => this._activeScreen('TitleScreen')}
              title = 'Home'
            />
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
              title = 'Themes'
            />
          </View>
        </View>
      )

      return(
        <DrawerLayoutAndroid
          drawerBackgroundColor= {this.props.drawerTheme}
          drawerWidth={300}
          drawerPosition={ DrawerLayoutAndroid.positions.Left }
          renderNavigationView={() => _renderDrawer}
          ref={'drawer'}>
          <AppNavigator
            { ...this.props } />
        </DrawerLayoutAndroid>
      )
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
    fontSize: windowHeight/20,
    textAlign: 'center',
    margin: 10
  },
  text: {
    fontSize: windowHeight/35,
    margin: 20,
    textAlign: 'justify'
  }
})

function mapStateToProps(state){
  return {
    activeScreen: state.activeScreen,
    drawerTheme: state.drawerTheme,
    theme: state.theme.attributes,
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators(ActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationTabs);
