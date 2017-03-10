'use strict'

import React, { Component } from 'react'

import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Button,
  ViewPagerAndroid,
  ToastAndroid
} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome';

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
        return 2 //Move Down
      }else{
        return 0 //Move Up
      }
    }
  }
}

class TutorialScreen extends Component {
  constructor(props) {
    super(props)
    this.motionController = new motionController()
  }

  render() {
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
                <Icon name={this.props.tutorialScreenData.icon} size={150} color="#4F8EF7" />
                <Text style={{fontSize: height/20, fontWeight: 'bold', marginTop: 20}}>{this.props.tutorialScreenData.title}</Text>
              </View>
              <View style={{flex: 1, alignItems: 'center',justifyContent: 'center'}}>
                <Icon name="chevron-up" size={20} color="#000000" />
                <Text style={{fontWeight: 'bold'}}>Swipe Up For MOre</Text>
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
    if(this.motionController.endMove(evt.nativeEvent) == 2){
      if(this.props.tutorialScreenDataIterator < (this.props.tutorialScreenDataLength - 1)){
        this.props.getNextTut()
      }else{
        this.props.setActiveScreen('PostScreen')
      }
    }else if(this.motionController.endMove(evt.nativeEvent) == 0){
      if(this.props.tutorialScreenDataIterator > 0){
        this.props.getPrevTut()
      }
    }
  }

  _onResponderTerminationRequest(evt){
    console.log('onResponderTerminationRequest')
  }

  _onResponderTerminate(evt){
    console.log('onResponderTerminate')
  }
}

const styles = StyleSheet.create({

})

function mapStateToProps(state){
  return {
    tutorialScreenData: state.tutorialScreenData[state.tutorialScreenDataIterator],
    tutorialScreenDataLength: state.tutorialScreenData.length,
    tutorialScreenDataIterator: state.tutorialScreenDataIterator,
  }
}

export default connect(mapStateToProps)(TutorialScreen)
