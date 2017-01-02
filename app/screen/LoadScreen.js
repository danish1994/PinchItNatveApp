'use strict'

import React, { Component } from 'react'

import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native'

import { connect } from 'react-redux'

import ViewContainer from '../containers/ViewContainer'

import { loadState } from '../lib/localStorage'

const { width, height } = Dimensions.get('window')

const background = require('../images/bg.png')

class LoadScreen extends Component {
  constructor(props) {
    super(props)
  }

  render() {

    loadState(this.props)

    return (
      <ViewContainer>
        <View style={styles.container}>
          <Image
            source={background}
            style={[styles.container, styles.bg]}
            resizeMode='cover'>
            <View style={styles.headerContainer}>
              <View style={styles.headerTitleView}>
                <Text style={styles.titleViewText}>Loading...</Text>
              </View>
            </View>
          </Image>
        </View>
      </ViewContainer>
    )
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
  headerTitleView: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center'
  },
  titleViewText: {
    fontSize: 40,
    color: '#fff',
  },
})


function mapStateToProps(state){
  return {
    theme: state.theme.attributes
  }
}

export default connect(mapStateToProps)(LoadScreen)
