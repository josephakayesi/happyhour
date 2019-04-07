import React, { Component } from 'react'
import Login from '../Login/Login'
import Register from '../Register/Register'

class Entry extends Component {
    constructor() {
        super()

        this.state = {
            isLogin: true
        }
    }

    toggleLoginOrRegisterComponent = () => {
        this.setState({ isLogin: !this.state.isLogin })
    }

    render() {
        return (
            <div>
                {this.state.isLogin ?
                    <Login toggleLoginOrRegisterComponent={this.toggleLoginOrRegisterComponent} />
                    :
                    <Register toggleLoginOrRegisterComponent={this.toggleLoginOrRegisterComponent} />
                }
            </div>
        )
    }
}

export default Entry
