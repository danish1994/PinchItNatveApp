'use-strict'

import { AsyncStorage } from 'react-native'
// import Realm from 'realm'

export const loadState = (props) => {
  try {
    AsyncStorage.getItem('state').then((resp) => {
      resp = JSON.parse(resp)
      props.setTheme(resp.theme)

      //Splash Screen Delay
      setTimeout(function() {
        props.setActiveScreen('TitleScreen')
      },300)
    })
  }catch(err){
    console.log(err)
    return undefined
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
