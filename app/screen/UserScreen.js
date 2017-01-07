'use strict'

import React, { Component } from 'react'

import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  Image,
  TextInput,
  ToastAndroid
} from 'react-native'

import {connect} from 'react-redux'

import ViewContainer from '../containers/ViewContainer'

const { width, height } = Dimensions.get('window')

const background = require('../images/bg.png')
const mark = require('../images/mark.png')

class UserScreen extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <ViewContainer>
        <View style={styles.container}>
          <Image source={background} style={styles.background} resizeMode='cover'>
            <View style={styles.markWrap}>
              <Image source={mark} style={styles.mark} resizeMode='contain' />
              <View style={{flex: 1}}>
                <Text style={[styles.text, styles.whiteFont]}>{this.props.user.name}</Text>
                <Text style={[styles.email, styles.whiteFont]}>{this.props.user.email}</Text>
              </View>
            </View>
            <View style={styles.wrapper}>
              <TouchableOpacity activeOpacity={.5} onPress = { () => this._logout() }>
                <View style={styles.button}>
                  <Text style={styles.buttonText}>Logout</Text>
                </View>
              </TouchableOpacity>
            </View>
          </Image>
        </View>
      </ViewContainer>
    )
  }

  _showMessage(msg){
    ToastAndroid.showWithGravity(msg, ToastAndroid.SHORT, ToastAndroid.CENTER)
  }

  _logout(){
    this._showMessage('Successfully Logged Out.')
    this.props.logout()
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  markWrap: {
    flex: 0.5
  },
  mark: {
    width: width/2,
    height: height/4,
    flex: 1,
    alignSelf: 'center'
  },
  background: {
    width,
    height,
  },
  wrapper: {
    paddingVertical: 30,
  },
  text: {
    flex: 1,
    alignItems: 'center',
    fontSize: height/15,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  email: {
    flex: 1,
    alignItems: 'center',
    fontSize: height/20,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  button: {
    backgroundColor: '#FF3366',
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
  },
  accountText: {
    color: '#D8D8D8'
  },
  whiteFont: {
    color: '#FFF'
  }
})


function mapStateToProps(state){
  return {
    theme: state.theme.attributes,
    user: state.user.user
  }
}

export default connect(mapStateToProps)(UserScreen)
