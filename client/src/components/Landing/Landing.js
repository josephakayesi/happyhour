import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { BrowserRouter, Redirect, Route } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import Entry from '../Entry/Entry'
import User from '../User/User'

class Landing extends Component {
    constructor() {
        super()

        this.state = {
            isAuthenticated: false,
            usernameOrEmail: '',
            password: ''
        }
    }

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/user')
        }
    }

    render() {
        const { isAuthenticated } = this.props.auth

        return (
            <BrowserRouter>
                <Navbar isAuthenticated={isAuthenticated}/>
                <Route exact path='/' render={() => isAuthenticated ? (<Redirect to='/user' />) : (<Entry />)} />
                <Route exact path='/user' render={() => isAuthenticated ? (<User />) : (<Redirect to='/' />)} />
            </BrowserRouter>
        )
    }
}

Landing.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, {})(Landing)
