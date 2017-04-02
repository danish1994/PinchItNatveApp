'use strict'

import React, { Component } from 'react'
import {
  Alert,
  DrawerLayoutAndroid,
  View,
  Text,
  ToolbarAndroid,
  ToastAndroid,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  BackAndroid,
  Button,
  Share
} from 'react-native'

import { Header, Title, Content, Left, Right, Body, Icon } from 'native-base'

import {FBLogin, FBLoginManager} from 'react-native-facebook-login';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { ActionCreators } from '../../actions'

import AppNavigator from '../AppNavigator'

import Api from '../../lib/api'

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

        this.fbLogin

        FBLoginManager.LoginBehaviors = {
          SystemAccount: "DEVICE_AUTH",
          NativeOnly: "NATIVE_ONLY",
          Native: "NATIVE_WITH_FALLBACK", // android default
          Web: "WEB_ONLY",
          Katana: "KATANA_ONLY",
          WebView: "WEB_VIEW_ONLY"
        }
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
          <View style={{flex: 2}}>
          <FBLogin style={{ marginBottom: 10, }}
            ref={(fbLogin) => { this.fbLogin = fbLogin }}
            permissions={["email","user_friends"]}
            loginBehavior={FBLoginManager.LoginBehaviors.Native}
            onLogin={function(data){
              console.log("Logged in!");
              console.log(data);
              // _this.setState({ user : data.credentials });
            }}
            onLogout={function(){
              console.log("Logged out.");
              // _this.setState({ user : null });
            }}
            onLoginFound={function(data){
              console.log("Existing login found.");
              console.log(data);
              // _this.setState({ user : data.credentials });
            }}
            onLoginNotFound={function(){
              console.log("No user logged in.");
              // _this.setState({ user : null });
            }}
            onError={function(data){
              console.log("ERROR");
              console.log(data);
            }}
            onCancel={function(){
              console.log("User cancelled.");
            }}
            onPermissionsMissing={function(data){
              console.log("Check permissions!");
              console.log(data);
            }}
          />
          </View>
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
              onPress = {() => this._activeScreen('CategoryScreen')}
              title = 'Category'
            />
            <Button
              onPress = {() => this._activeScreen('ThemeScreen')}
              title = 'Modes'
            />
          </View>
        </View>
      )

      if(this.props.activeScreen == 'TutorialScreen' || this.props.activeScreen == 'LoadScreen'){
        return(
          <DrawerLayoutAndroid
            drawerBackgroundColor= {this.props.drawerTheme}
            drawerWidth={width}
            drawerPosition={ DrawerLayoutAndroid.positions.Left }
            renderNavigationView={() => _renderDrawer}
            ref={'drawer'}>
            <AppNavigator
              { ...this.props }
           />
          </DrawerLayoutAndroid>
        )  
      }else{
        if(this.props.activeScreen == 'PostScreen'){
          return(
            <DrawerLayoutAndroid
              drawerBackgroundColor= {this.props.drawerTheme}
              drawerWidth={width}
              drawerPosition={ DrawerLayoutAndroid.positions.Left }
              renderNavigationView={() => _renderDrawer}
              ref={'drawer'}>
              <Header style={{backgroundColor: this.props.theme.backgroundColor}}>
                <Left>
                  <TouchableOpacity onPress = {() => this.refs['drawer'].openDrawer(0) }>
                    <Icon name='menu' style={this.props.theme} />
                  </TouchableOpacity>
                </Left>
                <Body>
                    <Title style={this.props.theme}>My Feed</Title>
                </Body>
                <Right>
                  <TouchableOpacity style={{marginRight: 15}} onPress={ () => this._share() }>
                    <Icon name='share' style={this.props.theme}/>
                  </TouchableOpacity>
                  <TouchableOpacity style={{marginLeft: 10, marginRight: 5}} onPress={ () => this._refresh() }>
                    <Icon name='refresh' style={this.props.theme}/>
                  </TouchableOpacity>
                </Right>
              </Header>
              <AppNavigator
                { ...this.props }
             />
            </DrawerLayoutAndroid>
          )  
        }else{
          return(
            <DrawerLayoutAndroid
              drawerBackgroundColor= {this.props.drawerTheme}
              drawerWidth={width}
              drawerPosition={ DrawerLayoutAndroid.positions.Left }
              renderNavigationView={() => _renderDrawer}
              ref={'drawer'}>
              <Header style={{backgroundColor: this.props.theme.backgroundColor}}>
                <Left>
                  <TouchableOpacity onPress = {() => this.refs['drawer'].openDrawer(0) }>
                    <Icon name='menu' style={this.props.theme} />
                  </TouchableOpacity>
                </Left>
                <Body>
                    <Title style={this.props.theme}>Pinch</Title>
                </Body>
                <Right />
              </Header>
              <AppNavigator
                { ...this.props }
             />
            </DrawerLayoutAndroid>
          )
        }
      }      
    }

    _share(){
      let currentPost = this.props.posts[this.props.currentPost]
      Share.share({
        message: currentPost.title + '\n\n' + currentPost.post + '\n\n\nFor More Updates Download - https://play.google.com/store/apps/details?id=in.pinch',
        url: 'https://play.google.com/store/apps/details?id=in.pinch',
        title: currentPost.title
      }, {
        dialogTitle: 'Share Post With Your Friends.',
        tintColor: 'black'
      })
      .then(() => {
        console.log('post shared')
      })
      .catch((error) => {
        console.log(error)
      });
    } 

    _refresh(){
      ToastAndroid.show('Loading New Posts. Please Wait.', ToastAndroid.SHORT)
      let currentPost = this.props.posts[0]
      let url = `/post/`
      if(currentPost){
        url = `/post/?updatedAt=` + currentPost.updatedAt
      }
      Api.get(url).then(resp => {
        if (resp.length == 0) {
          ToastAndroid.show('You Are Already Upto Date.', ToastAndroid.SHORT)
        }
        this.props.setPosts({ posts: resp }, true)
      }).catch((err) => {
        ToastAndroid.show('Please check your connection.', ToastAndroid.SHORT)
      })
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
    username: name,
    currentPost: state.currentPost,
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators(ActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationTabs);
