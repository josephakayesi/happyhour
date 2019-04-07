import React, { Component } from 'react'
import axios from 'axios'
import classnames from 'classnames'

class Login extends Component {
    constructor() {
        super()

        this.state = {
            email: '',
            password: '',
            errors: {}
        }
    }

    onInputChange = (event) => {
        this.setState({ [event.target.id]: event.target.value })
    }

    onFormSubmit = (event) => {
        event.preventDefault()

        const userData = {
            email: this.state.email,
            password: this.state.password
        }

        axios.post('/api/users/login', userData)
            .then(res => console.log(res.data))
            .catch(err => this.setState({ errors: err.response.data }))
    }

    render() {
        const { errors } = this.state
        return (
            <div className='container'>
                <div className='row'>
                    <div className='col-md-6 mx-auto bg-light mt-5 p-5 rounded'>
                        <form>
                            <fieldset>
                                <legend className='display-4 pb-4'>Login</legend>
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
        )
    }
}

export default Login