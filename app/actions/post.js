'use-strict'

import * as types from './types'
import Api from '../lib/api'

export function loadPosts(){
  return (dispatch, getState) => {
    const params = [
      `type=male`
    ].join('&')
    return Api.get(`/post/`).then(resp => {
      console.log(resp)
      dispatch(setPosts({ posts: resp }))
    }).catch((err) => {
      console.log(err)
    })
  }
}

export function setPosts({ posts }){
  return {
    type: types.LOAD_POST,
    posts
  }
}

export function getNextPost(){
  return {
    type: types.GET_NEXT_POST
  }
}

export function getPrevPost(){
  return {
    type: types.GET_PREV_POST
  }
}
