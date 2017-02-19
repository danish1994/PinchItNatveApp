'use strict'

import React, { Component } from 'react'

import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button
} from 'react-native'

import {connect} from 'react-redux'

import ViewContainer from '../containers/ViewContainer'

const { width, height } = Dimensions.get('window')

class AboutScreen extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <ViewContainer>
        <View style={styles.container}>
          <Text style={[styles.heading, this.props.theme]}>
            About
          </Text>
          <Text style={[styles.text, this.props.theme]}>
           Pinch is an app that searches, squeezes and then delivers you what matters you the most. We make you read worthy, get worthier and share the worthiest. Read in short or with elaboration {'\n'} - Choice is all yours.
          </Text>
        </View>
      </ViewContainer>
    )
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
    margin: 20,
    fontWeight: 'bold'
  },
  text: {
    fontSize: height/30,
    margin: 20,
    textAlign: 'justify'
  }
})


function mapStateToProps(state){
  return {
    theme: state.theme.attributes
  }
}

export default connect(mapStateToProps)(AboutScreen)
