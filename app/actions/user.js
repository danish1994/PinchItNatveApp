'use-strict'

import * as types from './types'
import Api from '../lib/api'

export function logout(){
  return {
    type: types.LOGOUT
  }
}
