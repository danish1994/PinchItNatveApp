'use strict'

import React, {
  Component,
  PropTypes
} from 'react'

import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
  Button,
  ToastAndroid
} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome'

import {connect} from 'react-redux'

import ViewContainer from '../containers/ViewContainer'

const { width, height } = Dimensions.get('window')


let counter = 0


/*
  Direction System
  0 - Up/North
  1 - Right/East
  2 - Down/South
  3 - Left/West
*/

class motionController{
  constructor(){
    this.startPos = {
      x: 0,
      y: 0
    }
  }

  startMove({pageX, pageY}){
    this.startPos = {
      x: pageX,
      y: pageY
    }
  }

  endMove({pageX, pageY}){
    const xMoveRange = Math.abs(this.startPos.x - pageX)
    const yMoveRange = Math.abs(this.startPos.y- pageY)

    if(xMoveRange >= yMoveRange){
      if(this.startPos.x > pageX){
        return 3 //Move Left
      }else{
        return 1 //Move Right
      }
    }else{
      if(this.startPos.y > pageY){
        return 0 //Move Left
      }else{
        return 2 //Move Right
      }
    }
  }
}

class PostScreen extends Component {
  constructor(props){
    super(props)
    this.motionController = new motionController()
  }

  render() {
    return (
      <ViewContainer>
        <View
          style={{flex: 1}}
          onStartShouldSetResponder = {evt => true}
          onMoveShouldSetResponder = {evt => true}
          onResponderGrant = {this._onResponderGrant.bind(this)}
          onResponderRelease = {this._onResponderRelease.bind(this)}
        >
          <View style = {styles.container}>
            <Image
              style={styles.image}
              source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}
            />
          </View>
          <View style = {{flex: 1 , alignItems: 'stretch'}}>
            <View style = {{flex: 1 , alignItems: 'stretch'}}>
              <Text style={[styles.heading, this.props.theme]}>{this.props.post.title}</Text>
            </View>
            <View style = {{flex: 4 , alignItems: 'stretch'}}>
              <Text style={[styles.post, this.props.theme]}>{this.props.post.post}</Text>
            </View>
          </View>
        </View>
      </ViewContainer>
    )
  }

  _onResponderGrant(evt){
    this.motionController.startMove(evt.nativeEvent)
  }

  _onResponderRelease(evt){
    if(this.motionController.endMove(evt.nativeEvent) == 0){
      this._nextPost()
    }else if(this.motionController.endMove(evt.nativeEvent) == 2){
      this._previousPost()
    }
  }
  
  _onResponderTerminationRequest(evt){
    console.log('onResponderTerminationRequest')
  }

  _onResponderTerminate(evt){
    console.log('onResponderTerminate')
  }


  _refresh(){
    ToastAndroid.show('Loading New Posts. Please Wait.', ToastAndroid.LONG)
    this.props.loadPosts()
  }

  _previousPost() {
    if(this.props.currentPost > 0)
      this.props.getPrevPost()
    else{
      this._refresh()
    }
  }

  _nextPost() {
    if(this.props.currentPost < (this.props.postsLength - 1))
      this.props.getNextPost()
    else{
      ToastAndroid.show('No More Post Available.', ToastAndroid.LONG)
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  heading: {
    textAlign: 'left',
    fontSize: height/20,
    margin: 10
  },
  post: {
    textAlign: 'left',
    fontSize: height/30,
    alignSelf: 'stretch',
    margin: 10
  },
  image: {
    resizeMode: 'stretch',
    flex: 1
  }
})

function mapStateToProps(state){
  return {
      theme: state.theme.attributes,
      post: state.posts[state.currentPost],
      postsLength: state.posts.length,
      currentPost: state.currentPost,
      counter: 0
  }
}

export default connect(mapStateToProps)(PostScreen)
