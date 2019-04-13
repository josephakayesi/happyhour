import isEmpty from '../validation/isEmpty'
import {SET_CURRENT_USER, IS_REGISTERED, AUTH_LOADING} from '../actions/types'

const initialState = {
    isAuthenticated: false,
    user: {},
    isRegistered: false,
    loading: false
}

export default function (state = initialState, action) { 
    switch(action.type){
        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload,
            }
        case IS_REGISTERED:
            return {
                ...state,
                isRegistered: action.payload
            }
        case AUTH_LOADING:
            return {
                ...state,
                loading: action.payload
            }
        default:
            return state
    }
}