'use-strict'

import { AsyncStorage } from 'react-native'
import Api from './api'

export const loadState = (props) => {
    try {
        AsyncStorage.getItem('state').then((resp) => {
            if (resp) {
                resp = JSON.parse(resp)

                //Splash Screen Delay
                setTimeout(function() {
                    if (resp.posts) {
                        try {

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
                                props.setPosts({ posts: resp.posts }, false)
                            }).catch((err) => {
                                console.log(err)
                                props.setPosts({ posts: resp.posts }, false)
                            })
                        } catch (err) {
                            console.log(err)
                            props.setPosts({ posts: resp.posts }, false)
                        }
                    } else {
                        props.setActiveScreen('TutorialScreen')
                    }

                    if (resp.theme) {
                        props.setTheme(resp.theme)
                    }

                    if (resp.categories) {
                        if (resp.categories.length != 0) {
                            props.setCategories(resp.categories)
                        }
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
