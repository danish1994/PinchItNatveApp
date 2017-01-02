'use strict'

import React, { Component } from 'react'

import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  ViewPagerAndroid
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
      <ViewPagerAndroid
        initialPage = {0}
        style = {{flex: 1}}>
        <View style={{flex: 1}}>
          <ViewContainer>
            <View style={styles.container}>
              <Text style={[styles.heading, this.props.theme]}>
                About 1
              </Text>
              <Text style={[styles.text, this.props.theme]}>
                It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
              </Text>
            </View>
          </ViewContainer>
        </View>
        <View style={{flex: 1}}>
          <ViewContainer>
            <View style={styles.container}>
              <Text style={[styles.heading, this.props.theme]}>
                About 2
              </Text>
              <Text style={[styles.text, this.props.theme]}>
                It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
              </Text>
            </View>
          </ViewContainer>
        </View>
      </ViewPagerAndroid>
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
    margin: 10
  },
  text: {
    fontSize: height/35,
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
