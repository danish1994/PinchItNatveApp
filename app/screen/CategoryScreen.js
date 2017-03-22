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
  ToastAndroid,
  TouchableHighlight,
  AsyncStorage
} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome';

import {connect} from 'react-redux'

import Api from '../lib/api'

import ViewContainer from '../containers/ViewContainer'

const { width, height } = Dimensions.get('window')

class CategoryScreen extends Component {
	constructor(props) {
		super(props)
		let state = {
			news: false,
			education: false,
			employement: false
		}

		if(props.categories.includes(2)){
			state.news = true
		}

		if(props.categories.includes(1)){
			state.education = true
		}

		this.state=state
	}

	render() {
		return (
			<ViewContainer>
				<View style={{flex: 1, justifyContent: 'center'}}>
					<View style={{flex: 1, justifyContent: 'center', alignItems: 'stretch'}}>
						<View style={{flex: 0.3, justifyContent: 'center', alignItems: 'center'}}>
							<Text style={[styles.heading, this.props.theme]}>Choose Category*</Text>
							<Text style={[styles.text, this.props.theme]}>*Can Choose Multiple</Text>
						</View>
						<View style={{flex: 0.8, justifyContent: 'center', alignItems: 'stretch'}}>
							<TouchableHighlight
								style={ [styles.button, this.state.news ? {backgroundColor: this.props.theme.color} : {backgroundColor: this.props.theme.backgroundColor}] }
								onPress={() => this._categoryPress('news')}>
								<Text style={ [styles.welcome, this.state.news ? {color: this.props.theme.backgroundColor} : {color: this.props.theme.color}] }>News</Text>
							</TouchableHighlight>
							<TouchableHighlight
								style={ [styles.button, this.state.education ? {backgroundColor: this.props.theme.color} : {backgroundColor: this.props.theme.backgroundColor}] }
								onPress={() => this._categoryPress('education')}>
								<Text style={ [styles.welcome, this.state.education ? {color: this.props.theme.backgroundColor} : {color: this.props.theme.color}] }>Education</Text>
							</TouchableHighlight>
						</View>
					</View>
					<TouchableOpacity style={{flex: 0.1, backgroundColor: this.props.readMoreTheme}} onPress={ () => this._submit() }>
						<Text style = {[{flex: 1, textAlign: 'center', margin: 12, fontWeight: 'bold', fontSize: height/35}, this.props.theme, {backgroundColor: 'rgba(0,0,0,0)'}]}>Submit</Text>
					</TouchableOpacity>
				</View>
			</ViewContainer>
		)
	}

	_submit(){
		let _self = this
		ToastAndroid.show('Submiting Your Request. Please Wait.', ToastAndroid.SHORT)        
		AsyncStorage.getItem('token').then((resp) => {
            if (resp) {
            	console.log(resp)
                let arr = []
                if(this.state.news){
                	arr.push(2)
                }
                if(this.state.education){
                	arr.push(1)
                }
                try{
	                Api.post(`/deviceCategoryRelation/`, encodeURIComponent('deviceid') + '=' + encodeURIComponent(resp) + "&" + encodeURIComponent('category') + '=' + encodeURIComponent(arr.join(','))).then(resp => {
		                ToastAndroid.show('Categories Updated.', ToastAndroid.SHORT)
		                _self.props.setCategories(arr)
		            }).catch((err) => {
		                console.log(err)
		                ToastAndroid.show('Categories Not Updated. Please Turn On Your Connection And Try Again.', ToastAndroid.SHORT)
		            })
		        }catch(err){
	                console.log(err)
	                ToastAndroid.show('Categories Not Updated. Please Turn On Your Connection And Try Again.', ToastAndroid.SHORT)
		        }

            } else {
                ToastAndroid.show('Token Not Found.', ToastAndroid.SHORT)
            }
        }).catch((err) => {
            console.log(err)
        })
	}

	_categoryPress(name){
		let obj = {}
		obj[name] = !this.state[name]
		this.setState(obj)
	}

}

const styles = StyleSheet.create({
	welcome: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10,
	},
	button: {
		borderColor: '#666666',
		borderWidth: 1,
	},
	heading: {
		fontSize: height/20,
		textAlign: 'center',
		fontWeight: 'bold'
	},
	text: {
		fontSize: height/30,
		textAlign: 'justify'
	}
})

function mapStateToProps(state){
	return {
		theme: state.theme.attributes,
		readMoreTheme: state.readMoreTheme,
		categories: state.selectedCategories
	}
}

export default connect(mapStateToProps)(CategoryScreen)
