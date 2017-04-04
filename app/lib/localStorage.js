'use-strict'

import { AsyncStorage, NetInfo } from 'react-native'
import Api from './api'

const setState = function(props, resp) {
    if (resp.posts) {
        props.setPosts({ posts: resp.posts }, false)
    }

    if (resp.theme) {
        props.setTheme(resp.theme)
    }

    if (resp.categories) {
        if (resp.categories.length != 0) {
            props.setCategories(resp.categories)
        }
    }
}

export const loadState = (props) => {
    try {
        AsyncStorage.getItem('state').then((resp) => {
            if (resp) {
                resp = JSON.parse(resp)

                //Splash Screen Delay
                setTimeout(function() {
                    if (resp.posts) {
                        try {

                            NetInfo.isConnected.fetch().then(isConnected => {
                                if (isConnected) {
                                    let category = ''

                                    if (resp.categories) {
                                        category = resp.categories.join(',')
                                    }

                                    let currentPost = resp.posts[0]
                                    let url = `/post/?` + `category=` + category
                                    if (currentPost) {
                                        url = `/post/?` + `updatedAt=` + currentPost.updatedAt + `&` + `category=` + category
                                    }
                                    Api.get(url).then(res => {
                                        resp.posts = res.concat(resp.posts)
                                        setState(props, resp)
                                    }).catch((err) => {
                                        console.log(err)
                                        setState(props, resp)
                                    })
                                } else {
                                    setState(props, resp)
                                }
                            });


                        } catch (err) {
                            console.log(err)
                            setState(props, resp)
                        }
                    } else {
                        setState(props, resp)
                        props.setActiveScreen('TutorialScreen')
                    }

                    // props.setUser(resp.user, 'loaded')
                }, 2000)
            } else {
                //Splash Screen Delay
                setTimeout(function() {
                    props.setActiveScreen('TutorialScreen')
                }, 2000)
            }
        }).catch((err) => {
            console.log(err)
        })
    } catch (err) {
        console.log(err)
    }
}

export const saveState = (state) => {
    try {
        const serializedState = JSON.stringify({
            theme: state.theme.key,
            posts: state.posts,
            user: state.user,
            categories: state.selectedCategories
        })

        AsyncStorage.setItem('state', serializedState).then(() => {
            // console.log('State Saved')
        })

    } catch (err) {
        console.log(err)
    }
}
