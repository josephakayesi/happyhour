import React, { Component } from 'react'
import Avatar from '../Avatar/Avatar'
import './Navbar.css'

export default class Navbar extends Component {
    constructor() {
        super()

        this.state = {
            isAuthenticated: true,
            user: {
                name: 'Joseph AKayesi',
                avatar: 'https://gravatar.com/avatar/60c51a05870d5d3d0ef3bd6d92c7f69a?s=200&r=pg&d=mm'
            }
        }
    }
    render() {
        const { isAuthenticated, user } = this.state

        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
                <div className="container">
                    <a className="navbar-brand" href="#navbrand">Happy Hour</a>
                    {/* <ul className="navbar-nav navbar-left mr-auto">
                            <li className="nav-item active">
                                {isAuthenticated ? <Link to="/admin/dashboard" className="nav-link" href="#">Home</Link> : ''}
                            </li>
                        </ul> */}
                    {isAuthenticated ? <div className=''><Avatar onLogoutClick={this.onLogoutClick} isAuthenticated={isAuthenticated} user={user} /></div> : null}
                </div>
            </nav>
        )
    }
}
