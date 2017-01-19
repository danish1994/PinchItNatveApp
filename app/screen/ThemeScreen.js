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

class ThemeScreen extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <ViewContainer>
        <View style={styles.container}>
          <Text style={[styles.heading, this.props.theme]}>
            Themes
          </Text>
          <Button
            onPress = {() => this.props.setTheme('light')}
            title = 'Light'
            style = {styles.button}
          />
          <Button
            onPress = {() => this.props.setTheme('dark')}
            title = 'Dark'
            style = {styles.button}
          />
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
    margin: 20
  },
  text: {
    fontSize: height/30,
    margin: 30,
    textAlign: 'justify'
  }
})


function mapStateToProps(state){
  return {
    theme: state.theme.attributes
  }
}

export default connect(mapStateToProps)(ThemeScreen)
