'use-strict'

import createReducer from '../lib/createReducer'
import * as types from '../actions/types'

export const activeScreen = createReducer('LoadScreen',{
  [types.ACTIVE_SCREEN](state, action){
    return action.key
  },
  [types.LOGIN](state, action){
    if(!action.loaded){
        return 'UserScreen'
    }
    else{
        return state
    }
  },
  [types.LOGOUT](state, action){
    return 'LoginScreen'
  },
  [types.LOAD_POST](state, action){
    return 'PostScreen'
  }
})

export const theme = createReducer({
  key: 'light',
  attributes: {
    backgroundColor: '#eeeeee',
    color: '#111111'
  }
},{
  [types.THEME](state, action){
    switch (action.theme) {
      case 'light':
        return {
          key: 'light',
          attributes: {
            backgroundColor: '#eeeeee',
            color: '#111111'
          }
        }
      case 'dark':
        return {
          key: 'dark',
          attributes: {
            backgroundColor: '#111111',
            color: '#eeeeee'
          }
        }
      default:
        return {
          key: 'light',
          attributes: {
            backgroundColor: '#eeeeee',
            color: '#111111'
          }
        }
    }
  }
})

export const drawerTheme = createReducer('rgba(255,255,255,0.8)',{
  [types.THEME](state, action){
    switch (action.theme) {
      case 'light':
        return 'rgba(255,255,255,0.8)'
      case 'dark':
        return 'rgba(0,0,0,0.8)'
      default:
        return 'rgba(255,255,255,0.8)'
    }
  }
})
