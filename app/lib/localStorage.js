'use-strict'

import { AsyncStorage } from 'react-native'
// import Realm from 'realm'

export const loadState = () => {
  try {
    const serializedState = AsyncStorage.getItem('state',()=>{
      console.log('loaded')
    })
    if (serializedState === null){
        console.log('undefined')
        return undefined
    }
    return JSON.parse(serializedState)
  }catch(err){
    console.log(err)
    return undefined
  }
}

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state)
    AsyncStorage.setItem('state', serializedState).then(()=>{
      console.log('State Saved')
    })
  }catch(err){
    console.log(err)
  }
}
