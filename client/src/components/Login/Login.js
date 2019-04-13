import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { loginUser, closeAlertRegistered, clearErrors } from '../../actions/authActions'
import classnames from 'classnames'
import Countdown from 'react-countdown-now'
import Spinner from '../Spinner/Spinner'

const Alert = ({ closeAlert, time }) => (
    <div className="alert alert-dismissible alert-primary">
        <button type="button" className="close" onClick={closeAlert}>&times;</button>
        <div><strong>Sorry!</strong> Try again in <Countdown date={time} /> minutes </div>
    </div>
)

const AlertRegistered = ({ closeAlertRegistered }) => (
    <div className="alert alert-dismissible alert-success">
        <button type="button" className="close" onClick={closeAlertRegistered}>&times;</button>
        <div><strong>Well done!</strong> You successfully registered your account</div>
    </div>
)

class Login extends Component {
    constructor() {
        super()

        this.state = {
            email: '',
            password: '',
            errors: {},
            isRegistered: false,
            loading: false
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
            this.props.history.push('/user')
        }

        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors })
        }
    }

    closeAlert = () => {
        this.setState({ errors: { accountBarred: false } })
    }

    closeAlertRegistered = () => {
        this.props.closeAlertRegistered(true)
    }

    onInputChange = (event) => {
        this.setState({ [event.target.id]: event.target.value })
    }

    onFormSubmit = (event) => {
        event.preventDefault()

        this.props.clearErrors()

        const userData = {
            email: this.state.email,
            password: this.state.password,
            ip: ''
        }

        this.props.loginUser(userData)
    }

    render() {
        const { errors } = this.state
        const { isRegistered, loading } = this.props.auth
        return (
            <div>
                <Spinner loading={loading} />
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-6 mx-auto bg-light mt-2 p-5 rounded'>
                            <form>
                                <fieldset>
                                    <legend className='display-4 pb-4'>Login</legend>
                                    {errors.accountBarred ? <Alert time={errors.barredDate ? errors.barredDate : null} closeAlert={() => this.closeAlert()} /> : null}
                                    {isRegistered ? <AlertRegistered closeAlertRegistered={this.closeAlertRegistered} /> : ''}
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
                                    <button type='submit' className='btn btn-primary' onClick={this.onFormSubmit} >Submit</button>
                                    <button type='button' className='btn btn-link d-block' style={{ paddingLeft: '0%', marginLeft: '0%', textDecoration: 'none' }}><small className='form-text' onClick={this.props.toggleLoginOrRegisterComponent}>Register instead ?</small></button>
                                </fieldset>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    closeAlertRegistered: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
})

export default connect(mapStateToProps, { loginUser, closeAlertRegistered, clearErrors })(withRouter(Login))