import axios from 'axios'
import setAuthorizationToken from '../utils/setAuthorizationToken'
import jwtDecode from 'jwt-decode'
import { GET_ERRORS, CLEAR_ERRORS, SET_CURRENT_USER, IS_REGISTERED, AUTH_LOADING } from './types'

// Register user
export const registerUser = (userData, history) => dispatch => {
    dispatch(setAuthenticationLoading(true))
    axios.post('/api/users/register', userData)
        .then(() => dispatch({
            type: IS_REGISTERED,
            payload: true
        }))
        .then(() => dispatch(setAuthenticationLoading(false)))
        .then(() => history.push('/user'))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            },
                dispatch(setAuthenticationLoading(false))
            ))
}

// Login user - Get user token
export const loginUser = userData => dispatch => {
    dispatch(setAuthenticationLoading(true))
    axios.get('http://ipinfo.io/json?token=b0e4bf5ca6e2f2')
        .then(res => userData.ip = res.data.ip)
        .then(() => {
            axios.post('/api/users/login', userData)
                .then(res => {
                    // Save to local storage
                    const { token } = res.data
                    // Set token to local storage
                    localStorage.setItem('jwtToken', token)
                    // Set token to auth header
                    setAuthorizationToken(token)
                    // Decode token to get user data
                    const decoded = jwtDecode(token)
                    // Set current user
                    dispatch(setCurrentUser(decoded))
                })
                .then(() => dispatch(setAuthenticationLoading(false)))
                // .then(() => history.push('/user'))
                .catch(err => {
                    dispatch({
                        type: GET_ERRORS,
                        payload: err.response.data
                    },
                        dispatch(setAuthenticationLoading(false))
                    )
                })

        })
}

// Set loggen in user
export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}

// Log user out
export const logoutUser = () => dispatch => {
    // Remove token from local storage
    localStorage.removeItem('jwtToken')
    // Remove auth from auth header
    setAuthorizationToken(false)
    // Set current user to {} which will set isAuthenticated to false
    dispatch(setCurrentUser({}))
}

// Close register alert
export const closeAlertRegistered = () => {
    return {
        type: IS_REGISTERED,
        payload: false
    }
}

// Set Quotes Loading State
export const setAuthenticationLoading = isAuthLoading => {
    return {
        type: AUTH_LOADING,
        payload: isAuthLoading
    }
}

// Clear errors from auth form
export const clearErrors = () => dispatch => {
    dispatch({
        type: CLEAR_ERRORS,
    })
}