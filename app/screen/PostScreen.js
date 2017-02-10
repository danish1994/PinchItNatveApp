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
  ToastAndroid,
  TouchableOpacity,
  Linking
} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome'

import {connect} from 'react-redux'

import ViewContainer from '../containers/ViewContainer'

import Api from '../lib/api'

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
        return 2 //Move Down
      }else{
        return 0 //Move Up
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
      <View style={{flex: 1, justifyContent: 'center'}}>
        <View
            style={{flex: 1}}
            onStartShouldSetResponder = {evt => true}
            onMoveShouldSetResponder = {evt => true}
            onResponderGrant = {this._onResponderGrant.bind(this)}
            onResponderRelease = {this._onResponderRelease.bind(this)}
          >
          <ViewContainer>
            <View style = {{flex: 0.8, justifyContent: 'center', alignItems: 'stretch'}}>
              <Image
                style={styles.image}
                source={{uri: this.props.post.image}}
              />
            </View>
            <View style = {{flex: 1, alignItems: 'stretch'}}>
              <View style = {{flex: 1.5 , alignItems: 'stretch'}}>
                <Text style={[styles.heading, this.props.theme]}>{this.props.post.title}</Text>
              </View>
              <View style = {{flex: 4.5, alignItems: 'stretch'}}>
                <Text style={[styles.post, this.props.theme]}>{this.props.post.post}</Text>
              </View>
            </View>
          </ViewContainer>
        </View>
        <TouchableOpacity style={{flex: 0.09}} onPress={ () => this._readMore() }>
          <Text style = {[{flex: 1, textAlign: 'center'}, this.props.theme, {backgroundColor: '#dcdcdc'}]}>Read More</Text>
        </TouchableOpacity>
      </View>
    )
  }

  _readMore(){
    if(this.props.post.link){
      Linking.openURL('https://google.com').catch(err => console.error('An error occurred', err));
    }else{
      ToastAndroid.show('No Link Available.', ToastAndroid.SHORT)
    }
  }

  _onResponderGrant(evt){
    this.motionController.startMove(evt.nativeEvent)
  }

  _onResponderRelease(evt){
    if(this.motionController.endMove(evt.nativeEvent) == 2){
      this._nextPost()
    }else if(this.motionController.endMove(evt.nativeEvent) == 0){
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
    ToastAndroid.show('Loading New Posts. Please Wait.', ToastAndroid.SHORT)
    let currentPost = this.props.posts[0]
    let url = `/post/`
    if(currentPost){
      url = `/post/?updatedAt=` + currentPost.updatedAt 
    }
    Api.get(url).then(resp => {
      this.props.setPosts({ posts: resp }, true)
    }).catch((err) => {
      console.log(err)
      ToastAndroid.show('Please check your connection.', ToastAndroid.SHORT)
    })
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
      ToastAndroid.show('No More Post Available.', ToastAndroid.SHORT)
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
    fontSize: height/25,
    margin: 10
  },
  post: {
    textAlign: 'left',
    fontSize: height/35,
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
      counter: 0,
      posts: state.posts,
  }
}

export default connect(mapStateToProps)(PostScreen)
