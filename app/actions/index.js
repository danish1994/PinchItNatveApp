'use-strict'

import * as PostActions from './post'
import * as HomeActions from './home'
import * as UserActions from './user'

export const ActionCreators = Object.assign({},
  PostActions,
  HomeActions,
  UserActions
)
