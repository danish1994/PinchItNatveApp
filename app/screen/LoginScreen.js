'use strict'

import React, { Component } from 'react'

import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  TextInput,
  Image,
  ToastAndroid
} from 'react-native'

import {connect} from 'react-redux'

import Api from '../lib/api'

import ViewContainer from '../containers/ViewContainer'

const { width, height } = Dimensions.get('window')

const background = require('../images/bg.png')
const mark = require('../images/mark.png')
const lockIcon = require('../images/lock.png')
const personIcon = require('../images/person.png')

class LoginScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      pswd: ''
    }
  }

  render() {
    return (
      <ViewContainer>
        <View style={styles.container}>
          <Image source={background} style={styles.background} resizeMode='cover'>
            <View style={styles.markWrap}>
              <Image source={mark} style={styles.mark} resizeMode='contain' />
            </View>
            <View style={styles.wrapper}>
              <View style={styles.inputWrap}>
                <View style={styles.iconWrap}>
                  <Image source={personIcon} style={styles.icon} resizeMode='contain' />
                </View>
                <TextInput
                  placeholder='Email'
                  placeholderTextColor='#FFF'
                  style={[styles.input, styles.whiteFont]}
                  underlineColorAndroid='transparent'
                  returnKeyType='next'
                  keyboardType='email-address'
                  onChangeText={ (email) => this.setState({email}) }
                  value={this.state.email}
                />
              </View>
              <View style={styles.inputWrap}>
                <View style={styles.iconWrap}>
                  <Image source={lockIcon} style={styles.icon} resizeMode='contain' />
                </View>
                <TextInput
                  placeholderTextColor='#FFF'
                  placeholder='Password'
                  style={[styles.input, styles.whiteFont]}
                  underlineColorAndroid='transparent'
                  secureTextEntry={true}
                  returnKeyType='go'
                  onChangeText={ (pswd) => this.setState({pswd}) }
                  value={this.state.pswd}
                />
              </View>
              <TouchableOpacity activeOpacity={.5}>
                <View>
                  <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={.5} onPress = { () => this._signIn() }>
                <View style={styles.button}>
                  <Text style={styles.buttonText}>Sign In</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.container}>
              <View style={styles.signupWrap}>
                <Text style={styles.accountText}>Dont have an account?</Text>
                <TouchableOpacity activeOpacity={.5} onPress = {() => this._signUp()}>
                  <View>
                    <Text style={styles.signupLinkText}>Sign Up</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </Image>
        </View>
      </ViewContainer>
    )
  }

  _showMessage(msg){
    ToastAndroid.show(msg, ToastAndroid.SHORT, ToastAndroid.CENTER)
  }

  _signIn(){
    if(!this._validateEmail(this.state.email)){
      this._showMessage('Invalid Email. Please enter a valid Email.')
    }else{
      this._login(this._getParams(this.state))
    }
  }

  _getParams(user){
    var params = Object.keys(user).map(function(key){
      return encodeURIComponent(key) + '=' + encodeURIComponent(user[key])
    }).join('&')
    return params
  }

  _login(params){
    this._showMessage('Loggin you in.')
    console.log(params)
    return Api.post(`/user/login/`,params).then(resp => {
      if(resp.status === 0){
        var token = resp.message.token
        this._getUser(token)
      }else{
        this._showMessage(resp.message)
      }
    }).catch((err) => {
      console.log(err)
    })
  }

  _getUser(token){
    this._showMessage('Fetching your data.')
    return Api.get(`/user/`+token).then(resp => {
      this._setUser(token, resp)
    }).catch((err) => {
      console.log(err)
    })
  }

  _setUser(token, user){
    var newState = {
      status: true,
      token: token,
      user: user
    }
    this.props.setUser(newState)
  }

  _validateEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(email)
  }

  _signUp(){
    this.props.setActiveScreen('RegisterScreen')
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  markWrap: {
    flex: 1,
    paddingVertical: 30,
  },
  mark: {
    width: null,
    height: null,
    flex: 1,
  },
  background: {
    width,
    height,
  },
  wrapper: {
    paddingVertical: 30,
  },
  inputWrap: {
    flexDirection: 'row',
    marginVertical: 10,
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#CCC'
  },
  iconWrap: {
    paddingHorizontal: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    height: 20,
    width: 20,
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
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
  forgotPasswordText: {
    color: '#D8D8D8',
    backgroundColor: 'transparent',
    textAlign: 'right',
    paddingRight: 15,
  },
  signupWrap: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  accountText: {
    color: '#D8D8D8'
  },
  signupLinkText: {
    color: '#FFF',
    marginLeft: 5,
  },
  whiteFont: {
    color: '#FFF'
  }
})


function mapStateToProps(state){
  return {
    theme: state.theme.attributes
  }
}

export default connect(mapStateToProps)(LoginScreen)
