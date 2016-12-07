'use-strict'

import { AsyncStorage } from 'react-native'
// import Realm from 'realm';

export const loadState = () => {
  try {
    AsyncStorage.getItem('state').then((value)=>{
      console.log(value)
      if (value === null){
        return undefined
      }
      return JSON.parse(value)
    })
  }catch(err){
    console.log(err)
    return undefined
  }
}

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state)
    AsyncStorage.setItem('state', serializedState).then(()=>{
      console.log('saved')
    })
  }catch(err){
    console.log(err)
  }
}
