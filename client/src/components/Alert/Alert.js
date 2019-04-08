import React, { Component } from 'react'

class Alert extends Component {
    render() {
        console.log(this.props)
        return (
            <div className="alert alert-dismissible alert-primary">
                <button type="button" className="close" onClick={this.props.closeAlert}>&times;</button>
                <strong>Sorry!</strong> Try again in 5 minutes
            </div>
        )
    }
}

export default Alert
