import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import classnames from 'classnames'
import { connect } from 'react-redux'
import { registerUser, clearErrors } from '../../actions/authActions'
import Spinner from '../Spinner/Spinner'

class Register extends Component {
    constructor() {
        super()

        this.state = {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            errors: {}
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors })
        }
    }
    onInputChange = (event) => {
        this.setState({ [event.target.id]: event.target.value })
    }

    onFormSubmit = (event) => {
        event.preventDefault()

        this.props.clearErrors()

        let userData = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword
        }

        this.props.registerUser(userData, this.props.history)
    }

    render() {
        const { errors } = this.state
        const { loading } = this.props.auth
        return (
            <div>
                <Spinner loading={loading} />
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-6 mx-auto bg-light mt-2 p-5 rounded'>
                            <form>
                                <fieldset>
                                    <legend className='display-4 pb-4'>Register</legend>
                                    <div className='form-group'>
                                        <label htmlFor='name'>Name</label>
                                        <input type='text' className={classnames('form-control', { 'is-invalid': errors.name })} id='name' placeholder='Enter name' value={this.state.name} onChange={this.onInputChange} />
                                        {errors.name && (<div className='invalid-feedback'>{errors.name}</div>)}
                                    </div>
                                    <div className='form-group'>
                                        <label htmlFor='email'>Email</label>
                                        <input type='email' className={classnames('form-control', { 'is-invalid': errors.email })} id='email' placeholder='Enter email' value={this.state.email} onChange={this.onInputChange} />
                                        {errors.email && (<div className='invalid-feedback'>{errors.email}</div>)}
                                    </div>
                                    <div className='form-group'>
                                        <label htmlFor='password'>Password</label>
                                        <input type='password' className={classnames('form-control', { 'is-invalid': errors.password })} id='password' placeholder='Enter password' value={this.state.password} onChange={this.onInputChange} />
                                        {errors.password && (<div className='invalid-feedback'>{errors.password}</div>)}
                                    </div>
                                    <div className='form-group'>
                                        <label htmlFor='confirmPassword'>Confirm Password</label>
                                        <input type='password' className={classnames('form-control', { 'is-invalid': errors.confirmPassword })} id='confirmPassword' placeholder='Enter password again' value={this.state.confirmPassword} onChange={this.onInputChange} />
                                        {errors.confirmPassword && (<div className='invalid-feedback'>{errors.confirmPassword}</div>)}
                                    </div>
                                    <button type='submit' className='btn btn-primary' onClick={this.onFormSubmit}>Submit</button>
                                    <button type='button' className='btn btn-link d-block' style={{ paddingLeft: '0%', marginLeft: '0%', textDecoration: 'none' }}><small className='form-text' onClick={this.props.toggleLoginOrRegisterComponent}>Login instead ?</small></button>
                                </fieldset>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
})

export default connect(mapStateToProps, { registerUser, clearErrors })(withRouter(Register))