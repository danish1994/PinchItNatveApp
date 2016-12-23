'use-strict'

import { AsyncStorage } from 'react-native'
// import Realm from 'realm'

export const loadState = (props) => {
  try {
    AsyncStorage.getItem('state').then((resp) => {
      resp = JSON.parse(resp)
      console.log(resp)
      props.setActiveScreen('TitleScreen')
      props.setTheme(resp.theme)
    })
    //
    // if (serializedState === null){
    //     console.log('undefined')
    //     return undefined
    // }
    // return JSON.parse(serializedState)
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
