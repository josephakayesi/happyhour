import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

class User extends Component {
    render() {
        const { user } = this.props.auth
        return (
            <div>
                <p className="display-4 text-center">Logged in as: <i>{user.name}</i></p>
            </div>
        )
    }
}

User.propTypes = {
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
})

export default connect(mapStateToProps, {})(withRouter(User))