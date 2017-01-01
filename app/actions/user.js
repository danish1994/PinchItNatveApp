'use-strict'

import * as types from './types'
import Api from '../lib/api'

export function logout(){
  return {
    type: types.LOGOUT
  }
}

export function register(){
  return (dispatch, getState) => {
    const params = [
      `name=xyz`,
      `email=abc@pqr`,
      `pswd=abcd`
    ].join('&')

    return Api.post(`/user/`,params).then(resp => {
      dispatch(logn())
    }).catch((err) => {
      console.log(err)
    })
  }
}

export function login(user){
  return (dispatch, getState) => {
    const params = [
      `name=xyz`,
      `email=abc@pqr`,
      `pswd=abcd`
    ].join('&')

    return Api.post(`/user/login/`,params).then(resp => {
      dispatch(setUser({ user: resp }))
    }).catch((err) => {
      console.log(err)
    })
  }
}

export function setUser({ user }){
  console.log(user)
  return {
    type: 'NULL',
    user
  }
}
