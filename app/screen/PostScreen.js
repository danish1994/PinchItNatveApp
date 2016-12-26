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

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

class PostScreen extends Component {
  constructor(props){
    super(props)
  }

  render() {
    return (
      <ViewContainer>
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
          <View style = {{flex: 1 , alignItems: 'stretch'}}>
            <View style={{flexDirection : 'row', justifyContent: 'space-between',flex: 1}}>
              <Button
                onPress = {() => this._previousPost()}
                title = ' < '
                style = {styles.button}
              />
              <View style={{flex:2}} />
              <Button
                onPress = {() => this._nextPost()}
                title = ' > '
                style = {styles.button}
              />
            </View>
          </View>
        </View>
      </ViewContainer>
    )
  }

  _previousPost() {
    if(this.props.currentPost > 0)
      this.props.getPrevPost()
    else{
      ToastAndroid.show('No More Post Available ', ToastAndroid.LONG)
    }
  }

  _nextPost() {
    console.log(this.props.currentPost)
    console.log(this.props.postsLength)
    if(this.props.currentPost < this.props.postsLength)
      this.props.getNextPost()
    else{
      ToastAndroid.show('No More Post Available ', ToastAndroid.LONG)
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
    fontSize: windowHeight/20
  },
  button: {
    flex: 2,
    justifyContent: 'center',
    alignItems : 'stretch',
  },
  buttonText:{
    textAlign: 'center',
    fontSize: windowHeight/30
  },
  post: {
    textAlign: 'left',
    fontSize: windowHeight/40,
    alignSelf : 'stretch',
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
      currentPost: state.currentPost
  }
}

export default connect(mapStateToProps)(PostScreen)
