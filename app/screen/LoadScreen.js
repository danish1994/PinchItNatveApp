'use strict'

import React, { Component } from 'react'

import {
  Dimensions,
  StyleSheet,
  Text,
  View
} from 'react-native'

import { connect } from 'react-redux'

import ViewContainer from '../containers/ViewContainer'

import { loadState } from '../lib/localStorage'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

class LoadScreen extends Component {
  constructor(props) {
    super(props)
  }

  render() {

    loadState(this.props)

    return (
      <ViewContainer>
        <View style={styles.container}>
          <Text style={[styles.welcome, this.props.theme]}>
            Loading...
          </Text>
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
    fontSize: windowHeight/15,
    textAlign: 'center',
    margin: 10,
    height: 70
  }
})


function mapStateToProps(state){
  return {
    theme: state.theme.attributes
  }
}

export default connect(mapStateToProps)(LoadScreen)
