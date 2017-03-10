'use-strict'

import * as types from './types'

export function setActiveScreen(key){
  return {
    type: types.ACTIVE_SCREEN,
    key: key
  }
}

export function setTheme(theme){
  return {
    type: types.THEME,
    theme: theme
  }
}

export function getNextTut(){
  return {
    type: types.GET_NEXT_TUT
  }
}

export function getPrevTut(){
  return {
    type: types.GET_PREV_TUT
  }
}
