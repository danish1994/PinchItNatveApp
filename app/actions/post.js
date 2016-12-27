'use-strict'

import * as types from './types'
import Api from '../lib/api'

export function loadPosts(){
  return (dispatch, getState) => {
    // console.log(getState())
    const params = [
      `type=male`
    ].join('&')
    return Api.get(`http://wconnect-pcj.rhcloud.com/class/`).then(resp => {
      console.log(resp)
      dispatch(setPosts(resp))
    }).catch((err) => {
      console.log(err)
    })
  }
}

export function setPosts(resp){
  console.log('in SetPosts')
  return {
    type: 'NULL'
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
