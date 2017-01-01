'use-strict'

import createReducer from '../lib/createReducer'
import * as types from '../actions/types'

export const loggedIn = createReducer({
  status: false
},{
  [types.LOGIN](state, action){
    return {
      status: true,
      user: {
        name: 'name',
        emailid: 'abc@abc'
      }
    }
  }
},
{
  [types.LOGOUT](state, action){
    return {
      status: false
    }
  }
})
