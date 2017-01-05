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

class UserScreen extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <ViewContainer>
        <View style={{flex: 1, borderWidth: 2, borderColor: '#d6d7da'}}>
          <View style={{flex: 1}}>
            <Image source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}} style={{borderRadius: 50, flex: 1}}  />
          </View>
        </View>
        <View style={{flex: 1}}>
          <View style={{flex: 1, flexDirection: 'row', borderWidth: 2, borderColor: '#d6d7da'}}>
            <View style={{flex: 1, borderWidth: 2, borderColor: '#d6d7da'}}>
              <Text> Name</Text>
            </View>
            <View style={{flex: 1, borderWidth: 2, borderColor: '#d6d7da'}}>
              <Text> {this.props.user.name}</Text>
            </View>
          </View>
        </View>
      </ViewContainer>
    )
  }
}

const styles = StyleSheet.create({

})


function mapStateToProps(state){
  return {
    theme: state.theme.attributes,
    user: state.loggedIn.user
  }
}

export default connect(mapStateToProps)(UserScreen)
