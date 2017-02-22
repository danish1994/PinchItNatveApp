'use strict'

import React, { Component } from 'react'

import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  Image
} from 'react-native'

import {connect} from 'react-redux'

import ViewContainer from '../containers/ViewContainer'

const { width, height } = Dimensions.get('window')

const title = require('../images/title.png')


class TitleScreen extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <ViewContainer>
        <View style={styles.container}>
          <Image
            source={title}
            style={{justifyContent: 'center', flex: 1, overflow: 'hidden', width: null, height: null}}
            resizeMode='stretch'>
            <Text style={styles.welcome}>
              Pinch
            </Text>
            <Button
              onPress = {() => this.props.setActiveScreen('PostScreen')}
              title = 'Explore'
            />
          </Image>
        </View>
      </ViewContainer>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1
  },
  welcome: {
    fontSize: height/10,
    textAlign: 'center',
    margin: 10,
    height: 70,
    backgroundColor: 'rgba(0,0,0,0)',
    fontWeight: 'bold',
    color: 'rgba(0,0,0,1)',
    fontFamily: 'sans-serif-light'
  }
})


function mapStateToProps(state){
  return {
    theme: state.theme.attributes
  }
}

export default connect(mapStateToProps)(TitleScreen)
