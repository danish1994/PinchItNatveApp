'use-strict'

import createReducer from '../lib/createReducer'
import * as types from '../actions/types'

export const loggedIn = createReducer({
  status: false
},{
  [types.LOGIN](state, action){
    return action.user
  }
},
{
  [types.LOGOUT](state, action){
    return {
      status: false
    }
  }
})
