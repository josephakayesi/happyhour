import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { logoutUser } from '../../actions/authActions'
import Avatar from '../Avatar/Avatar'
import './Navbar.css'

class Navbar extends Component {
    constructor() {
        super()

        this.state = {
            isAuthenticated: false,
            user: {
                name: '',
                avatar: ''
            }
        }
    }

    onLogoutClick = () => {
        this.props.logoutUser()
    }
    render() {
        const { isAuthenticated, user } = this.props.auth

        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
                <div className="container">
                    <a className="navbar-brand" href="#navbrand">Happy Hour</a>
                    {isAuthenticated ? <div className=''><Avatar onLogoutClick={this.onLogoutClick} isAuthenticated={isAuthenticated} user={user} /></div> : null}
                </div>
            </nav>
        )
    }
}

Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}
const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps, { logoutUser })(Navbar)