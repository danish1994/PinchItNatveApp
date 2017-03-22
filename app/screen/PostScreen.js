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

import Icon from 'react-native-vector-icons/FontAwesome';

import {connect} from 'react-redux'

import ViewContainer from '../containers/ViewContainer'

import ApplicationTabs from '../containers/ApplicationTabs'

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
    try{
      if(this.props.post.category.category == 'Banner'){
        return (
          <View style={{flex: 1, justifyContent: 'center'}}>
            <View
                style={{flex: 1}}
                onStartShouldSetResponder = {evt => true}
                onMoveShouldSetResponder = {evt => true}
                onResponderGrant = {this._onResponderGrant.bind(this)}
                onResponderRelease = {this._onResponderRelease.bind(this)}>
              <ViewContainer>
                <Image
                  source={{uri: this.props.post.image}}
                  style={{justifyContent: 'center', flex: 1, overflow: 'hidden', width: null, height: null}}
                  resizeMode='stretch'>
                </Image>
              </ViewContainer>
            </View>
          </View>
        )
      }else{
        return (
          <View style={{flex: 1, justifyContent: 'center'}}>
            <View
                style={{flex: 1}}
                onStartShouldSetResponder = {evt => true}
                onMoveShouldSetResponder = {evt => true}
                onResponderGrant = {this._onResponderGrant.bind(this)}
                onResponderRelease = {this._onResponderRelease.bind(this)}>
              <ViewContainer>
                <View style = {{flex: 0.8, justifyContent: 'center', alignItems: 'stretch'}}>
                  <Image
                    style={styles.image}
                    source={{uri: this.props.post.image}}
                  />
                </View>
                <View style = {{flex: 1, alignItems: 'stretch'}}>
                    <Text style={[styles.heading, this.props.theme, { borderBottomColor: this.props.theme.color}]}>{this.props.post.title}</Text>
                    <Text style={[styles.post, this.props.theme]}>
                      {this.props.post.post}
                    </Text>
                    <Text style={[styles.post, this.props.theme, styles.postedBy]}>
                      - Pinch By: {this.props.post.writer.name}
                    </Text>
                </View>
              </ViewContainer>
            </View>
            <TouchableOpacity style={{flex: 0.1, backgroundColor: this.props.readMoreTheme}} onPress={ () => this._readMore() }>
              <Text style = {[{flex: 1, textAlign: 'center', margin: 12, fontWeight: 'bold', fontSize: height/35}, this.props.theme, {backgroundColor: 'rgba(0,0,0,0)'}]}>Read More</Text>
            </TouchableOpacity>
          </View>
        )
      }
    }catch(err){
      return (
        <ViewContainer>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <View
                style={{flex: 1}}
                onStartShouldSetResponder = {evt => true}
                onMoveShouldSetResponder = {evt => true}
                onResponderGrant = {this._onResponderGrant.bind(this)}
                onResponderRelease = {this._onResponderRelease.bind(this)}>
                <View style={{flex: 4, alignItems: 'center',justifyContent: 'center'}}>
                  <Icon name='unlink' size={150} color={this.props.theme.color} />
                  <Text style={{fontSize: height/30, fontWeight: 'bold', marginTop: 20, color: this.props.theme.color}}>Something Went Wrong.</Text>
                </View>
                <View style={{flex: 1, alignItems: 'center',justifyContent: 'center'}}>
                  <Icon name="chevron-up" size={20} color={this.props.theme.color} />
                  <Text style={{fontWeight: 'bold',color: this.props.theme.color}}>Swipe Up/Down to Continue.</Text>
                </View>
            </View>
          </View>
        </ViewContainer>
      )
    }
  }

  _readMore(){
    Linking.openURL(this.props.post.link || ('https://www.google.co.in/search?q='+this.props.post.title)).catch(err => console.error('An error occurred', err));
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

    let category = ''

    if (this.props.categories) {
        category = this.props.categories.join(',')
    }

    let currentPost = this.props.posts[0]
    let url = `/post/?` + `category=` + category
    if (currentPost) {
        url = `/post/?` + `updatedAt=` + currentPost.updatedAt + `&` + `category=` + category
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
    fontSize: height/30,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    marginBottom: 5,
    fontWeight: 'bold',
    borderWidth:1,
    borderColor: 'rgba(0,0,0,0)'
  },
  post: {
    textAlign: 'left',
    fontSize: height/39,
    alignSelf: 'stretch',
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    marginTop: 10
  },
  image: {
    resizeMode: 'stretch',
    flex: 1
  },
  postedBy: {
    fontStyle: 'italic',
    fontWeight: 'bold'
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
      readMoreTheme: state.readMoreTheme,
      categories: state.selectedCategories
  }
}

export default connect(mapStateToProps)(PostScreen)
