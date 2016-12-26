'use-strict'

import * as types from './types'
import Api from '../lib/api'

export function loadPosts(){

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
