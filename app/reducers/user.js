'use-strict'

import createReducer from '../lib/createReducer'
import * as types from '../actions/types'

export const user = createReducer({
  status: false
},{
  [types.LOGIN](state, action){
    if(action.user){
        return action.user
    }
    else{
      return state
    }
  },
  [types.LOGOUT](state, action){
    return {
      status: false
    }
  }
})
