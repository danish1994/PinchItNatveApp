'use-strict'

import createReducer from '../lib/createReducer'
import * as types from '../actions/types'

export const posts = createReducer([],{
  [types.LOAD_POST](state, action){
    return action.posts
  }
})

export const currentPost = createReducer(0,{
  [types.GET_NEXT_POST](state, action){
    return state + 1
  },
  [types.GET_PREV_POST](state, action){
    return state - 1
  },
  [types.LOAD_POST](state, action){
    return 0
  }
})
