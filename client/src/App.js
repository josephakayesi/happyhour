import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import jwtDecode from 'jwt-decode'
import setAuthorizationToken from './utils/setAuthorizationToken'
import { setCurrentUser, logoutUser } from './actions/authActions'
import { Provider } from 'react-redux'
import store from './store'
import Landing from './components/Landing/Landing'

// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthorizationToken(localStorage.jwtToken)
  // Decode token to get user info and exp
  const decoded = jwtDecode(localStorage.jwtToken)
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded))

  // Check for expired token
  const currentTime = Date.now() / 1000
  if (decoded.exp < currentTime) {
    // Logout admin
    store.dispatch(logoutUser())
    // TODO: Clear current profile
    console.log('expired')
    // Redirect to login
    window.location.href = '/'
  }
}

class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Route path='/' component={Landing} />
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
