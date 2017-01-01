'use-strict'

import { combineReducers } from 'redux'

import * as PostReducers from './post'
import * as HomeReducers from './home'
import * as UserReducers from './user'

export default combineReducers(Object.assign({},
  PostReducers,
  HomeReducers,
  UserReducers
))
