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
  ToastAndroid,
} from 'react-native'

import {connect} from 'react-redux'

import Api from '../lib/api'

import ViewContainer from '../containers/ViewContainer'

const { width, height } = Dimensions.get('window')

const background = require('../images/bg.png')
const personIcon = require('../images/person.png')
const lockIcon = require('../images/lock.png')
const emailIcon = require('../images/email.png')

class RegisterScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      pswd: ''
    }
  }

  render() {
    return (
      <ViewContainer>
        <View style={styles.container}>
          <Image
            source={background}
            style={[styles.container, styles.bg]}
            resizeMode='cover'>
            <View style={styles.headerContainer}>
              <View style={styles.headerTitleView}>
                <Text style={styles.titleViewText}>Sign Up</Text>
              </View>
            </View>
            <View style={styles.inputsContainer}>
              <View style={styles.inputContainer}>
                <View style={styles.iconContainer}>
                  <Image
                    source={personIcon}
                    style={styles.inputIcon}
                    resizeMode='contain'
                  />
                </View>
                <TextInput
                  style={[styles.input, styles.whiteFont]}
                  placeholder='Name'
                  placeholderTextColor='#FFF'
                  underlineColorAndroid='transparent'
                  returnKeyType='next'
                  onChangeText={ (name) => this.setState({name}) }
                  value={this.state.name}
                />
              </View>

              <View style={styles.inputContainer}>
                <View style={styles.iconContainer}>
                  <Image
                    source={emailIcon}
                    style={styles.inputIcon}
                    resizeMode='contain'
                  />
                </View>
                <TextInput
                  style={[styles.input, styles.whiteFont]}
                  placeholder='Email'
                  placeholderTextColor='#FFF'
                  keyboardType='email-address'
                  underlineColorAndroid='transparent'
                  returnKeyType='next'
                  onChangeText={ (email) => this.setState({email}) }
                  value={this.state.email}
                />
              </View>

              <View style={styles.inputContainer}>
                <View style={styles.iconContainer}>
                  <Image
                    source={lockIcon}
                    style={styles.inputIcon}
                    resizeMode='contain'
                  />
                </View>
                <TextInput
                  secureTextEntry={true}
                  style={[styles.input, styles.whiteFont]}
                  placeholder='Password'
                  placeholderTextColor='#FFF'
                  underlineColorAndroid='transparent'
                  returnKeyType='go'
                  onChangeText={ (pswd) => this.setState({pswd}) }
                  value={this.state.pswd}
                />
              </View>
            </View>
            <View style={styles.footerContainer}>
              <TouchableOpacity onPress = { () => this._signUp() }>
                <View style={styles.signup}>
                  <Text style={styles.whiteFont}>Join</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress = { () => this._signIn() }>
                <View style={styles.signin}>
                  <Text style={styles.greyFont}>Already have an account?<Text style={styles.whiteFont}> Sign In</Text></Text>
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

  _signUp(){
    if(!this._validateEmail(this.state.email)){
      this._showMessage('Invalid Email. Please enter a valid Email.')
    }else{
      this._register()
    }
  }

  _getParams(user){
    var params = Object.keys(user).map(function(key){
      return encodeURIComponent(key) + '=' + encodeURIComponent(user[key])
    }).join('&')
    return params
  }

  _register(){
    this._showMessage('Registering Please Wait')
    var params = this._getParams(this.state)
    return Api.post(`/user/`,params).then(resp => {
      if(resp.status === 0){
        this._login(params)
      }else{
        this._showMessage(resp.message)
      }
    }).catch((err) => {
      console.log(err)
    })
  }

  _login(params){
    this._showMessage('Successfully Registered. Loggin you in.')
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

  _signIn(){
    this.props.setActiveScreen('LoginScreen')
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bg: {
    paddingTop: 30,
    width: null,
    height: null
  },
  headerContainer: {
    flex: 1,
  },
  inputsContainer: {
    flex: 3,
    marginTop: 50,
  },
  footerContainer: {
    flex: 1
  },
  headerIconView: {
    marginLeft: 10,
    backgroundColor: 'transparent'
  },
  headerBackButtonView: {
    width: 25,
    height: 25,
  },
  backButtonIcon: {
    width: 25,
    height: 25
  },
  headerTitleView: {
    backgroundColor: 'transparent',
    marginTop: 25,
    marginLeft: 25,
  },
  titleViewText: {
    fontSize: 40,
    color: '#fff',
  },
  inputs: {
    paddingVertical: 20,
  },
  inputContainer: {
    borderWidth: 1,
    borderBottomColor: '#CCC',
    borderColor: 'transparent',
    flexDirection: 'row',
    height: 75,
  },
  iconContainer: {
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputIcon: {
    width: 30,
    height: 30,
  },
  input: {
    flex: 1,
    fontSize: 20,
  },
  signup: {
    backgroundColor: '#FF3366',
    paddingVertical: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  signin: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  greyFont: {
    color: '#D8D8D8'
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

export default connect(mapStateToProps)(RegisterScreen)
