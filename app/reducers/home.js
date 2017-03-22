'use-strict'

import createReducer from '../lib/createReducer'
import * as types from '../actions/types'

export const activeScreen = createReducer('LoadScreen', {
    [types.ACTIVE_SCREEN](state, action) {
        return action.key
    },
    [types.LOGIN](state, action) {
        if (!action.loaded) {
            return 'UserScreen'
        } else {
            return state
        }
    },
    [types.LOGOUT](state, action) {
        return 'LoginScreen'
    },
    [types.LOAD_POST](state, action) {
        return 'PostScreen'
    },
    [types.CATEGORIES](state, action) {
        return 'PostScreen'
    }
})

export const theme = createReducer({
    key: 'dark',
    attributes: {
        backgroundColor: '#333333',
        color: '#eeeeee'
    }
}, {
    [types.THEME](state, action) {
        switch (action.theme) {
            case 'light':
                return {
                    key: 'light',
                    attributes: {
                        backgroundColor: '#eeeeee',
                        color: '#111111'
                    }
                }
            case 'dark':
                return {
                    key: 'dark',
                    attributes: {
                        backgroundColor: '#333333',
                        color: '#eeeeee'
                    }
                }
            default:
                return {
                    key: 'dark',
                    attributes: {
                        backgroundColor: '#333333',
                        color: '#eeeeee'
                    }
                }
        }
    }
})

export const drawerTheme = createReducer('rgba(0,0,0,0.8)', {
    [types.THEME](state, action) {
        switch (action.theme) {
            case 'light':
                return 'rgba(255,255,255,0.8)'
            case 'dark':
                return 'rgba(0,0,0,0.8)'
            default:
                return 'rgba(0,0,0,0.8)'
        }
    }
})

export const readMoreTheme = createReducer('rgba(44,44,44,1)', {
    [types.THEME](state, action) {
        switch (action.theme) {
            case 'light':
                return 'rgba(220,220,220,0.8)'
            case 'dark':
                return 'rgba(44,44,44,1)'
            default:
                return 'rgba(44,44,44,1)'
        }
    }
})

export const tutorialScreenData = createReducer([{
    icon: 'newspaper-o',
    title: 'Get Daily News'
}, {
    icon: 'book',
    title: 'Education'
}, {
    icon: 'suitcase',
    title: 'Get Employment'
}], {

})

export const tutorialScreenDataIterator = createReducer(0, {
    [types.GET_NEXT_TUT](state, action) {
        return (state + 1)
    },
    [types.GET_PREV_TUT](state, action) {
        console.log(state)
        return (state - 1)
    }
})
