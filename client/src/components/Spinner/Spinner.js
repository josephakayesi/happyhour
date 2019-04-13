import React, { Component } from 'react'
import classnames from 'classnames'

class Spinner extends Component {
    render() {
        const { loading } = this.props
        return (
            <div className={classnames({ 'visible mt-2': loading }, { 'invisible mt-2': !loading})}>
                <div className='text-center'>
                    <div className='spinner-border text-secondary' role='status'>
                        <span className='sr-only'>Loading...</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default Spinner