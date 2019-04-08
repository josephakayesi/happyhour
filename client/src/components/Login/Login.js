import React, { Component } from 'react'
import axios from 'axios'
import classnames from 'classnames'
// import Alert from '../Alert/Alert' // Remove alert class bfore deploying

const Alert = ({closeAlert}) => {
    return (
        <div className="alert alert-dismissible alert-primary">
            <button type="button" className="close" onClick={closeAlert}>&times;</button>
            <strong>Sorry!</strong> Try again in 5 minutes
        </div>
    )
}
class Login extends Component {
    constructor() {
        super()

        this.state = {
            email: '',
            password: '',
            errors: {}
        }
    }

    closeAlert = () => {
        console.log('close alert')
        var previousErrorsState = { ...this.state.errors }
        previousErrorsState.accountBarred = false
        this.setState({ errors: { accountBarred: false } })
    }
    onInputChange = (event) => {
        this.setState({ [event.target.id]: event.target.value })
    }

    onFormSubmit = (event) => {
        event.preventDefault()

        const userData = {
            email: this.state.email,
            password: this.state.password,
            ip: ''
        }
        // userData.ip = res.data.ip
        axios.get('http://ipinfo.io/json?token=b0e4bf5ca6e2f2')
            .then(res => userData.ip = res.data.ip)
            .then(() => {
                console.log(userData)
                axios.post('/api/users/login', userData)
                    .then(res => console.log(res.data))
                    .catch(err => this.setState({ errors: err.response.data }))
            })
            .catch(err => console.log(err))
    }

    render() {
        const { errors } = this.state
        return (
            <div>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-6 mx-auto bg-light mt-5 p-5 rounded'>
                            <form>
                                <fieldset>
                                    <legend className='display-4 pb-4'>Login</legend>
                                    {errors.accountBarred ? <Alert closeAlert={() => this.closeAlert()} /> : ''}
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

export default Login