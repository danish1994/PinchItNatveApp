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

export function setStartScreen(){
  return {
    types: types.START_SCREEN
  }
}
