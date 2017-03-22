'use-strict'

import * as types from './types'
import Api from '../lib/api'

export function loadPosts() {
    return (dispatch, getState) => {
        return Api.get(`/post/`).then(resp => {
            dispatch(setPosts({ posts: resp }))
        }).catch((err) => {
            console.log(err)
            dispatch(loadError())
        })
    }
}

export function loadError() {
    return {
        type: 'loadError'
    }
}

export function setPosts({ posts }, append) {
    return {
        type: types.LOAD_POST,
        posts,
        append
    }
}

export function getNextPost() {
    return {
        type: types.GET_NEXT_POST
    }
}

export function getPrevPost() {
    return {
        type: types.GET_PREV_POST
    }
}

export function setCategories(categories) {
    return {
        type: types.CATEGORIES,
        categories
    }
}
