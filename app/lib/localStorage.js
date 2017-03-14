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
                        props.setPosts({ posts: resp.posts }, false)

                        //Refreshing Posts Start
                        try {
                            let currentPost = resp.posts[0]
                            let url = `/post/`
                            if (currentPost) {
                                url = `/post/?updatedAt=` + currentPost.updatedAt
                            }
                            Api.get(url).then(resp => {
                                props.setPosts({ posts: resp }, true)
                            }).catch((err) => {
                                console.log(err)
                            })
                        } catch (err) {
                            console.log(err)
                        }
                        //Refreshing Posts End


                        props.setActiveScreen('PostScreen')

                    } else {
                        props.setActiveScreen('TutorialScreen')
                    }

                    props.setUser(resp.user, 'loaded')
                    props.setTheme(resp.theme)
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
            user: state.user
        })

        AsyncStorage.setItem('state', serializedState).then(() => {
            // console.log('State Saved')
        })

    } catch (err) {
        console.log(err)
    }
}
