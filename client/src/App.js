import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import Entry from './components/Entry/Entry'
// import Login from './components/Login/Login'
import Navbar from './components/Navbar/Navbar'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Navbar />
        {/* <Route path='' */}
        {/* <Route exact path='/admin' render={() => isAuthenticated ? (<Redirect to='/admin/dashboard' />) : (<Entry />)} /> */}
        <Route exact path='/' component={Entry} />
      </BrowserRouter>
    );
  }
}

export default App;
