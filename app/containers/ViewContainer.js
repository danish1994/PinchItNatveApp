'use strict'

import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  StatusBar
} from 'react-native'

import { connect } from 'react-redux'

class ViewContainer extends Component {
  render() {
    return (
      <View style={[styles.ViewContainer, {backgroundColor: this.props.theme.backgroundColor}]}>
          <StatusBar
             backgroundColor = 'blue'
             barStyle = 'light-content'
             hidden = { true } />
          {this.props.children}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  ViewContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch'
  }
})

function mapStateToProps(state){
  return {
    theme: state.theme.attributes
  }
}

export default connect(mapStateToProps)(ViewContainer)
