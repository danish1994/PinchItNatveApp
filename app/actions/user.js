'use-strict'

import * as types from './types'
import Api from '../lib/api'

export function logout(){
  return {
    type: types.LOGOUT
  }
}

export function setUser(user, loaded){
  return {
    type: types.LOGIN,
    user,
    loaded
  }
}
