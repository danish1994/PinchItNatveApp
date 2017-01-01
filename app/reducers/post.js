'use-strict'

import createReducer from '../lib/createReducer'
import * as types from '../actions/types'

export const posts = createReducer([
  {
    postid : 1,
    title: 'Hello1',
    post: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur eu ipsum non sem tincidunt luctus. Nullam ante orci, vulputate quis quam quis, iaculis molestie lacus. Nullam faucibus at mi et dapibus. Donec imperdiet quis lectus id pulvinar. Nunc eget malesuada purus. Maecenas porttitor porttitor ex. Nulla dictum ex nec mi feugiat accumsan. Sed sed enim ac justo condimentum euismod. Nulla.'
  },
  {
    postid : 2,
    title: 'Hello2',
    post: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur eu ipsum non sem tincidunt luctus. Nullam ante orci, vulputate quis quam quis, iaculis molestie lacus. Nullam faucibus at mi et dapibus. Donec imperdiet quis lectus id pulvinar. Nunc eget malesuada purus. Maecenas porttitor porttitor ex. Nulla dictum ex nec mi feugiat accumsan. Sed sed enim ac justo condimentum euismod. Nulla.'
  },
  {
    postid : 3,
    title: 'Hello3',
    post: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur eu ipsum non sem tincidunt luctus. Nullam ante orci, vulputate quis quam quis, iaculis molestie lacus. Nullam faucibus at mi et dapibus. Donec imperdiet quis lectus id pulvinar. Nunc eget malesuada purus. Maecenas porttitor porttitor ex. Nulla dictum ex nec mi feugiat accumsan. Sed sed enim ac justo condimentum euismod. Nulla.'
  },
  {
    postid : 4,
    title: 'Hello4',
    post: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur eu ipsum non sem tincidunt luctus. Nullam ante orci, vulputate quis quam quis, iaculis molestie lacus. Nullam faucibus at mi et dapibus. Donec imperdiet quis lectus id pulvinar. Nunc eget malesuada purus. Maecenas porttitor porttitor ex. Nulla dictum ex nec mi feugiat accumsan. Sed sed enim ac justo condimentum euismod. Nulla.'
  },
  {
    postid : 5,
    title: 'Hello5',
    post: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur eu ipsum non sem tincidunt luctus. Nullam ante orci, vulputate quis quam quis, iaculis molestie lacus. Nullam faucibus at mi et dapibus. Donec imperdiet quis lectus id pulvinar. Nunc eget malesuada purus. Maecenas porttitor porttitor ex. Nulla dictum ex nec mi feugiat accumsan. Sed sed enim ac justo condimentum euismod. Nulla.'
  }
],{
  [types.LOAD_POST](state, action){
    // let newState = {}
    // action.posts.forEach((post) => {
    //   newState[post.postid] = post
    // })
    // return newState
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
