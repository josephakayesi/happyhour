import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
import classnames from 'classnames'

class Avatar extends Component {
    render() {
        return (
            <div className={classnames('dropdown show', { 'd-block': this.props.isAuthenticated })}>
                <img className='dropdown-toggle' href='#' role='button' id='dropdownMenuLink' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false' style={{ height: '40px', width: '40px', borderRadius: '100%', verticalAlign: 'middle' }} src={this.props.user.avatar} alt='avatar' title='Default avatar is your Gravatar' />
                <div className='dropdown-menu dropdown-menu-center' aria-labelledby='dropdownMenuLink'>
                    <a className='dropdown-item adminDetails ' href='#admin'>
                        <div className='block '><b>{this.props.user.name}</b></div>
                        {/* <small className='block text-muted'>@{this.props.user.username}</small> */}
                    </a>
                    <div className='dropdown-divider'></div>
                    <a to='/admin/profile' className='dropdown-item' href='#profile'>Profile</a>
                    <div className='dropdown-divider'></div>
                    <a className='dropdown-item' href='#logout' onClick={this.props.onLogoutClick}>Logout</a>
                </div>
            </div>
        )
    }
}

export default Avatar