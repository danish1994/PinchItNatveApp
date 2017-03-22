'use-strict'

import createReducer from '../lib/createReducer'
import * as types from '../actions/types'

export const posts = createReducer([], {
    [types.LOAD_POST](state, action) {
        try {
            if (action.append) {
                return action.posts.concat(state)
            } else {
                return action.posts
            }
        } catch (err) {
            return state
        }
    }
})

export const currentPost = createReducer(0, {
    [types.GET_NEXT_POST](state, action) {
        return state + 1
    },
    [types.GET_PREV_POST](state, action) {
        return state - 1
    },
    [types.LOAD_POST](state, action) {
        return 0
    }
})

export const selectedCategories = createReducer([], {
    [types.CATEGORIES](state, action) {
        return action.categories
    }
})
