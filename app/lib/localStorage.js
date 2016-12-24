'use-strict'

import { AsyncStorage } from 'react-native'
// import Realm from 'realm'

export const loadState = (props) => {
  try {
    AsyncStorage.getItem('state').then((resp) => {
      if(resp) {
        resp = JSON.parse(resp)
        props.setTheme(resp.theme)

        //Splash Screen Delay
        setTimeout(function() {
          props.setActiveScreen('TitleScreen')
        },1)
      } else {
        //Splash Screen Delay
        setTimeout(function() {
          props.setActiveScreen('TitleScreen')
        },1)
      }
    }).catch((err) => {
      console.log(err)
    })
  }catch(err){
    console.log(err)
  }
}

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify({
      theme: state.theme.key,
      activeScreen: state.activeScreen
    })

    AsyncStorage.setItem('state', serializedState).then(()=>{
      console.log('State Saved')
    })
  }catch(err){
    console.log(err)
  }
}
